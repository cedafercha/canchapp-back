import { IsNotEmpty } from "class-validator";

export class AddModulesProfileDto {
    @IsNotEmpty()
    profileId: string;

    @IsNotEmpty()
    modules?: string[];
}