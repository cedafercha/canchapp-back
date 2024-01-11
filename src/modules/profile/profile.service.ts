import { Injectable } from '@nestjs/common';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { ProfileRepository } from './profile.repository';
import { AddModulesProfileDto } from './dto/AddModulesProfileDto';
import { ModulesService } from '../modules/modules.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly modulesService: ModulesService
  ) {}

  async getProfileById(profileId: string): Promise<Profile> {
    return (await this.profileRepository.findOne({ _id: profileId })).populate('modules');
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.findAll({});
  }

  async create(newProfile: CreateProfileDto): Promise<Profile> {
    newProfile.name = newProfile.name.toUpperCase();
    return this.profileRepository.create(newProfile);
  }

  async addModules(profileData: AddModulesProfileDto): Promise<Profile> {
    const modulesToAdd = await this.modulesService.findManyById(profileData.modules);

    return this.profileRepository.findOneAndUpdate(
      { _id: profileData.profileId },
      { $addToSet: { modules: modulesToAdd }}
    );
  }
}
