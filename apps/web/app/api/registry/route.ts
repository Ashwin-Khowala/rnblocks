import { NextResponse } from "next/server";
import { REGISTRY_ITEMS } from "@/data/blocks";

export async function GET() {
  try {
    const items = REGISTRY_ITEMS.map(({ Component, code, ...item }) => item);
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
