import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { ActionEnum } from "../enums/actions.enums";

export class CreateModuleDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    tabID: number;

    @IsNotEmpty()
    @IsEnum(ActionEnum, { each: true })
    actions: ActionEnum[];
}