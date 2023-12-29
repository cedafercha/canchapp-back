import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as ModuleMongo, ModuleSchema } from './schemas/modules.schema';
import { ModulesController } from './modules.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ModuleMongo.name, schema: ModuleSchema }])
    ],
    controllers: [ModulesController]
})
export class ModulesModule {}
