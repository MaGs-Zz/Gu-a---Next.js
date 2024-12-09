import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../enum/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return matchRole(requiredRoles, user?.role);
    }
}

function matchRole(requiredRoles: string[], userRole: string) {
    return requiredRoles.some((role: string) => userRole?.includes(role));
}