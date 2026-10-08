import { NextResponse } from "next/server";
import { reportValue } from "flags";
import { track } from "@vercel/analytics/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { event, block, version } = data;

    // Report flag value for runtime observability
    reportValue("cliTelemetryV2", true);

    // Track server event enriched with feature flags in Vercel Analytics
    await track(
      event || "cli_add_block",
      {
        block: block || "unknown",
        cliVersion: version || "unknown",
      },
      { flags: ["cliTelemetryV2"] }
    ).catch(() => {
      // Safe fallback if analytics ingestion is offline or rate-limited
    });

    console.log(
      `[RNBlocks Telemetry] ${event || "ping"} — block=${block || "unknown"} v=${version || "unknown"}`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

