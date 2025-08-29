// app/api/admin/customers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  // Add admin authentication check here
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search');

  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { phoneNumber: { contains: searchTerm || '' } },
          { name: { contains: searchTerm || '' } },
          { cnic: { contains: searchTerm || '' } },
        ],
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}