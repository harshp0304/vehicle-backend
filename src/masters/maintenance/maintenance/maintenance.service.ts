import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaintenanceDetailDto } from 'src/models/dto/Maintenancer.dto';
import { MaintenanceTable } from 'src/tables/MaintenanceDetails.table';
import { UpdateMaintenanceDetailDto } from 'src/models/dto/Maintenancer.dto';
@Injectable()
export class MaintenanceService {
  constructor() {}

  async findAll() {
    const data = await MaintenanceTable.findAll();
    return data;
  }

  async create(body: CreateMaintenanceDetailDto) {
    const maintenanceRecord = await MaintenanceTable.create(
      {
        ...body,
        CreatedAt: new Date(),
      },
      {
        fields: [
          'BikeID',
          'Service_Date',
          'Service_Cost',
          'Mileage',
          'Service_Center',
          'Notes',
          'CreatedAt',
        ],
      },
    );

    return maintenanceRecord;
  }

  async findMaintenanceDetails(MNID: number) {
    const data = await MaintenanceTable.findAll({ where: { MNID: MNID } });

    if (!data || data.length === 0) {
      throw new HttpException('Maintenance not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async update(id: number, dto: UpdateMaintenanceDetailDto) {
    const bike = await MaintenanceTable.findByPk(id);
    if (!bike) {
      throw new HttpException(
        `Maintenance with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await bike.update(dto);

    return { success: true, message: 'updated successfully' };
  }
}
