import { NextResponse } from 'next/server';
import sql from '../../../lib/db'; // Your Neon DB connection[span_1](start_span)[span_1](end_span)
import { runOmLang } from '../../../lib/omlang/Engine'; 

export async function POST(request) {
  try {
    // Extract the data sent from the frontend[span_2](start_span)[span_2](end_span)
    const { title, code } = await request.json();

    // Sentinel Security: Input Validation - Check types and lengths[span_3](start_span)[span_3](end_span)
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: "Code must be a valid string and cannot be empty" }, { status: 400 }); //[span_4](start_span)[span_4](end_span)
    }

    // Sentinel Security: Add a maximum length limit to prevent DoS via huge payload[span_5](start_span)[span_5](end_span)
    if (code.length > 50000) {
      return NextResponse.json({ error: "Code snippet is too large. Maximum size is 50000 characters." }, { status: 413 }); //[span_6](start_span)[span_6](end_span)
    }

    let safeTitle = title || 'Untitled snippet'; //[span_7](start_span)[span_7](end_span)
    if (typeof safeTitle !== 'string') {
       safeTitle = 'Untitled snippet'; //[span_8](start_span)[span_8](end_span)
    } else if (safeTitle.length > 255) {
       // Sentinel Security: Prevent database overflow on VARCHAR(255)[span_9](start_span)[span_9](end_span)
       safeTitle = safeTitle.substring(0, 255); //[span_10](start_span)[span_10](end_span)
    }

    // 1. Run the code through the updated OmLang Engine
    const executionResult = runOmLang(code);

    // 2. Insert the code snippet into the Neon Database[span_11](start_span)[span_11](end_span)
    const result = await sql`
      INSERT INTO code_snippets (title, code)
      VALUES (${safeTitle}, ${code})
      RETURNING id, title, created_at;
    `; //[span_12](start_span)[span_12](end_span)

    // 3. Return structured payload for the frontend
    if (!executionResult.success) {
      return NextResponse.json({ 
        status: 'error', 
        output: executionResult.error, 
        data: result[0] 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      status: 'success', 
      output: executionResult.result, 
      data: result[0] 
    }, { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Failed to process request." }, 
      { status: 500 } //[span_13](start_span)[span_13](end_span)
    );
  }
}
