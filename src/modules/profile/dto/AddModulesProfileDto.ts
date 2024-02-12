import { ArrayNotEmpty, IsNotEmpty } from "class-validator";
import { CreateModuleActionsDto } from "./CreateModuleActionsDto";

export class AddModulesProfileDto {
    @IsNotEmpty()
    profileId: string;

    @ArrayNotEmpty()
    modules: CreateModuleActionsDto[];
}