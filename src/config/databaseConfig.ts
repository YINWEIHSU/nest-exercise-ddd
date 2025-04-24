import { get } from 'env-var';
import '../libs/utils/dotenv';

export const databaseConfig = {
  host: get('MYSQL_HOST').required().asString(),
  port: get('MYSQL_PORT').required().asIntPositive(),
  username: get('MYSQL_USERNAME').required().asString(),
  password: get('MYSQL_PASSWORD').required().asString(),
  database: get('MYSQL_DATABASE').required().asString(),
};
