import { Body, Controller, Get, Post, Param, Query } from "@nestjs/common";
import { Admin } from "../auth/decorators/admin.decorator";
import { CreateModuleDto } from "./dto/CreateModuleDto";
import { Module } from "./schemas/modules.schema";

@Admin()
@Controller('api/v1/modules')
export class ModulesController {
    constructor(){}

    @Post('create')    
    async create(@Body() newModule: CreateModuleDto): Promise<Module>{
        return null;
    }
}