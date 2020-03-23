import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUser {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}