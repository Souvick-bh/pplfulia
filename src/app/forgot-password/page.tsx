'use client'

import { supabase2 } from '@/api/user'
import React, { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleForgotPassword() {
    setError('')
    setMessage('')

    const { error } = await supabase2.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      return
    }

    setMessage('Password reset link sent. Check your email.')
  }

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="border p-8 rounded-xl flex flex-col gap-4">
        <h1 className="text-xl">Forgot Password</h1>

        <input
          className="text-black p-2 rounded"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="border p-2 rounded" onClick={handleForgotPassword}>
          Send Reset Link
        </button>

        {message && <p className="text-green-400">{message}</p>}

        {error && <p className="text-red-400">{error}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
