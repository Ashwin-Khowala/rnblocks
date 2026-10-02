import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "RNBlocks-Web",
      Accept: "application/vnd.github+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch("https://api.github.com/repos/Ashwin-Khowala/rnblocks", {
      headers,
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : null;
      return NextResponse.json({ stars });
    }

    return NextResponse.json({ stars: null });
  } catch {
    return NextResponse.json({ stars: null });
  }
}
