import { NextRequest, NextResponse } from "next/server"
import z from "zod"

import { buildLogout, getUserObject, parseParams } from "@/lib/api/apiutil"

const schema = z.object({
  variable: z.string(),
})

export const GET = async (req: NextRequest) => {
  const { params, error } = await parseParams(req, schema)

  if (!params) {
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const user = await getUserObject()

  if (!user) {
    return buildLogout(req)
  }

  return NextResponse.json({
    success: true,
  })
}
