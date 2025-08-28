import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      customerPhone,
      customerName,
      customerCnic,
      sendingAmount,
      receivingAmount,
      receiverInfo,
      operator,
      type,
      userEmail,
      userId,
    } = body

    const transaction = await prisma.transaction.create({
      data: {
        customerPhone,
        customerName,
        customerCnic,
        sendingAmount,
        receivingAmount,
        receiverInfo,
        operator,
        type,
        userEmail,
        userId,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}