import { NextResponse } from 'next/server';
import sql from '../../../lib/db'; // Your Neon DB connection

export async function POST(request) {
  try {
    // Extract the data sent from the frontend
    const { title, code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code cannot be empty" }, { status: 400 });
    }

    // Insert the code snippet into the Neon Database
    const result = await sql`
      INSERT INTO code_snippets (title, code)
      VALUES (${title || 'Untitled snippet'}, ${code})
      RETURNING id, title, created_at;
    `;

    return NextResponse.json(
      { message: "Code saved successfully!", data: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to save code to the database." },
      { status: 500 }
    );
  }
}
