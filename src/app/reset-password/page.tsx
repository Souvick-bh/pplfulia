'use client'

import { supabase2 } from '@/api/user'
import { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function updatePassword() {
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { error } = await supabase2.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('✅ Password updated successfully! Redirecting...')

    setTimeout(() => {
      router.push('/auth')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6">
      <div className="w-full max-w-md border-4 border-black bg-white p-8 shadow-[8px_8px_0px_#000]">
        <h1 className="text-3xl font-black uppercase tracking-tight">Reset Password</h1>

        <p className="mt-2 text-sm text-neutral-700">Enter a new password for your account.</p>

        <div className="mt-8 flex flex-col gap-5">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-4 border-black bg-[#FFF9C4] px-4 py-3 pr-20 text-lg outline-none transition focus:-translate-x-1 focus:-translate-y-1 focus:shadow-[6px_6px_0px_#000]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase transition hover:-translate-x-0.5 hover:-translate-y-[55%] hover:shadow-[2px_2px_0px_#000]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={updatePassword}
            disabled={loading}
            className="border-4 border-black bg-[#FFE45E] px-4 py-3 font-black uppercase transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-60"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          {message && (
            <div
              className={`border-4 border-black p-3 font-semibold ${
                message.startsWith('✅') ? 'bg-[#C8F7C5]' : 'bg-[#FFD6D6]'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
