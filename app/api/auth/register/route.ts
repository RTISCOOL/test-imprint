import { NextRequest, NextResponse } from "next/server"
import z from "zod"

import { getSession, parseBody } from "@/lib/api/apiutil"
import { hashPassword } from "@/lib/auth/authutil"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100),
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

  if (foundUser) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    )
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassword(body.password),
      name: body.name,
    },
  })
  const session = await getSession()
  session.user = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  }

  await session.save()

  return NextResponse.json({
    success: true,
  })
}
