import { IsNotEmpty } from "class-validator";

export class UpdateCompanyDto {
    name?: string;

    address?: string;

    coordinates?: string;

    indentification?: string;
};