import { StringIndexedObject } from './props';

export interface User extends StringIndexedObject {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    name?: string;
    avatar?: string;
    roles?: string[];
}
