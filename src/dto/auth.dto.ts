import { IsNotEmpty, IsEmail, Equals } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}