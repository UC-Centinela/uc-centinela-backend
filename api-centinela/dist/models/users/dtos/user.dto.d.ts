export declare class CreateUserDto {
    name: string;
    email: string;
    phone: string;
    description: string;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class UserDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    description: string;
}
export {};
