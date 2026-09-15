import { NextResponse } from "next/server";
import { REGISTRY_DATA } from "@/data/registry-data";

export async function GET() {
  try {
    const items = REGISTRY_DATA.map(({ code, ...item }) => item);
    return NextResponse.json({
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      items,
    });
  } catch (error) {
    console.error("API registry error:", error);
    return NextResponse.json({ error: "Failed to read registry" }, { status: 500 });
  }
}
