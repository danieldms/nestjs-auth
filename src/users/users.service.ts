import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUser } from "../dto/user.dto";
import { validate } from "class-validator";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repo: Repository<UserEntity>
	) {
	}

	async findAll(where?: any): Promise<UserEntity[]> {
		const users = await this.repo.find({
			where
		});

		return users;
	}

	async findByEmail(email: string): Promise<any> {
		const user = await this.repo.findOne({ email: email });
		return user;
	}

	async findById(id: string): Promise<any> {
		const user = await this.repo.findOne(id);

		if (!user) {
			const errors = { User: 'not found' };
			throw new HttpException({ errors }, 401);
		}

		return user;
	}

	async store(user: CreateUser) {
		user = Object.assign(new UserEntity(), user);

		const { email } = user;

		const qb = await this.repo.findOne({ email: email });

		if (qb) {
			const errors = { email: 'Email must be unique.' };
			throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
		}

		const errors = await validate(user);
		if (errors.length) {
			const _errors = { username: 'User is not valid.' };
			throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
		}

		const _user = await this.repo.save(user);

		return this.sanitize(_user);
	}

	async update(id: string, data: any) {
		const userToUpdated = await this.repo.findOne(id);

		delete userToUpdated.password;

		let updated = Object.assign(userToUpdated, data);

		return await this.repo.save(userToUpdated);
	}

	async delete(id: string) {
		const result = await this.repo.delete(id);

		return { data: result };
	}
	
	sanitize(entity: UserEntity) {
		const user = {
			id: entity.id,
			name: entity.name,
			email: entity.email,
			created_at: entity.created_at
		};

		return user;
	}

}