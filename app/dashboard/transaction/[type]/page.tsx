'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuthProvider from '@/components/auth-provider';

interface Customer {
  phoneNumber: string
  name: string
  cnic: string
}

export default function TransactionPage({ params }: { params: { type: string } }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [sendingAmount, setSendingAmount] = useState('')
  const [receivingAmount, setReceivingAmount] = useState('')
  const [receiverInfo, setReceiverInfo] = useState('')
  const [operator, setOperator] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

//   useEffect(() => {
//     if (!session) {
//       router.push('/login')
//     }
//   }, [session, router])

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



  const searchCustomer = async () => {
    if (!searchTerm) return
    
    try {
      const response = await fetch(`/api/customers?phone=${searchTerm}`)
      if (response.ok) {
        const customerData = await response.json()
        setCustomer(customerData)
      } else {
        setCustomer(null)
      }
    } catch (error) {
      console.error('Error searching customer:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer || !session) return
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerPhone: customer.phoneNumber,
          customerName: customer.name,
          customerCnic: customer.cnic,
          sendingAmount: parseFloat(sendingAmount),
          receivingAmount: parseFloat(receivingAmount),
          receiverInfo,
          operator,
          type: params.type,
          userEmail: session.user?.email,
          userId: (session.user as any).id,
        }),
      })
      
      if (response.ok) {
        router.push('/dashboard')
      } else {
        console.error('Failed to create transaction')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthProvider>
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {params.type === 'own_wallet' && 'Own Wallet Transaction'}
            {params.type === 'other_wallet' && 'Other Wallet Transaction'}
            {params.type === 'bank_account' && 'Bank Account Transaction'}
          </CardTitle>
          <CardDescription>
            {params.type === 'own_wallet' && 'Perform transactions from your own wallet'}
            {params.type === 'other_wallet' && 'Send to another wallet'}
            {params.type === 'bank_account' && 'Transfer to bank account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="search">Search Customer by Phone Number</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="search"
                type="tel"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter phone number"
              />
              <Button onClick={searchCustomer}>Search</Button>
            </div>
          </div>

          {customer && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customer.phoneNumber}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    disabled
                  />
                </div>
              </div>

              {(params.type === 'other_wallet' || params.type === 'bank_account') && (
                <div>
                  <Label htmlFor="receiverInfo">
                    {params.type === 'other_wallet' ? 'Receiver Phone Number' : 'Bank Account/IBAN'}
                  </Label>
                  <Input
                    id="receiverInfo"
                    value={receiverInfo}
                    onChange={(e) => setReceiverInfo(e.target.value)}
                    required
                    placeholder={
                      params.type === 'other_wallet' 
                        ? 'Enter receiver phone number' 
                        : 'Enter bank account or IBAN'
                    }
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sendingAmount">Sending Amount</Label>
                  <Input
                    id="sendingAmount"
                    type="number"
                    value={sendingAmount}
                    onChange={(e) => setSendingAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="receivingAmount">Receiving Amount</Label>
                  <Input
                    id="receivingAmount"
                    type="number"
                    value={receivingAmount}
                    onChange={(e) => setReceivingAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="operator">Operator/Channel</Label>
                <Select onValueChange={setOperator} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jazzcash">JazzCash</SelectItem>
                    <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                    <SelectItem value="banks">Banks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Processing...' : 'Submit Transaction'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
    </AuthProvider>
  )
}