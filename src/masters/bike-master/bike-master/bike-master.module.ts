import { Module } from '@nestjs/common';
import { BikeMasterService } from './bike-master.service';
import { BikeMasterController } from './bike-master.controller';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BikeMasterService],
  controllers: [BikeMasterController],
  exports: [BikeMasterService],
})
export class BikeMasterModule {}
