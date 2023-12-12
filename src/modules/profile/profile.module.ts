import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ModulesModule } from '../modules/modules.module';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
        // ModulesModule
    ],
    // controllers: [CompanyController],
    providers: [ProfileService, ProfileRepository],
    exports: [ProfileService, ProfileRepository]
})
export class ProfileModule {}
