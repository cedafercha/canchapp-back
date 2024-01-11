import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    name: string;

    // Opcional agregar módulos desde la creación del perfil!
    modules?: string[];
}