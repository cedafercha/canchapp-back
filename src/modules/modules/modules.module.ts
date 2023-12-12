import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Module as ModuleMongo, ModuleSchema } from './schemas/modules.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ModuleMongo.name, schema: ModuleSchema }])
    ],
})
export class ModulesModule {}
