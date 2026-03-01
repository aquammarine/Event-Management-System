import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) { }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException("Invalid password");
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }

    async register(dto: RegisterDto) {
        const { email, password, firstName, lastName } = dto;

        const userExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new BadRequestException('This email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        const token = await this.signToken(user.id, user.email);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            access_token: token,
        };
    }

    private signToken(userId: string, email: string) {
        return this.jwtService.signAsync({
            sub: userId,
            email,
        });
    }
}
