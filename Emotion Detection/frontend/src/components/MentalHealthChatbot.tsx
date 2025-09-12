"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, MessageCircle, Send, Bot, User } from "lucide-react"
import Card from "./ui/Card"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Badge from "./ui/Badge"
import axios from "axios"

interface MentalHealthChatbotProps {
  onBack: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const MentalHealthChatbot: React.FC<MentalHealthChatbotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm here to provide mental health support and guidance. I'm not a replacement for professional therapy, but I can offer coping strategies, active listening, and resources. How are you feeling today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Current emotion state - you can update this manually
  const [currentEmotion, setCurrentEmotion] = useState("Neutral")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callOpenAI = async (userMessage: string): Promise<string> => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY

    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please add REACT_APP_OPENAI_API_KEY to your .env file.")
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a compassionate mental health support assistant. Your role is to:

            1. Provide emotional support and active listening
            2. Offer evidence-based coping strategies and techniques
            3. Help users identify their feelings and thoughts
            4. Suggest healthy activities and self-care practices
            5. Provide crisis resources when appropriate
            6. Encourage professional help when needed

            Important guidelines:
            - Always be empathetic, non-judgmental, and supportive
            - Never diagnose or provide medical advice
            - If someone mentions self-harm or suicide, provide crisis resources immediately
            - Encourage professional help for serious mental health concerns
            - Use person-first language
            - Validate feelings while offering hope and practical strategies
            - Keep responses concise but meaningful (2-3 paragraphs max)

            Crisis resources to share when needed:
            - National Suicide Prevention Lifeline: 988
            - Crisis Text Line: Text HOME to 741741
            - National Domestic Violence Hotline: 1-800-799-7233

            Remember: You are supportive but not a replacement for professional therapy or medical care.`,
          },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`)
    }

    const data = await response.json()
    const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/get_sentiment`, {text: userMessage})

    const emotion = resp.data.message
    setCurrentEmotion(emotion)

    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await callOpenAI(currentInput)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling OpenAI:", error)

      // Fallback response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble connecting right now. This might be due to a missing API key or network issue. In the meantime, please remember that if you're in crisis, you can reach out to the National Suicide Prevention Lifeline at 988 or text HOME to 741741 for the Crisis Text Line.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getEmotionClass = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "depressed":
        return "badge-red"
      case "joy":
        return "badge-blue"
      case "love":
        return "badge-pink"
      case "fear":
        return "badge-yellow"
      case "anger":
        return "badge-orange"
      case "surprise":
        return "badge-purple"
      default:
        return "badge-slate"
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Button variant="ghost" onClick={onBack} className="back-button">
          <ArrowLeft className="icon-sm" />
        </Button>
        <h1 className="page-title">Mental Health Support Chat</h1>
      </div>

      <Card className="chat-container">
        <div className="card-header">
          <div className="chat-header-content">
            <div className="chat-title-section">
              <h3 className="card-title">
                <MessageCircle className="icon-sm mr-2" />
                AI Support Assistant
              </h3>
              {/* <p className="card-description">Powered by OpenAI GPT-3.5 for personalized mental health support</p> */}
            </div>
            <div className="emotion-badge-container">
              <span className="emotion-label">Current Mood:</span>
              <Badge className={`emotion-badge ${getEmotionClass(currentEmotion)}`}>{currentEmotion}</Badge>
              {/* <Badge className={`emotion-badge ${getEmotionClass("angry")}`}>Angry</Badge> */}
            </div>
          </div>
        </div>
        <div className="chat-content">
          <div className="messages-container">
            <div className="messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.role === "user" ? "message-user" : "message-assistant"}`}
                >
                  <div className="message-content">
                    <div className={`avatar ${message.role === "user" ? "avatar-user" : "avatar-assistant"}`}>
                      {message.role === "user" ? <User className="icon-sm" /> : <Bot className="icon-sm" />}
                    </div>
                    <div className={`message-bubble ${message.role === "user" ? "bubble-user" : "bubble-assistant"}`}>
                      <p className="message-text">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message message-assistant">
                  <div className="message-content">
                    <div className="avatar avatar-assistant">
                      <Bot className="icon-sm" />
                    </div>
                    <div className="message-bubble bubble-assistant">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-form">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="chat-input"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="send-button">
                <Send className="icon-sm" />
              </Button>
            </form>
          </div>
        </div>
      </Card>

      <div className="disclaimer">
        <p>
          This chatbot provides supportive guidance but is not a substitute for professional mental health care. If
          you're in crisis, please contact emergency services or a crisis helpline immediately.
        </p>
      </div>

    </div>
  )
}

export default MentalHealthChatbot
