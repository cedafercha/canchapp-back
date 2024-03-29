import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ModulesModule } from '../modules/modules.module';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { GlobalService } from 'src/global.service';
import { ProfileController } from './profile.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
        ModulesModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService, ProfileRepository, GlobalService],
    exports: [ProfileService, ProfileRepository]
})
export class ProfileModule {}
