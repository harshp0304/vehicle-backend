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
  dialectOptions?: {
    ssl?: {
      require: boolean;
      rejectUnauthorized: boolean;
    } | boolean;
  };
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
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
  PORT: 4000,
  DATABASE_CONFIG: {
    username: 'postgres',
    password: 'postgres', // Change this to your PostgreSQL password
    database: 'bike_management',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
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
