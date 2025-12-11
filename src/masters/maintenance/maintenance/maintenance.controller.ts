import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import {
  CreateMaintenanceDetailDto,
  UpdateMaintenanceDetailDto,
} from 'src/models/dto/Maintenancer.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  async create(@Body() body: CreateMaintenanceDetailDto) {
    return this.maintenanceService.create(body);
  }

  @Get()
  async findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':bikeID')
  async getUserById(@Param('bikeID') bikeID: number) {
    try {
      const data = await this.maintenanceService.findMaintenanceDetails(bikeID);
      return data;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateMaintenanceDetailDto,
  ) {
    try {
      const data = await this.maintenanceService.update(id, body);
      return data;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
