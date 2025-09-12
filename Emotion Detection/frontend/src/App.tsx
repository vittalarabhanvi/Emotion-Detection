"use client"

import { useState } from "react"
import "./App.css"
import Dashboard from "./components/Dashboard"
import FeelingPredictor from "./components/FeelingPredictor"
import PHQ9Questionnaire from "./components/PHQ9Questionnaire"
import MentalHealthChatbot from "./components/MentalHealthChatbot"

type ViewType = "dashboard" | "feeling" | "phq9" | "chatbot"

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "feeling":
        return <FeelingPredictor onBack={() => setCurrentView("dashboard")} />
      case "phq9":
        return <PHQ9Questionnaire onBack={() => setCurrentView("dashboard")} />
      case "chatbot":
        return <MentalHealthChatbot onBack={() => setCurrentView("dashboard")} />
      default:
        return <Dashboard onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="app">
      <div className="container">{renderView()}</div>
    </div>
  )
}

export default App
