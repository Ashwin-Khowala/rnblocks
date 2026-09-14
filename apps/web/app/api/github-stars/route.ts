import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/Ashwin-Khowala/rnblocks", {
      headers: {
        "User-Agent": "RNBlocks-Web",
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : 2;
      return NextResponse.json({ stars });
    }

    return NextResponse.json({ stars: 2 });
  } catch {
    return NextResponse.json({ stars: 2 });
  }
}
