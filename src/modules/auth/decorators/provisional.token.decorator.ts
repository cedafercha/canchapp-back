import { SetMetadata } from '@nestjs/common';

export const IS_PROVISIONAL_TOKEN_KEY = 'isProvisionalToken';
export const ProvisionalToken = () => SetMetadata(IS_PROVISIONAL_TOKEN_KEY, true);