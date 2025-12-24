"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Sparkles, Loader2, Minimize2, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useAIContext } from "@/lib/ai-context";
import { useUserDB } from "@/context/UserContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export function AIChatWidget() {
    const pathname = usePathname();
    const { pageName, userRole, contextData } = useAIContext();
    const { userDB } = useUserDB();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: `Hello! I'm the Nexora AI Assistant. I see you're on the ${pageName || "platform"}. How can I help you manage your operations today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    // Update welcome message when page changes if chat is empty-ish
    useEffect(() => {
        if (messages.length === 1 && messages[0].id === "welcome") {
            setMessages([
                {
                    id: "welcome",
                    role: "assistant",
                    content: `Hello! I'm NexoAI. I see you're on the ${pageName || "platform"}. I have direct access to your marketplace data. How can I assist you today?`,
                    timestamp: new Date()
                }
            ]);
        }
    }, [pageName]);

    // Hide chat on login and landing page to keep them clean
    if (pathname === "/auth/login" || pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up" || pathname.startsWith("/(auth)")) {
        return null;
    }

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
                        pageName,
                        userRole: userDB?.role || userRole,
                        vendorId: userDB?.vendorId,
                        data: contextData
                    },
                    userId: userDB?.id
                })
            });

            const data = await response.json();

            if (data.content) {
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: data.content,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMsg]);
            } else {
                throw new Error("No content received");
            }
        } catch (error) {
            console.error("Failed to send message", error);
            // Add error message
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: "I'm having trouble connecting right now. Please try again.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-background border rounded-2xl shadow-2xl w-[380px] h-[500px] mb-4 pointer-events-auto flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b bg-muted/40 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">NexoAI</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                        {pageName ? `${pageName} Assistant` : 'Operational Helper'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href="/nexoai">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:bg-primary/5" title="Open Full View">
                                        <div className="h-3.5 w-3.5 border-2 border-primary rounded-sm" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setMessages([messages[0]])}>
                                    <RefreshCcw className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                                    <Minimize2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-muted text-foreground rounded-bl-none border"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start w-full">
                                    <div className="bg-muted border rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t bg-background">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="relative"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about orders, vendors, or metrics..."
                                    className="pr-12 rounded-full py-5 bg-muted/50 focus:bg-background transition-colors"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1 top-1 h-8 w-8 rounded-full"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                            <div className="text-[10px] text-center text-muted-foreground mt-2 flex flex-col gap-0.5">
                                <p>AI can make mistakes. Please verify important actions.</p>
                                <p className="font-bold opacity-70 uppercase tracking-tighter">Powered by Gemini 2.5 Flash</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Bubble */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-xl border-2 border-white/20 bg-background overflow-hidden relative pointer-events-auto group ring-4 ring-black/5 dark:ring-white/5"
            >
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-transparent transition-colors">
                    {/* Using the nexora.png from public folder */}
                    <Image
                        src="/NEXORA.png"
                        alt="AI Agent"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Notification Badge (Optional logic could go here) */}
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-background" />
            </motion.button>
        </div>
    );
}
