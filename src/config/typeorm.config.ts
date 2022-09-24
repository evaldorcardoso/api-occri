import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '35.199.120.28',
  port: parseInt(process.env.DB_PORT)  || 3306,
  username: process.env.DB_USERNAME || 'teste',
  password: process.env.DB_PASSWORD || 'LMcMQu/iJOB?Fy70',
  database: process.env.DB_DATABASE || 'database-occri',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  synchronize: false
}

console.log(`env: ${process.env.NODE_ENV || `DEFAULT`}`);
console.log(`env: ${typeOrmConfig.database}`);