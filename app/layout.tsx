import type { Metadata } from "next";

import "./globals.css";

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

import ClientLayout from '../components/client-layout';



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
      <ClientLayout session={session}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
