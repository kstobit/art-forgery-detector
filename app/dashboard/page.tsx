'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <Link href="/" className="logo">ArtAuth</Link>
          <div>
            <span style={{ marginRight: '1rem' }}>Hi, {session.user?.name}!</span>
            <button onClick={() => signOut()} className="btn">Sign Out</button>
          </div>
        </nav>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1>Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div className="feature-card">
            <h3>Your Subscription</h3>
            <p><strong>Plan:</strong> {session.user?.subscription || 'Free'}</p>
            <p><strong>Analyses Used:</strong> 0/1 (Free users)</p>
            <Link href="/pricing" className="btn">Upgrade Plan</Link>
          </div>

          <div className="feature-card">
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/analyze" className="btn">Analyze New Artwork</Link>
              <Link href="/history" className="btn">View Analysis History</Link>
            </div>
          </div>

          <div className="feature-card">
            <h3>Recent Activity</h3>
            <p>No recent analyses</p>
            <small style={{ color: '#666' }}>Your analysis history will appear here</small>
          </div>
        </div>

        <div style={{ marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2>Getting Started</h2>
          <div style={{ marginTop: '1rem' }}>
            <h3>1. Upload Your First Artwork</h3>
            <p>Click "Analyze New Artwork" to upload an image and get started</p>
            
            <h3>2. Review Results</h3>
            <p>Our AI will analyze your artwork and provide authenticity insights</p>
            
            <h3>3. Upgrade for More Features</h3>
            <p>Get unlimited analyses and detailed reports with a Pro subscription</p>
          </div>
        </div>
      </main>
    </div>
  )
}