import React, { useState, useEffect, useRef } from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
}

interface ChatBoxProps {
  onClose?: () => void;
}

// ChatMessage Component
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "p-3 rounded-lg max-w-[80%]",
          isUser
            ? "bg-[#75B5AE] text-white"
            : "bg-[#F1C0C9] text-[#2C3E50]"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm">
          {message.content}
        </p>
      </div>
    </div>
  );
};

// ChatInput Component
const ChatInput: React.FC<{ onSendMessage: (message: string) => void }> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="flex-grow px-4 py-2 rounded-md bg-background border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        onClick={handleSend}
        className="bg-[#75B5AE] hover:opacity-90 text-white"
      >
        Send
      </Button>
    </div>
  );
};

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true); // Show typing indicator

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });
      

      const data = await response.json();
      const botMessage: Message = {
        id: uuidv4(),
        content: data.bot_reply,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Something went wrong. Please try again later.",
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-[#75B5AE]/10 to-[#F1C0C9]/10">
            <Brain className="w-5 h-5 text-[#75B5AE]" />
          </div>
          <div>
            <h1 className="font-semibold">Solace</h1>
            <p className="text-sm text-muted-foreground">Here for you 24/7</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <div className="mb-4">
            <Brain className="w-12 h-12 mx-auto text-[#75B5AE]" />
          </div>
          <h2 className="text-lg font-medium mb-2">Welcome to Solace</h2>
          <p className="text-sm">
            Feel free to ask any questions about mental health, stress management, or emotional well-being.
          </p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="text-sm text-muted-foreground">
            Solace is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-transparent backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
