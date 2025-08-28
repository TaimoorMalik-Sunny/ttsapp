'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, UserPlus, Users, Building2 } from 'lucide-react'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

//   if (status === 'loading') {
//     return <div>Loading...</div>
//   }

//   if (!session) {
//     router.push('/login')
//     return null
//   }
useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }


  const actions = [
    {
      title: 'Register Customer',
      description: 'Add a new customer to the system',
      icon: <UserPlus className="h-8 w-8" />,
      route: '/dashboard/register-customer',
    },
    {
      title: 'Own Wallet',
      description: 'Perform transactions from your own wallet',
      icon: <Wallet className="h-8 w-8" />,
      route: '/dashboard/transaction/own_wallet',
    },
    {
      title: 'Other Wallet',
      description: 'Send to another wallet',
      icon: <Users className="h-8 w-8" />,
      route: '/dashboard/transaction/other_wallet',
    },
    {
      title: 'Bank Account',
      description: 'Transfer to bank account',
      icon: <Building2 className="h-8 w-8" />,
      route: '/dashboard/transaction/bank_account',
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {action.icon}
                {action.title}
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push(action.route)}>
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}