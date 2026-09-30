import type { Metadata } from 'next'
import { AuthProvider } from './contexts/AuthContext'
import Header from './Components/Header'
import Footer from './Components/Footer'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'PPL',
  description: 'Witness The Enthusiasm',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#000000] text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
