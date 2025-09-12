"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Brain, Loader2 } from "lucide-react"
import Card from "./ui/Card"
import Button from "./ui/Button"
import Textarea from "./ui/Textarea"
import Badge from "./ui/Badge"
import axios from "axios"

interface FeelingPredictorProps {
  onBack: () => void
}

interface Prediction {
  emotion: string
  confidence: number
  description: string
  suggestions: string[]
}

const FeelingPredictor: React.FC<FeelingPredictorProps> = ({ onBack }) => {
  const [feeling, setFeeling] = useState("")
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const predictFeeling = async () => {
    if (!feeling.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple keyword-based prediction
    const lowerFeeling = feeling.toLowerCase()
    const respEmotion = await axios.post(`${process.env.REACT_APP_BASE_URL}/get_sentiment`, {text: feeling})
    let emotion = respEmotion.data.message
    let confidence = 75
    let description = "Your emotional state appears to be within normal range."
    let suggestions = ["Continue with your regular activities", "Practice mindfulness", "Stay connected with friends"]

    if (emotion === "Depressed") {
      // emotion = "Depressed"
      // confidence = 85
      description = "You may be experiencing symptoms of depression. This is common and treatable."
      suggestions = [
        "Consider speaking with a mental health professional",
        "Engage in physical activity",
        "Reach out to supportive friends or family",
        "Practice self-care activities",
      ]
    }  else if (emotion === "Angry") {
      // emotion = "Angry"
      // confidence = 82
      description = "You may be experiencing anger or frustration. These are normal emotions that can be managed."
      suggestions = [
        "Take deep breaths and count to ten",
        "Try physical exercise to release tension",
        "Talk to someone you trust",
        "Practice relaxation techniques",
      ]
    }
    else if (emotion === "Joy") {
      // emotion = "Positive"
      // confidence = 90
      description = "You seem to be in a positive emotional state. Great to hear!"
      suggestions = [
        "Keep doing what makes you happy",
        "Share your positivity with others",
        "Practice gratitude",
        "Maintain healthy habits",
      ]
    } else {
      // emotion = "Normal"
      // confidence = 90
      description = "You seem to be in a positive emotional state. Great to hear!"
      suggestions = [
        "Keep doing what makes you happy",
        "Share your positivity with others",
        "Practice gratitude",
        "Maintain healthy habits",
      ]
    }
    
            
    setPrediction({ emotion, confidence, description, suggestions })
    setIsLoading(false)
  }

  const getEmotionClass = (emotion: string) => {
    switch (emotion) {
      case "Depressed":
        return "badge-red"
      case "Anger":
        return "badge-orange"
      case "Fear":
        return "badge-yellow"
      case "Love":
        return "badge-pink"
      case "Surprise":
        return "badge-purple"
      default:
        return "badge-blue"
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Button variant="ghost" onClick={onBack} className="back-button">
          <ArrowLeft className="icon-sm" />
        </Button>
        <h1 className="page-title">Feeling Predictor</h1>
      </div>

      <Card className="mb-6">
        <div className="card-header">
          <h3 className="card-title">
            <Brain className="icon-sm mr-2" />
            How are you feeling today?
          </h3>
          <p className="card-description">
            Describe your current emotional state in your own words. Our AI will analyze your description and provide
            insights.
          </p>
        </div>
        <div className="card-content">
          <Textarea
            placeholder="I'm feeling..."
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            className="mb-4"
            rows={5}
          />
          <Button onClick={predictFeeling} disabled={!feeling.trim() || isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="icon-sm mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze My Feelings"
            )}
          </Button>
        </div>
      </Card>

      {prediction && (
        <Card>
          <div className="card-header">
            <h3 className="card-title">Analysis Results</h3>
          </div>
          <div className="card-content">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={getEmotionClass(prediction.emotion)}>{prediction.emotion}</Badge>
              {/* <span className="text-gray-600">Confidence: {prediction.confidence}%</span> */}
            </div>

            <p className="text-gray-700 mb-4">{prediction.description}</p>

            <div>
              <h4 className="font-semibold mb-2">Suggestions:</h4>
              <ul className="suggestions-list">
                {prediction.suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    <span className="bullet">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default FeelingPredictor
