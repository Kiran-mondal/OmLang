import { neon } from '@neondatabase/serverless';

// .env ফাইল থেকে URL নিয়ে ডেটাবেস কানেক্ট করা হচ্ছে
const sql = neon(process.env.DATABASE_URL);

export default sql;
