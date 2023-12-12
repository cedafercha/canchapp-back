import { Injectable } from '@nestjs/common';
import { Profile } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfileById(profileId: string): Promise<Profile> {
    return this.profileRepository.findOne({ _id: profileId });
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.findAll({});
  }

  async create(newProfile: CreateProfileDto): Promise<Profile> {
    newProfile.name = newProfile.name.toUpperCase();
    return this.profileRepository.create(newProfile);
  }
}
