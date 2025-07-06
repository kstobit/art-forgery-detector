'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AnalysisResult {
  authenticity_score: number
  artist_prediction: string
  period_prediction: string
  confidence_level: string
  detailed_analysis: string[]
}

export default function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

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
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const analyzeImage = async () => {
    if (!selectedFile) return
    
    setAnalyzing(true)
    
    // Simulate analysis with mock data
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        authenticity_score: Math.random() * 100,
        artist_prediction: 'Unknown Artist (Style: Post-Impressionist)',
        period_prediction: 'Early 20th Century (1900-1920)',
        confidence_level: 'Medium',
        detailed_analysis: [
          'Brushstroke patterns suggest oil painting technique',
          'Color palette consistent with period materials',
          'Canvas texture analysis shows age-appropriate wear',
          'No obvious signs of digital manipulation detected',
          'Requires expert verification for definitive authentication'
        ]
      }
      setResult(mockResult)
      setAnalyzing(false)
    }, 3000)
  }

  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <Link href="/" className="logo">ArtAuth</Link>
          <div>
            <Link href="/pricing" className="btn">Upgrade</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Art Analysis</h1>
        
        {!result && (
          <div>
            <div 
              className={`upload-area ${dragOver ? 'dragover' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              {selectedFile ? (
                <div>
                  <h3>Selected: {selectedFile.name}</h3>
                  <p>Click to select a different image</p>
                </div>
              ) : (
                <div>
                  <h3>Drop your artwork image here</h3>
                  <p>or click to browse files</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    Supported formats: JPG, PNG, GIF (max 10MB)
                  </p>
                </div>
              )}
            </div>

            {selectedFile && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  className="btn" 
                  onClick={analyzeImage}
                  disabled={analyzing}
                >
                  {analyzing ? 'Analyzing...' : 'Analyze Artwork'}
                </button>
              </div>
            )}

            {analyzing && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>🔍 AI is analyzing your artwork...</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  This may take a few moments
                </p>
              </div>
            )}
          </div>
        )}

        {result && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>Analysis Results</h2>
            
            <div style={{ marginTop: '2rem' }}>
              <h3>Authenticity Score</h3>
              <div style={{ 
                background: '#f0f4ff', 
                padding: '1rem', 
                borderRadius: '5px',
                margin: '1rem 0'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  color: result.authenticity_score > 70 ? '#27ae60' : result.authenticity_score > 40 ? '#f39c12' : '#e74c3c'
                }}>
                  {result.authenticity_score.toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Confidence Level: {result.confidence_level}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Artist & Period</h3>
              <p><strong>Artist:</strong> {result.artist_prediction}</p>
              <p><strong>Period:</strong> {result.period_prediction}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Detailed Analysis</h3>
              <ul>
                {result.detailed_analysis.map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7',
              padding: '1rem',
              borderRadius: '5px',
              marginTop: '2rem'
            }}>
              <strong>⚠️ Important Note:</strong> This is a preliminary analysis. 
              For legal or high-value transactions, we recommend consulting with a certified art expert.
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                className="btn" 
                onClick={() => {
                  setResult(null)
                  setSelectedFile(null)
                }}
              >
                Analyze Another Artwork
              </button>
              <Link href="/pricing" className="btn" style={{ marginLeft: '1rem' }}>
                Get Detailed Report
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}