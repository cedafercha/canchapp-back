import { Profile } from "../schemas/profile.schema";
import { ViewModuleActionsDto } from "./ViewModuleActionsDto";

export class ViewProfileDto {
    _id: string;
    name: string;
    modules: ViewModuleActionsDto[];

    constructor(profile: Profile) {
        this._id = profile._id;
        this.name = profile.name;
        this.modules = profile.modules.map(e => {
            return {
                _id: e.module._id,
                name: e.module.name,
                tabID: e.module.tabID,
                actions: e.actions
            };
        });
    }
};