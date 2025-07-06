'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (priceId: string, amount: number) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const { clientSecret } = await response.json()
      
      const stripe = await stripePromise
      
      if (!stripe) throw new Error('Stripe failed to initialize')

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // This would be handled by Stripe Elements in a real implementation
          }
        }
      })

      if (error) {
        console.error('Payment failed:', error)
        alert('Payment failed. Please try again.')
      } else {
        alert('Payment successful! Welcome to ArtAuth Pro!')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
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
            <Link href="/analyze" className="btn">Try Free</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Choose Your Plan</h1>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">Free</div>
            <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <li>✓ 1 free analysis per month</li>
              <li>✓ Basic authenticity score</li>
              <li>✓ General art period detection</li>
              <li>✗ Detailed reports</li>
              <li>✗ Artist identification</li>
            </ul>
            <Link href="/analyze" className="btn">Get Started</Link>
          </div>

          <div className="pricing-card featured">
            <h3>Pro</h3>
            <div className="price">$29<span>/month</span></div>
            <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <li>✓ Unlimited analyses</li>
              <li>✓ Detailed authenticity reports</li>
              <li>✓ Artist identification</li>
              <li>✓ Historical context</li>
              <li>✓ Email support</li>
              <li>✓ High-resolution downloads</li>
            </ul>
            <button 
              className="btn" 
              onClick={() => handleSubscribe('pro', 29)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">$199<span>/month</span></div>
            <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <li>✓ Everything in Pro</li>
              <li>✓ API access</li>
              <li>✓ Custom integrations</li>
              <li>✓ Priority support</li>
              <li>✓ White-label options</li>
              <li>✓ Dedicated account manager</li>
            </ul>
            <button 
              className="btn" 
              onClick={() => handleSubscribe('enterprise', 199)}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Contact Sales'}
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '8px' }}>
          <h2>Why Choose ArtAuth?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h3>🎨 Expert Analysis</h3>
              <p>Our AI is trained on millions of artwork images and historical data</p>
            </div>
            <div>
              <h3>⚡ Fast Results</h3>
              <p>Get preliminary results in minutes, not days</p>
            </div>
            <div>
              <h3>🔒 Secure & Private</h3>
              <p>Your artwork images are encrypted and never shared</p>
            </div>
            <div>
              <h3>📊 Detailed Reports</h3>
              <p>Comprehensive analysis with confidence scores and explanations</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#666' }}>
            🔒 Secure payments powered by Stripe • 30-day money-back guarantee
          </p>
        </div>
      </main>
    </div>
  )
}