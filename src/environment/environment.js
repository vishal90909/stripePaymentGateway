import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export const environment = {
  secret_token: env.secretToken,
}