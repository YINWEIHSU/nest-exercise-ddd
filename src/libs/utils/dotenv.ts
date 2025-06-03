import * as path from 'path'
import { config } from 'dotenv'

// Initializing dotenv
const envPath: string = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../../../.env.test' : '../../../../.env',
)
console.log('Loading env file from:', envPath)
config({ path: envPath })
