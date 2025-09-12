"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, ClipboardList, Loader2 } from "lucide-react"
import Card from "./ui/Card"
import Button from "./ui/Button"
import Progress from "./ui/Progress"
import Table from "./ui/Table"
import Badge from "./ui/Badge"
import RadioGroup from "./ui/RadioGroup"

interface PHQ9QuestionnaireProps {
  onBack: () => void
}

interface MoodResult {
  question: string
  answer: string
  score: number
  mood: string
}

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
]

const options = [
  { value: "0", label: "Not at all", score: 0 },
  { value: "1", label: "Several days", score: 1 },
  { value: "2", label: "More than half the days", score: 2 },
  { value: "3", label: "Nearly every day", score: 3 },
]

const PHQ9Questionnaire: React.FC<PHQ9QuestionnaireProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(9).fill(""))
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [moodResults, setMoodResults] = useState<MoodResult[]>([])

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitQuestionnaire()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuestionnaire = async () => {
    setIsAnalyzing(true)

    // Calculate results based on selected options
    const results = questions.map((question, index) => {
      const selectedOption = options.find((opt) => opt.value === answers[index])
      const score = selectedOption ? selectedOption.score : 0

      // Determine mood based on score
      let mood = "None"
      if (score === 0) mood = "None"
      else if (score === 1) mood = "Mild"
      else if (score === 2) mood = "Moderate"
      else if (score === 3) mood = "Severe"

      return {
        question,
        answer: selectedOption ? selectedOption.label : "Not answered",
        score,
        mood,
      }
    })

    setMoodResults(results)
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const calculateTotalScore = () => {
    return moodResults.reduce((total, result) => total + result.score, 0)
  }

  const getScoreInterpretation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "badge-green", description: "Minimal depression" }
    if (score <= 9) return { level: "Mild", color: "badge-yellow", description: "Mild depression" }
    if (score <= 14) return { level: "Moderate", color: "badge-orange", description: "Moderate depression" }
    if (score <= 19)
      return { level: "Moderately Severe", color: "badge-red", description: "Moderately severe depression" }
    return { level: "Severe", color: "badge-purple", description: "Severe depression" }
  }

  const getMoodClass = (mood: string) => {
    switch (mood) {
      case "None":
        return "badge-green"
      case "Mild":
        return "badge-yellow"
      case "Moderate":
        return "badge-orange"
      case "Severe":
        return "badge-red"
      default:
        return "badge-slate"
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const totalScore = calculateTotalScore()
    const interpretation = getScoreInterpretation(totalScore)

    return (
      <div className="page-container">
        <div className="page-header">
          <Button variant="ghost" onClick={onBack} className="back-button">
            <ArrowLeft className="icon-sm" />
          </Button>
          <h1 className="page-title">PHQ-9 Results</h1>
        </div>

        <Card className="mb-6">
          <div className="card-header">
            <h3 className="card-title">Your PHQ-9 Score</h3>
            <p className="card-description">Based on your responses to the 9 questions</p>
          </div>
          <div className="card-content">
            <div className="score-container">
              <div className="total-score">{totalScore}/27</div>
              <Badge className={interpretation.color}>{interpretation.level}</Badge>
              <p className="score-description">{interpretation.description}</p>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <div className="card-header">
            <h3 className="card-title">Question Responses</h3>
            <p className="card-description">Detailed breakdown of your answers</p>
          </div>
          <div className="card-content">
            <Table>
              <thead>
                <tr>
                  <th className="table-header">#</th>
                  <th className="table-header">Question</th>
                  <th className="table-header">Your Response</th>
                  <th className="table-header">Severity</th>
                  <th className="table-header">Score</th>
                </tr>
              </thead>
              <tbody>
                {moodResults.map((result, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell font-medium">{index + 1}</td>
                    <td className="table-cell question-cell">
                      <div className="question-text">{result.question}</div>
                    </td>
                    <td className="table-cell">
                      <div className="answer-text">{result.answer}</div>
                    </td>
                    <td className="table-cell">
                      <Badge className={getMoodClass(result.mood)}>{result.mood}</Badge>
                    </td>
                    <td className="table-cell">
                      <span className="score-value">{result.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>

        <div className="button-group">
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setAnswers(new Array(9).fill(""))
              setShowResults(false)
              setMoodResults([])
            }}
            variant="outline"
          >
            Retake Assessment
          </Button>
          <Button onClick={onBack}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="page-container">
        <div className="page-header">
          <Button variant="ghost" onClick={onBack} className="back-button">
            <ArrowLeft className="icon-sm" />
          </Button>
          <h1 className="page-title">PHQ-9 Assessment</h1>
        </div>

        <Card>
          <div className="card-content analyzing-content">
            <Loader2 className="analyzing-spinner" />
            <h3 className="analyzing-title">Analyzing Your Responses</h3>
            <p className="analyzing-text">We're calculating your PHQ-9 score...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Button variant="ghost" onClick={onBack} className="back-button">
          <ArrowLeft className="icon-sm" />
        </Button>
        <h1 className="page-title">PHQ-9 Assessment</h1>
      </div>

      <Card>
        <div className="card-header">
          <h3 className="card-title">
            <ClipboardList className="icon-sm mr-2" />
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="card-description">
            Over the last 2 weeks, how often have you been bothered by the following problem?
          </p>
          <Progress value={progress} className="mt-4" />
        </div>
        <div className="card-content">
          <div className="question-text mb-6">{questions[currentQuestion]}</div>

          <RadioGroup
            options={options}
            value={answers[currentQuestion]}
            onChange={handleAnswer}
            name={`question-${currentQuestion}`}
            className="mb-6"
          />

          <div className="button-group">
            <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button onClick={nextQuestion} disabled={!answers[currentQuestion]}>
              {currentQuestion === questions.length - 1 ? "Submit & Analyze" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PHQ9Questionnaire
