import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_USER_ADMIN_KEY } from '../decorators/admin.user.decorator';
import { GlobalService } from 'src/global.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private globalService: GlobalService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUserAdminException = this.reflector.getAllAndOverride<boolean>(IS_USER_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isUserAdminException) {
      return true;
    }

    return await this.globalService.getIsAdminUser();
  }
}