export interface Int_Master_Bike {
  BikeID: number;
  BikeName: string;
  Model: string;
  Color: string;
  RegistrationNo: string;
  Valid_Until: Date;
  PurchaseDate: Date;
  Amount: number;
  Insurance: string;
  FuelType: string;
  Brand: string;
}

export interface Int_Master_BikeDetails {
  BDID: number;
  BikeID: number;
  InsuranceID: number;
  InsuranceName: string;
  InsuranceStartDate: Date;
  InsuranceEndDate: Date;
}

export interface Int_Master_InsuranceDetails {
  INSID: number;
  BikeID: number;
  CompanyName: string;
  Policy_Number: string;
  Valid_From: Date;
  Valid_Until: Date;
  Premium: number;
  Coverage_Amount: number;
}

export interface Int_Master_MaintenanceDetails {
  MNID?: number;
  BikeID: number;
  Service_Date: Date;
  Service_Cost: number;
  Mileage: number;
  Service_Center: string;
  Notes: string;
  CreatedAt: Date;
}
