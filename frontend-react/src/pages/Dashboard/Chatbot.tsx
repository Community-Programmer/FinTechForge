import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BrainCircuit, Send, User, RefreshCw } from "lucide-react"
import { getChatbotResponse } from "@/api/chatBotService"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatbotEmptyState from "@/components/EmptyStates/ChatbotEmptyState";

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI financial assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async() => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    const response = await getChatbotResponse(input)

    const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.data.message,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Financial Assistant</h2>
        <p className="text-muted-foreground">
          Chat with our AI assistant for personalized financial advice and insights
        </p>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Financial AI Assistant</CardTitle>
              <CardDescription>Powered by advanced AI models</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-350px)] px-4">
            <div className="space-y-4 pt-4">
              {messages.length === 1 && !isTyping ? ( // Only the initial AI welcome message
                <div className="min-h-[300px]">
                  <ChatbotEmptyState 
                    title="How can I help you today?" 
                    subtitle="Ask me about market trends, investment advice, financial planning, or any other financial topic. I'm here to assist you with your financial questions." 
                  />
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className="flex items-start gap-2 max-w-[80%]">
                        {message.sender === "ai" && (
                          <Avatar className="mt-0.5 h-8 w-8 border">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <BrainCircuit className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p> <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown></p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="mt-0.5 h-8 w-8 border">
                            <AvatarFallback className="bg-muted">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
       
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <Avatar className="mt-0.5 h-8 w-8 border">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <BrainCircuit className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              placeholder="Ask about market trends, investment advice, or financial planning..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
            <Button type="button" size="icon" variant="outline">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Reset conversation</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

