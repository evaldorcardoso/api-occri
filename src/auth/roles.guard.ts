import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userRole = context.getArgByIndex(0).user.role;
    const requiredRole = this.reflector.get<string[]>(
      'role',
      context.getHandler()
    );

    if (!requiredRole) return true;

    return userRole === requiredRole;
  }
}
