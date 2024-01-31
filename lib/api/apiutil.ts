import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { IronSession, getIronSession } from "iron-session"
import { ZodSchema } from "zod"

import prisma from "@/lib/prisma"

export async function parseBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ error: string | null; body: T | null }> {
  const body = await req.json()
  //console.log("REQUEST:", req.url, body);
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return { error: parsed.error.message, body: null }
  }
  return { error: null, body: parsed.data }
}

export async function parseParams<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ error: string | null; params: T | null }> {
  const params = req.nextUrl.searchParams.keys()

  const allparams = Array.from(params).reduce((acc, key) => {
    acc[key] = req.nextUrl.searchParams.get(key)
    return acc
  }, {} as { [key: string]: string | null })

  const parsed = schema.safeParse(allparams)

  if (!parsed.success) {
    return { error: parsed.error.message, params: null }
  }

  return { error: null, params: parsed.data }
}

export async function getSessionUser() {
  const session = await getSession()
  if (!session || !session.user || !session.user.id) {
    return null
  }

  return session.user
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    password: process.env.JWT_SECRET as string,
    cookieName: process.env.SESSION_COOKIE_NAME as string,
  })
  return session
}

export async function getUserObject() {
  const session = await getSession()
  if (!session.user || !session.user.id) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) {
    return null
  }

  return user
}

export async function buildLogout(req: NextRequest) {
  const session = await getSession()

  await session.destroy()
  await session.save()

  const destinationUrl = new URL("/", new URL(req.url).origin)
  const response = NextResponse.redirect(destinationUrl, { status: 302 })

  return response
}
