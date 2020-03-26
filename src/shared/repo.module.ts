
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import { UserEntity } from '../db/models/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})

export default class RepoModule { }