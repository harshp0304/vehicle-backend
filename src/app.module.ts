import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeMasterModule } from './masters/bike-master/bike-master/bike-master.module';
import { DatabaseModule } from './database/database.module';
import { MaintenanceModule } from './masters/maintenance/maintenance/maintenance.module';

@Module({
  imports: [
    DatabaseModule,
    // Core modules
    BikeMasterModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
