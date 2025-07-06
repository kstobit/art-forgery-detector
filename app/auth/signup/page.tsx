'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const [name, setName] = useState('')
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        router.push('/auth/signin?message=Registration successful')
      } else {
        const data = await response.json()
        setError(data.error || 'Registration failed')
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
            <Link href="/auth/signin">Sign In</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ maxWidth: '400px', padding: '2rem 0' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign Up</h1>
          
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
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                minLength={6}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
              <small style={{ color: '#666' }}>Minimum 6 characters</small>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p>
              Already have an account?{' '}
              <Link href="/auth/signin" style={{ color: '#667eea' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}