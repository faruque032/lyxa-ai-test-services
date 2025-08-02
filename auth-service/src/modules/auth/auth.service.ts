import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload, TokenPair, AuthUser, UserCreatedEvent } from '../../common/interfaces';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('RABBITMQ_SERVICE') private rabbitMqClient: ClientProxy,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: AuthUser; tokens: TokenPair }> {
    const user = await this.userService.create(registerDto);
    
    // Publish user created event
    const userCreatedEvent: UserCreatedEvent = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: new Date(),
    };
    
    this.rabbitMqClient.emit('user.created', userCreatedEvent);

    const tokens = await this.generateTokens(user);
    
    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: AuthUser; tokens: TokenPair }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.userService.updateLastLogin(user.id);
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.userService.validatePassword(email, password);
  }

  async validateToken(token: string): Promise<{ valid: boolean; user?: AuthUser }> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.sub);
      
      return {
        valid: true,
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      return { valid: false };
    }
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: User): Promise<TokenPair> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
