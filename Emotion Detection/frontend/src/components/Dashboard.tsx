"use client"

import type React from "react"
import { Brain, MessageCircle, ClipboardList, Info } from "lucide-react"
import Card from "./ui/Card"
import Alert from "./ui/Alert"
import Badge from "./ui/Badge"

interface DashboardProps {
  onNavigate: (view: "feeling" | "phq9" | "chatbot") => void
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="dashboard">
      <div className="text-center mb-8">
        <h1 className="title text-center mx-auto">Emotion Detection</h1>
        <p className="subtitle">Take care of your mental wellbeing with our comprehensive support tools</p>
      </div>

      <div className="cards-grid">
        <Card onClick={() => onNavigate("feeling")} className="card-hover">
          <div className="card-header">
            <div className="icon-container bg-blue">
              <Brain className="icon" />
            </div>
            <h3 className="card-title">Feeling Predictor</h3>
            <p className="card-description">Describe how you're feeling and get insights about your emotional state</p>
          </div>
          <div className="card-content">
            <Badge variant="secondary">Quick Assessment</Badge>
            <p className="card-text">Uses AI to analyze your description and provide emotional insights</p>
          </div>
        </Card>

        <Card onClick={() => onNavigate("phq9")} className="card-hover">
          <div className="card-header">
            <div className="icon-container bg-green">
              <ClipboardList className="icon" />
            </div>
            <h3 className="card-title">PHQ-9 Assessment</h3>
            <p className="card-description">Complete the standardized depression screening questionnaire</p>
          </div>
          <div className="card-content">
            <Badge variant="secondary">Clinical Tool</Badge>
            <p className="card-text">9 questions used by healthcare professionals to assess depression</p>
          </div>
        </Card>

        <Card onClick={() => onNavigate("chatbot")} className="card-hover">
          <div className="card-header">
            <div className="icon-container bg-purple">
              <MessageCircle className="icon" />
            </div>
            <h3 className="card-title">Support Chatbot</h3>
            <p className="card-description">Chat with our AI assistant for personalized mental health support</p>
          </div>
          <div className="card-content">
            <Badge variant="secondary">24/7 Support</Badge>
            <p className="card-text">Get immediate support and coping strategies through conversation</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
