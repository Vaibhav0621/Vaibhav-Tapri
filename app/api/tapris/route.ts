// app/api/tapris/route.ts

import { NextResponse } from 'next/server';
import { TapriService } from '@/lib/services/tapri-service';

// This makes sure the route is dynamically rendered every time
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const stage = searchParams.get('stage') || 'all';
    
    const { data, error } = await TapriService.getApprovedTapris({ category, stage });

    if (error) {
      // Don't leak detailed database errors to the client
      console.error("API Route Error:", error);
      return NextResponse.json({ message: 'Error fetching tapris' }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Catch Error:", err);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
