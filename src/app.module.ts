import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users/users.service';
import {UsersModule} from "./controller/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
