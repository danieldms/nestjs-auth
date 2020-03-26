import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/db/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export default class RepoService {
  
  public constructor(
    @InjectRepository(UserEntity) public readonly userRepo: Repository<UserEntity>
  ) { };

}