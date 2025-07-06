'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    // Handle file drop
    const files = e.dataTransfer.files
    if (files.length > 0) {
      console.log('Files dropped:', files)
    }
  }

  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <div className="logo">ArtAuth</div>
          <div>
            <Link href="/auth/signin" className="btn">Sign In</Link>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Authenticate Your Art</h1>
          <p>AI-powered art forgery detection service for collectors, galleries, and auction houses</p>
          <Link href="/analyze" className="btn">Try Free Analysis</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>1. Upload Image</h3>
              <p>Upload high-resolution photos of your artwork from multiple angles</p>
            </div>
            <div className="feature-card">
              <h3>2. AI Analysis</h3>
              <p>Our advanced AI analyzes brushstrokes, materials, and historical patterns</p>
            </div>
            <div className="feature-card">
              <h3>3. Get Results</h3>
              <p>Receive detailed authenticity report with confidence scores</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">Free</div>
              <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <li>1 free analysis per month</li>
                <li>Basic authenticity score</li>
                <li>General art period detection</li>
              </ul>
              <button className="btn">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="price">$29<span>/month</span></div>
              <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <li>Unlimited analyses</li>
                <li>Detailed authenticity reports</li>
                <li>Artist identification</li>
                <li>Historical context</li>
                <li>Email support</li>
              </ul>
              <button className="btn">Upgrade Now</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">$199<span>/month</span></div>
              <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <li>Everything in Pro</li>
                <li>API access</li>
                <li>Custom integrations</li>
                <li>Priority support</li>
                <li>White-label options</li>
              </ul>
              <button className="btn">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}