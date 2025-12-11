import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BikeMasterService } from './bike-master.service';
import {
  CreateBikeMasterDto,
  UpdateBikeMasterDto,
} from 'src/models/dto/BikeMaster.dto';

@Controller('bike')
export class BikeMasterController {
  constructor(private readonly BikeMasterService: BikeMasterService) {}

  @Post()
  async create(@Body() body: CreateBikeMasterDto) {
    return this.BikeMasterService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateBikeMasterDto) {
    try {
      const response = await this.BikeMasterService.update(id, dto);
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.BikeMasterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.BikeMasterService.findOne(id);
  }
}
