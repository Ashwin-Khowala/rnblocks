import { NextRequest, NextResponse } from "next/server";
import { REGISTRY_ITEMS } from "@/data/blocks";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const item = REGISTRY_ITEMS.find((b) => b.slug === slug);

    if (!item) {
      return NextResponse.json(
        { error: `Item "${slug}" not found in registry` },
        { status: 404 }
      );
    }

    const { Component, ...data } = item;
    return NextResponse.json(data);
  } catch (error) {
    console.error("API item error:", error);
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}
