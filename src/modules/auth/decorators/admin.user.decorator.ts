import { SetMetadata } from '@nestjs/common';

// Decorador para endpoints que solo usuarios administradores de empresa pueden accedeer!
export const IS_USER_ADMIN_KEY = 'userAdmin';
export const UserAdmin = () => SetMetadata(IS_USER_ADMIN_KEY, true);