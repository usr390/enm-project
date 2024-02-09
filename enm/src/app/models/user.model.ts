export interface User  {
    
    "id": string,
    "_id": string,
    "username": string,
    "plus": boolean,
    "expires": string

}

export type NullableUser = User | null