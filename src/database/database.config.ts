import { BikeMasterTable } from 'src/tables/BikeMaster.table';

export const TABLE_MAIN = [BikeMasterTable];

export const SEQUELIZE_CONFIG = {
  MAIN_CONFIG: {
    logging: false,
    alter: false,
  },
  OTHER: {
    SYNC_TABLES: false,
  },
};
