import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from "@nestjs/core"
import { API_KEY_REQUIRED } from './api-key.decorator'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiresApiKey = this.reflector.getAllAndOverride<boolean>(
      API_KEY_REQUIRED,
      [context.getHandler(), context.getClass()],
    )

    if (!requiresApiKey) return true // rota pública

    const request = context.switchToHttp().getRequest()
    const headerKey = request.headers['x-api-key']

    if (!headerKey) {
      throw new UnauthorizedException('API Key is missing')
    }

    if (headerKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API Key')
    }

    return true
  }
}
