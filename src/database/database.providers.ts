import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { BikeMasterTable } from '../tables/BikeMaster.table';
import { Logger } from '@nestjs/common';
import { BikeDetailsTable } from 'src/tables/BikeDetails.table';
import { masterAssociation } from './assciations/masterassociation';
import { InsuranceTable } from 'src/tables/InsuranceDetails.table';
import { MaintenanceTable } from 'src/tables/MaintenanceDetails.table';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  define: {
    timestamps: boolean;
    underscored: boolean;
  };
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  retry: {
    max: number;
    timeout: number;
  };
}

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService): Promise<Sequelize> => {
      const logger = new Logger('DatabaseProvider');

      try {
        const dbConfig: DatabaseConfig = {
          host: configService.get<string>('DB_HOST', '192.168.27.3'),
          port: configService.get<number>('DB_PORT', 1433),
          username: configService.get<string>('DB_USERNAME', 'rs_development'),
          password: configService.get<string>('DB_PASSWORD', 'P8L5fE123456_'),
          database: configService.get<string>('DB_NAME', 'Kvn_Practice'),
          logging: configService.get<string>('NODE_ENV') === 'development',
          define: {
            timestamps: true,
            underscored: true,
          },
          pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
          retry: {
            max: 3,
            timeout: 30000, // 30 seconds
          },
        };

        logger.log(
          `Connecting to database: ${dbConfig.database}@${dbConfig.host}:${dbConfig.port}`,
        );

        const sequelize = new Sequelize({
          dialect: 'mssql',
          ...dbConfig,
        });

        sequelize.addModels([
          BikeMasterTable,
          BikeDetailsTable,
          InsuranceTable,
          MaintenanceTable,
        ]);

        // Test the connection
        await sequelize.authenticate();
        logger.log('Database connection established successfully');

        // Initialize model associations
        new masterAssociation();
        logger.log('Model associations initialized');

        // Sync all models
        await sequelize.sync({ alter: false });
        logger.log('Database synchronized');

        return sequelize;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown database error';
        logger.error(`Database connection error: ${errorMessage}`);

        // Provide more helpful error message
        if (errorMessage.includes('ECONNREFUSED')) {
          throw new Error(
            'Failed to connect to MySQL server. ' +
              'Please make sure MySQL is running and the connection details in your .env file are correct.\n' +
              'Error: ' +
              errorMessage,
          );
        }

        if (error instanceof Error) {
          throw error;
        }

        throw new Error('An unknown database error occurred');
      }
    },
    inject: [ConfigService],
  },
];

// Export model providers
export const modelProviders = [
  {
    provide: 'BIKE_MASTER_MODEL',
    useValue: BikeMasterTable,
  },
  {
    provide: 'BIKE_DETAILS_MODEL',
    useValue: BikeDetailsTable,
  },
  {
    provide: 'INSURANCE_DETAILS_MODEL',
    useValue: InsuranceTable,
  },
  {
    provide: 'MAINTENANCE_DETAILS_MODEL',
    useValue: MaintenanceTable,
  },
];
