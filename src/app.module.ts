import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import RepoModule from './shared/repo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    RepoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  constructor() { }
}
