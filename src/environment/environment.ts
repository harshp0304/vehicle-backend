import * as dotenv from 'dotenv';
dotenv.config();

enum CONFIG {
  DEV = 'dev',
  PROD = 'prod',
}

interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
  dialectOptions?: any;
}

interface Environment {
  JWTKEY: string;
  TOKEN_EXPIRATION: string;
  SECRET_KEY: string;
  PORT: number;
  DATABASE_CONFIG: IDatabaseConfigAttributes;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  JALPI_API_URL: string;
  JALPI_API_KEY: string;
}

const DATA_BASE: string = CONFIG.DEV;
// const DATA_BASE: string = CONFIG.PROD;

interface EnvMode {
  mode: 'dev' | 'prod';
}

// console.log(DATA_BASE);
const DB_CONFIG: Environment = {
  JWTKEY: '',
  TOKEN_EXPIRATION: '1w',
  SECRET_KEY: '',
  PORT: 3000,
  DATABASE_CONFIG: {
    username: 'rs_development',
    password: 'P8L5fE123456_',
    database: 'Kvn_Practice',
    host: '192.168.27.3',
    port: 1433,
    dialect: 'mssql',
    logging: false,
  },
  EMAIL_USER: 'harshhp687@gmail.com',
  // EMAIL_PASS: 'Accur8@2017',
  EMAIL_PASS: 'jgfitprfbxbfrlro',
  JALPI_API_URL: 'https://app.jalpi.com/api/v1/sendTemplateMessage',
  JALPI_API_KEY: '1996647b0adc487d976764428d7f73c1',
};

const MODE: EnvMode = {
  mode: 'dev',
};

export { DB_CONFIG, MODE };
