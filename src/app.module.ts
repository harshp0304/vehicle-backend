import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeMasterModule } from './masters/bike-master/bike-master/bike-master.module';
import { DatabaseModule } from './database/database.module';
import { MaintenanceModule } from './masters/maintenance/maintenance/maintenance.module';
import { AuthModule } from './authentication/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    // Core modules
    BikeMasterModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
