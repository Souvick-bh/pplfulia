import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { logVisits } from '@/api/logVisits'

export async function GET() {
  try {
    logVisits()
    const visits = (await redis.get('total_visits')) || 0
    return NextResponse.json({ visits })
  } catch (error) {
    console.error('Redis Error:', error)
    return NextResponse.json({ visits: 0 })
  }
}

export async function POST() {
  try {
    const visits = await redis.incr('total_visits')
    return NextResponse.json({ visits })
  } catch (error) {
    console.error('Redis Error:', error)
    return NextResponse.json({ visits: 0 })
  }
}
