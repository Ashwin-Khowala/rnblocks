import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { event, block, version } = data;

    // Log the anonymous CLI installation event in server logs (accessible in Vercel Runtime Logs)
    console.log(
      `[RNBlocks Telemetry] ${event || "ping"} — block=${block || "unknown"} v=${version || "unknown"}`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
