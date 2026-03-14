import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class SnapshotBuilder {
  constructor(private readonly prisma: PrismaService) { }

  async build(userId: string): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, firstName: true, lastName: true },
      });

      if (!user) {
        return JSON.stringify({ error: 'User not found' });
      }

      const events = await this.prisma.event.findMany({
        where: {
          OR: [
            { organizerId: userId },
            { participants: { some: { userId } } },
          ],
        },
        include: {
          organizer: { select: { id: true, firstName: true, lastName: true } },
          participants: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
          tags: { include: { tag: true }, orderBy: { position: 'asc' } },
        },
        orderBy: { dateTime: 'asc' },
        take: 50,
      });

      const now = new Date();
      const fmt = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
      });
      const fmtDate = (d: Date) => new Intl.DateTimeFormat('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
      }).format(d);

      const dayOfWeek = now.getUTCDay();
      const monday = new Date(now);
      monday.setUTCDate(now.getUTCDate() - ((dayOfWeek + 6) % 7));
      const sunday = new Date(monday);
      sunday.setUTCDate(monday.getUTCDate() + 6);

      const snapshot = {
        generatedAt: now.toISOString(),
        user: { id: user.id, name: `${user.firstName} ${user.lastName}` },
        currentDateTime: fmt.format(now),
        thisWeek: fmtDate(monday) + ' to ' + fmtDate(sunday),
        thisWeekend: fmtDate(new Date(monday.getTime() + 5 * 86400000)) + ' - ' + fmtDate(sunday),
        events: events.map((e) => {
          const isOrganizer = e.organizerId === userId;
          return {
            id: e.id,
            title: e.title,
            dateTime: fmt.format(new Date(e.dateTime)),
            location: e.location,
            isPublic: e.isPublic,
            isOrganizer,
            rsvp: isOrganizer ? 'organizer' : 'attending',
            tags: e.tags.map((et) => et.tag.name),
            attendeeCount: e.participants.length,
            ...(isOrganizer && {
              attendees: e.participants.map((p) => `${p.user.firstName} ${p.user.lastName}`),
            }),
          };
        }),
      };

      return JSON.stringify(snapshot);
    } catch (err: any) {
      return JSON.stringify({ error: err.message });
    }
  }
}
