import { NextResponse } from 'next/server';
import sql from '../../../lib/db'; // db.js ফাইলটি ইম্পোর্ট করা হচ্ছে

export async function GET() {
  try {
    // ডেটাবেসে code_snippets নামে একটি টেবিল তৈরি করার SQL কমান্ড
    await sql`
      CREATE TABLE IF NOT EXISTS code_snippets (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        code TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    return NextResponse.json(
      { message: "Success! 'code_snippets' table has been created in Neon Database." }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}

