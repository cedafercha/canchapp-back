import { Injectable } from '@nestjs/common';
import { ModulesRepository } from './modules.repository';
import { CreateModuleDto } from './dto/CreateModuleDto';
import { Module } from './schemas/modules.schema';

@Injectable()
export class ModulesService {
    constructor(private readonly modulesRepository: ModulesRepository) {}

    async findAll(): Promise<Module[]> {
        return this.modulesRepository.findAll({});
    }

    async findManyById(modulesId: string[]): Promise<Module[]> {
        return this.modulesRepository.findAll({ _id: { $in: modulesId } });
    }

    async getModuleById(moduleId: string): Promise<Module> {
        return this.modulesRepository.findOne({ _id: moduleId });
    }

    async create(newModule: CreateModuleDto): Promise<Module> {
        newModule.name = newModule.name.toUpperCase();
        return this.modulesRepository.create(newModule);
    }
}
