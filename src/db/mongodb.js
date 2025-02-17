import mongoose from 'mongoose';
import { DB_URL, NODE_ENV } from '../../env.js';

if (!DB_URL) {
  throw new Error(
    'Please deine the mongodb url inside .env.<development/production>.local'
  );
}

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(conn.connection.host);
    console.log(`Connected to mongodb in ${NODE_ENV} mode`);
  } catch (err) {
    console.error('error connecting to database :', err);
    process.exit(1);
  }
};

export default connectToDb;
