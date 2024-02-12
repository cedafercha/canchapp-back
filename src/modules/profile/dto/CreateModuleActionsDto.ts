import { IsEnum, IsNotEmpty } from "class-validator";
import { ActionEnum } from "src/modules/modules/enums/actions.enums";

export class CreateModuleActionsDto {
    @IsNotEmpty()
    module: string;
    
    @IsNotEmpty()
    @IsEnum(ActionEnum, { each: true })
    actions: ActionEnum[];
};