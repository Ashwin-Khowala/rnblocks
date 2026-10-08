import { NextResponse, type NextRequest } from "next/server";
import { verifyAccess, version } from "flags";
import { getProviderData } from "flags/next";
import { registryFlags } from "@/flags";

export async function GET(request: NextRequest) {
  const secret = process.env.FLAGS_SECRET;

  // In development, allow Discovery without FLAGS_SECRET for local testing
  if (process.env.NODE_ENV === "development" && !secret) {
    return NextResponse.json(getProviderData(registryFlags), {
      headers: {
        "x-flags-sdk-version": version,
        "cache-control": "no-store",
      },
    });
  }

  // If no secret is configured yet in production, reject securely
  if (!secret) {
    return NextResponse.json(null, { status: 401 });
  }

  const authHeader = request.headers.get("authorization");
  const access = await verifyAccess(authHeader, secret);

  if (!access) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(getProviderData(registryFlags), {
    headers: {
      "x-flags-sdk-version": version,
      "cache-control": "no-store",
    },
  });
}
