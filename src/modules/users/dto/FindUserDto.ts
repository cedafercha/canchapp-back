import { Profile } from "src/modules/profile/schemas/profile.schema";

export class FindUserDto {
    public userName: string;
    public profile?: Profile;
}