import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as ModuleMongo, ModuleSchema } from './schemas/modules.schema';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ModulesRepository } from './modules.repository';
import { GlobalService } from 'src/global.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ModuleMongo.name, schema: ModuleSchema }])
    ],
    controllers: [ModulesController],
    providers: [ModulesService, ModulesRepository, GlobalService],
    exports: [ModulesService, ModulesRepository]
})
export class ModulesModule {}
