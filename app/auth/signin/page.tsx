'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <Link href="/" className="logo">ArtAuth</Link>
          <div>
            <Link href="/auth/signup">Sign Up</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ maxWidth: '400px', padding: '2rem 0' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h1>
          
          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#c33', 
              padding: '1rem', 
              borderRadius: '4px', 
              marginBottom: '1rem' 
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p>
              Don't have an account?{' '}
              <Link href="/auth/signup" style={{ color: '#667eea' }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}