"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Bot, User, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useUserDB } from "@/context/UserContext";
import { useAIContext } from "@/lib/ai-context";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function NexoAIPage() {
    const { userDB } = useUserDB();
    const { userRole } = useAIContext();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Welcome to NexoAI Full-View. I am your global operational assistant. I have cross-table access to help you analyze trends, summarize performance, or guide your next marketplace move. How can I assist you today?",
            timestamp: new Date()
        }
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMsg].map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: apiMessages,
                    context: {
                        pageName: "NexoAI Full Tool",
                        userRole: userDB?.role || userRole,
                        vendorId: userDB?.vendorId,
                        data: { type: "global_tool_view" }
                    },
                    userId: userDB?.id
                })
            });

            const data = await response.json();

            if (data.content) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: data.content,
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error("AI Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] w-full max-w-5xl mx-auto py-8 px-4 gap-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            NexoAI Global
                        </h1>
                        <p className="text-muted-foreground font-medium">Your marketplace intelligence assistant</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])} className="gap-2">
                    <Trash2 className="h-4 w-4" /> Clear Chat
                </Button>
            </div>

            {/* Main Chat Area */}
            <Card className="flex-1 flex flex-col overflow-hidden border-2 shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex items-start gap-4",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm shrink-0",
                                msg.role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-primary border-border"
                            )}>
                                {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>
                            <div className={cn(
                                "max-w-[75%] px-5 py-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                                    : "bg-background border border-border rounded-tl-none"
                            )}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                <div className={cn(
                                    "text-[10px] mt-2 opacity-50 font-mono",
                                    msg.role === "user" ? "text-right" : "text-left"
                                )}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4 animate-pulse">
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center border shrink-0">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                            <div className="bg-muted border rounded-2xl rounded-tl-none px-5 py-4">
                                <span className="text-sm text-muted-foreground italic">NexoAI is analyzing marketplace data...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Container */}
                <div className="p-6 border-t bg-muted/20 backdrop-blur-md">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-4 relative"
                    >
                        <div className="absolute -top-10 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm">
                                Tip: Ask "How much revenue did I make today?"
                            </div>
                        </div>
                        <Input
                            placeholder="Type a message or ask for order summaries..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            className="h-14 px-6 rounded-2xl bg-background shadow-inner text-base focus-visible:ring-primary/20"
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="h-14 w-14 rounded-2xl shadow-lg transition-all active:scale-95"
                        >
                            <Send className="h-6 w-6" />
                        </Button>
                    </form>
                    <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
                        Powered by Gemini 2.5 Flash • Database Connected
                    </p>
                </div>
            </Card>
        </div>
    );
}
