import { IsNotEmpty } from "class-validator";
import { CreateModuleActionsDto } from "./CreateModuleActionsDto";

export class CreateProfileDto {
    @IsNotEmpty()
    name: string;

    modules?: CreateModuleActionsDto[];
}