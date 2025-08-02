import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TokenValidationRequest, TokenValidationResponse } from '../interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('RABBITMQ_SERVICE') private rabbitMqClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const validationRequest: TokenValidationRequest = { token };
      const response: TokenValidationResponse = await firstValueFrom(
        this.rabbitMqClient.send('auth.validate.token', validationRequest)
      );

      if (!response.valid || !response.user) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = response.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
