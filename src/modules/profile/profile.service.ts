import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { ProfileRepository } from './profile.repository';
import { AddModulesProfileDto } from './dto/AddModulesProfileDto';
import { ModulesService } from '../modules/modules.service';
import { CreateModuleActionsDto } from './dto/CreateModuleActionsDto';
import { Module } from '../modules/schemas/modules.schema';
import { ViewProfileDto } from './dto/ViewProfileDto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly modulesService: ModulesService
  ) {}

  async getProfileByIdIntern(profileId: string): Promise<Profile> {
    return await this.profileRepository.findOne({ _id: profileId });
  }

  async getProfileById(profileId: string): Promise<ViewProfileDto> {
    const profile = await (await this.profileRepository.findOne({ _id: profileId }))
      .populate({
        path: 'modules.module',
        select: ['name', 'tabID']
      });

    return new ViewProfileDto(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.findAll({});
  }

  async create(newProfile: CreateProfileDto): Promise<Profile> {
    if (newProfile.modules?.length > 0) {
      await this.validateModulesActions(newProfile.modules);
    }

    newProfile.name = newProfile.name.toUpperCase();
    return this.profileRepository.create(newProfile);
  }

  async addModules(profileData: AddModulesProfileDto): Promise<Profile> {
    await this.validateModulesActions(profileData.modules);

    const modulesActions = await this.getMergedModulesActionsProfile(profileData);

    return this.profileRepository.findOneAndUpdate(
      { _id: profileData.profileId },
      { modules: modulesActions }
    );
  }

  async getMergedModulesActionsProfile(profileData: AddModulesProfileDto): Promise<CreateModuleActionsDto[]> {
    const profileActions = await this.getCurrentActionsProfile(profileData.profileId);
    const resultMap = new Map();

    // Map the data from the profile
    for (const { module, actions } of profileActions) {
        resultMap.set(module, { module, actions: actions.slice() });
    }

    for (const { module, actions } of profileData.modules) {
      if (resultMap.has(module)) {
          // Module already exists, replace actions
          resultMap.get(module).actions = actions;
      } else {
          // Module doesn't exist, add it to resultMap
          resultMap.set(module, { module, actions: actions.slice() });
      }
    }

    // Convert resultMap to array
    return Array.from(resultMap.values());
  }

  async getCurrentActionsProfile(profileId: string): Promise<CreateModuleActionsDto[]> {
    return (await this.getProfileByIdIntern(profileId)).modules.map(e => {
      return {
        module: e.module._id.toString(),
        actions: e.actions
      }
    });
  }

  async validateModulesActions(modulesActions: CreateModuleActionsDto[]): Promise<void> {
    const modulesToAdd = await this.getModules(modulesActions.map(e => e.module));

    let modulesRepeated = {};

    modulesActions.forEach(item => {
      const module = modulesToAdd.find(el => el._id == item.module);

      // Verify the original actions in the module registry
      if(!this.arrayIncludesAll(module.actions, item.actions)) {
        throw new InternalServerErrorException(`The module ${module.name} doesn't has the actions required: ${item.actions}`);
      }

      modulesRepeated[item.module] = modulesRepeated[item.module] + 1 || 1;
    });

    // The module can be modified by once
    if(Object.values(modulesRepeated).some(value => value as number > 1)){
      throw new InternalServerErrorException(`A module cannot be added twice`);
    }
  }
  
  arrayIncludesAll(mainArray, subArray) {
    return subArray.every(item => mainArray.includes(item));
}

  async getModules(modulesIds: string[]): Promise<Module[]> {
    return this.modulesService.findManyById(modulesIds);
  }
}
