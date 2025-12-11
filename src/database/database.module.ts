// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders, modelProviders } from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, ...modelProviders],
  exports: [...databaseProviders, ...modelProviders],
})
export class DatabaseModule {}
