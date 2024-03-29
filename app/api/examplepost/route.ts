import { NextRequest, NextResponse } from "next/server"
import z from "zod"

import { buildLogout, getUserObject, parseBody } from "@/lib/api/apiutil"

const schema = z.object({
  variable: z.string(),
})

export const POST = async (req: NextRequest) => {
  const { body, error } = await parseBody(req, schema)

  if (!body) {
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
