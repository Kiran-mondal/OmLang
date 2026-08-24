import { NextResponse } from 'next/server';
import sql from '../../../lib/db'; // Your Neon DB connection

export async function POST(request) {
  try {
    // Extract the data sent from the frontend
    const { title, code } = await request.json();

    // Sentinel Security: Input Validation - Check types and lengths
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: "Code must be a valid string and cannot be empty" }, { status: 400 });
    }

    // Sentinel Security: Add a maximum length limit to prevent DoS via huge payload
    if (code.length > 50000) {
      return NextResponse.json({ error: "Code snippet is too large. Maximum size is 50000 characters." }, { status: 413 });
    }

    let safeTitle = title || 'Untitled snippet';
    if (typeof safeTitle !== 'string') {
       safeTitle = 'Untitled snippet';
    } else if (safeTitle.length > 255) {
       // Sentinel Security: Prevent database overflow on VARCHAR(255)
       safeTitle = safeTitle.substring(0, 255);
    }

    // Insert the code snippet into the Neon Database
    const result = await sql`
      INSERT INTO code_snippets (title, code)
      VALUES (${safeTitle}, ${code})
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
