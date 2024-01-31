import { NextRequest, NextResponse } from "next/server"

import { buildLogout } from "@/lib/api/apiutil"

export const GET = async (req: NextRequest) => {
  return buildLogout(req)
}
