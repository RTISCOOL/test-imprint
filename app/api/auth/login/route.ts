import { NextRequest, NextResponse } from "next/server"
import z from "zod"

import { getSession, parseBody } from "@/lib/api/apiutil"
import { comparePassword } from "@/lib/auth/authutil"
import prisma from "@/lib/prisma"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

export const POST = async (req: NextRequest) => {
  const { body, error } = await parseBody(req, schema)

  if (!body) {
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!foundUser) {
    return NextResponse.json({ error: "User not found", errorOn: "email" }, { status: 400 })
  }

  if (!comparePassword(body.password, foundUser.password)) {
    return NextResponse.json({ error: "Incorrect password", errorOn: "password" }, { status: 400 })
  }

  const session = await getSession()

  session.user = {
    id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
  }

  await session.save()

  return NextResponse.json({
    success: true,
  })
}
