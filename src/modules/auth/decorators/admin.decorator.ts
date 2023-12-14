import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin'; // This must be a secret!
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);