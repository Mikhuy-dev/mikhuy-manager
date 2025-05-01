import { AuthLoginEntity } from './authlogin-entity';
import { UserEntity } from './user-entity';

export interface AuthResponseEntity {
    accesstoken: string;
    seller: UserEntity;
}

