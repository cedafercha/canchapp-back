import { ActionEnum } from "src/modules/modules/enums/actions.enums";

export class ViewModuleActionsDto {
    _id: string;
    name: string;
    tabID: number;
    actions: ActionEnum[]; // acciones permitidas para el perfil
    // actionsAllowed: ActionEnum[]; -> Para obtener las acciones permitidas del módulo
}