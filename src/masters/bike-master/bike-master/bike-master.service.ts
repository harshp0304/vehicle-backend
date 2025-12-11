import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MASTER_ASSOCIATIONS } from 'src/database/assciations/masterassociation';
import {
  CreateBikeMasterDto,
  UpdateBikeMasterDto,
} from 'src/models/dto/BikeMaster.dto';
import { BikeMasterTable } from 'src/tables/BikeMaster.table';
import { InsuranceTable } from 'src/tables/InsuranceDetails.table';

@Injectable()
export class BikeMasterService {
  constructor(
    @Inject('BIKE_MASTER_MODEL')
    private bikeModel: typeof BikeMasterTable,
  ) {}

  async create(body: CreateBikeMasterDto) {
    const { InsuranceDetails, ...bikeData } = body;

    const bike = await BikeMasterTable.create(
      {
        ...bikeData,
        BikeID: 0,
        Insurance: InsuranceDetails?.[0]?.CompanyName || '',
      },
      {
        fields: [
          'BikeName',
          'Model',
          'Color',
          'RegistrationNo',
          'Valid_Until',
          'PurchaseDate',
          'Amount',
          'FuelType',
          'Brand',
          'Insurance',
        ],
      },
    );

    if (!bike) throw new Error('Bike creation failed.');

    if (InsuranceDetails && InsuranceDetails.length > 0) {
      const insurance = InsuranceDetails[0];
      const insuranceData = {
        BikeID: bike.BikeID,
        CompanyName: insurance.CompanyName,
        Valid_Until: new Date(insurance.Valid_Until),
        Policy_Number: insurance.Policy_Number || '',
        Valid_From: new Date(),
        Premium: insurance.Premium || 0,
        Coverage_Amount: insurance.Coverage_Amount || 0,
      };

      try {
        const existingPolicy = await InsuranceTable.findOne({
          where: { Policy_Number: insuranceData.Policy_Number },
        });

        if (existingPolicy) {
          throw new HttpException(
            `Insurance policy with number ${insuranceData.Policy_Number} already exists`,
            HttpStatus.BAD_REQUEST,
          );
        }

        await InsuranceTable.create(insuranceData);
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }
        console.error('Error saving insurance details:', error);
        throw new HttpException(
          'Failed to save insurance details',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // if (MaintenanceDetails && MaintenanceDetails.length > 0) {
    //   const maintenance = MaintenanceDetails[0];
    //   const maintenanceData = {
    //     MNID: 0, // Auto-incremented by the database
    //     BikeID: bike.BikeID,
    //     Service_Date: new Date(maintenance.Service_Date),
    //     Service_Cost: Number(maintenance.Service_Cost) || 0,
    //     Service_Type: maintenance.Service_Type || 'Regular', // Default to 'Regular' if not provided
    //     Mileage: Number(maintenance.Mileage) || 0,
    //     Service_Center: maintenance.Service_Center || '',
    //     Notes: maintenance.Notes || '',
    //     CreatedAt: new Date(),
    //   };

    //   try {
    //     await MaintenanceTable.create(maintenanceData);
    //   } catch (error) {
    //     console.error('Error saving maintenance details:', error);
    //     // Optionally rethrow or handle the error as needed
    //     throw new Error('Failed to save maintenance details');
    //   }
    // }

    return {
      data: bike,
      message: 'created successfully',
    };
  }

  async update(id: number, dto: UpdateBikeMasterDto) {
    const bike = await BikeMasterTable.findByPk(id);
    if (!bike) {
      throw new HttpException(
        `Bike with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await bike.update(dto);

    return { success: true, message: 'updated successfully' };
  }

  async findAll() {
    try {
      const bikes = await this.bikeModel.findAll({
        include: [
          {
            association: MASTER_ASSOCIATIONS.INSURANCE_DETAILS,
            attributes: [
              'INSID',
              'CompanyName',
              'Policy_Number',
              'Valid_From',
              'Valid_Until',
              'Premium',
              'Coverage_Amount',
            ],
          },
          {
            association: MASTER_ASSOCIATIONS.MAINTENANCE_DETAILS,
            attributes: [
              'MNID',
              'Service_Date',
              'Service_Type',
              'Service_Cost',
              'Mileage',
              'Service_Center',
              'Notes',
              'CreatedAt',
            ],
            required: false,
          },
        ],
      });

      return {
        data: bikes,
        message: 'Bike Master Data',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch bikes';
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    const data = await this.bikeModel.findByPk(id, {
      include: [
        {
          association: MASTER_ASSOCIATIONS.INSURANCE_DETAILS,
          attributes: [
            'INSID',
            'CompanyName',
            'Policy_Number',
            'Valid_From',
            'Valid_Until',
            'Premium',
            'Coverage_Amount',
          ],
        },
        {
          association: MASTER_ASSOCIATIONS.MAINTENANCE_DETAILS,
          attributes: [
            'MNID',
            'Service_Date',
            'Service_Type',
            'Service_Cost',
            'Mileage',
            'Service_Center',
            'Notes',
            'CreatedAt',
          ],
          required: false,
        },
      ],
    });
    if (!data) {
      throw new HttpException('Bike not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
