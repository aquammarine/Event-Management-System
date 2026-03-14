import { Injectable } from '@nestjs/common';
import { SnapshotBuilder } from './snapshot.builder';
import { ONE_SECOND } from 'src/common/constants/time.constants';

const SYSTEM_PROMPT = `You are a helpful, read-only assistant for an event management app.
Your ONLY job is to answer questions about events using the data provided below.
Rules:
- Answer in 1-3 sentences. Be concise and specific.
- Only use information from the EVENT DATA section. Never invent events or people.
- Never create, edit, delete, or suggest modifying any data.
- If the question cannot be answered from the data, respond EXACTLY with:
  "Sorry, I didn't understand that. Please try rephrasing your question."
- For date/time questions, use the currentDateTime and thisWeek fields provided.

--- EVENT DATA ---
`;

@Injectable()
export class AssistantService {
  constructor(private readonly snapshotBuilder: SnapshotBuilder) { }

  async ask(question: string, userId: string): Promise<string> {
    const writeWords = ['create', 'add', 'delete', 'remove', 'cancel', 'edit', 'update', 'modify', 'change', 'make'];
    const lq = question.toLowerCase().trim();
    if (lq.split(/\s+/).length < 2) {
      return "Sorry, I didn't understand that. Please try rephrasing your question.";
    }
    if (writeWords.some((w) => lq.includes(w))) {
      return "I can only read event information. Please use the app's interface to make changes.";
    }

    const snapshot = await this.snapshotBuilder.build(userId);
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + snapshot },
      { role: 'user', content: question },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ONE_SECOND * 15);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + process.env.GROQ_API_KEY,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages,
          max_tokens: 300,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq Error Response:', errorText);
        if (response.status === 429) return "I'm receiving too many requests. Please try again in a moment.";
        throw new Error('Groq API error: ' + response.status + ' - ' + errorText);
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content?.trim();
      if (!answer) throw new Error('Empty response from API');
      return answer;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return 'The assistant is taking too long to respond. Please try again.';
      }
      console.error('[AssistantService]', err.message);
      return 'Sorry, the assistant is temporarily unavailable. Please try again later.';
    }
  }
}
