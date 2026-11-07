import { NextResponse } from 'next/server';
import { db } from '@/lib/server/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    db.prepare('SELECT 1 AS ok').get();
    return NextResponse.json({ status: 'ok', database: 'ok' });
  } catch {
    return NextResponse.json(
      { status: 'error', database: 'unavailable' },
      { status: 503 },
    );
  }
}
