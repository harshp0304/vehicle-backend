import { BikeDetailsTable } from 'src/tables/BikeDetails.table';
import { BikeMasterTable } from 'src/tables/BikeMaster.table';
import { InsuranceTable } from 'src/tables/InsuranceDetails.table';
import { MaintenanceTable } from 'src/tables/MaintenanceDetails.table';

export class masterAssociation {
  constructor() {
    BikeMasterTable.hasMany(BikeDetailsTable, {
      sourceKey: 'BikeID',
      foreignKey: 'BikeID',
      as: MASTER_ASSOCIATIONS.BIKE_DETAILS,
    });
    BikeMasterTable.hasMany(MaintenanceTable, {
      sourceKey: 'BikeID',
      foreignKey: 'BikeID',
      as: MASTER_ASSOCIATIONS.MAINTENANCE_DETAILS,
    });
    BikeMasterTable.hasMany(InsuranceTable, {
      sourceKey: 'BikeID',
      foreignKey: 'BikeID',
      as: MASTER_ASSOCIATIONS.INSURANCE_DETAILS,
    });

    InsuranceTable.belongsTo(BikeMasterTable, {
      foreignKey: 'BikeID',
      targetKey: 'BikeID',
      as: MASTER_ASSOCIATIONS.BIKE_MASTER,
    });
  }
}

export const MASTER_ASSOCIATIONS = {
  BIKE_DETAILS: 'BikeDetails',
  INSURANCE_DETAILS: 'InsuranceDetails',
  BIKE_MASTER: 'BikeMaster',
  MAINTENANCE_DETAILS: 'MaintenanceDetails',
};
