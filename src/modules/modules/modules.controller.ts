import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { Admin } from "../auth/decorators/admin.decorator";
import { CreateModuleDto } from "./dto/CreateModuleDto";
import { Module } from "./schemas/modules.schema";
import { ModulesService } from "./modules.service";

@Admin()
@Controller('api/v1/modules')
export class ModulesController {
    constructor(private readonly modulesService: ModulesService){}

    @Get('findAll')
    async findAll(): Promise<Module[]> {
        return this.modulesService.findAll();
    }

    @Get('find/:id')
    async getModuleById(@Param('id') moduleId: string): Promise<Module> {
        return this.modulesService.getModuleById(moduleId);
      }

    @Post('create')    
    async create(@Body() newModule: CreateModuleDto): Promise<Module> {
        return this.modulesService.create(newModule);
    }
}