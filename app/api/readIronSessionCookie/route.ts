import { readSession } from "@/lib/session";

import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  try {
    const session = await readSession(request, response);
    const id = session.id;
    return NextResponse.json({ id }, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
