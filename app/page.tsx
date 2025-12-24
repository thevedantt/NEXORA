"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Plus,
  ArrowRight,
  LayoutDashboard,
  Store,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  Github,
  Linkedin,
  Package,
  Activity,
  Users,
  MousePointer2
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Sub-components (Tailored for Nexora) ---

const HeroHighlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute bottom-1 left-0 h-3 bg-[#dad9d2] -z-0"
    />
  </span>
);

const BentoCard = ({ title, description, icon: Icon, className = "", children }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white border border-[#dad9d2] rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group ${className}`}
  >
    <div className="flex flex-col h-full z-10 relative">
      <div className="h-12 w-12 rounded-2xl bg-[#f9f6ee] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <Icon className="h-6 w-6 text-[#781c2e]" />
      </div>
      <h3 className="text-xl font-bold text-[#570010] mb-2">{title}</h3>
      <p className="text-[#781c2e] text-sm leading-relaxed mb-6 font-medium">{description}</p>
      <div className="mt-auto">
        {children}
      </div>
    </div>
  </motion.div>
);

const MetricsCard = ({ label, value, trend, trendIcon: TrendIcon }: any) => (
  <div className="flex flex-col gap-1 p-5 bg-white rounded-3xl border border-[#dad9d2] shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-2 w-2 rounded-full bg-[#781c2e]" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#781c2e]">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-black text-[#570010] tracking-tighter">{value}</span>
      <div className="flex items-center gap-0.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
        <TrendIcon className="h-3 w-3" />
        {trend}
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      className="border-b border-[#dad9d2] py-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="text-xl font-black text-[#570010] pr-8 group-hover:text-[#781c2e] transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="h-8 w-8 rounded-full bg-[#f9f6ee] border border-[#dad9d2] flex items-center justify-center shrink-0 group-hover:border-[#781c2e] transition-colors"
        >
          <Plus className="h-4 w-4 text-[#781c2e]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 text-lg font-bold text-[#781c2e]/80 leading-relaxed whitespace-pre-wrap">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function NexoraLanding() {
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDemoRequest = () => {
    const subject = encodeURIComponent("Demo Request: Nexora Operations Platform");
    const body = encodeURIComponent(
      "Hi Vedantt,\n\nI am interested in seeing a demo of the Nexora Operations Platform.\n\nPlease let me know when we can connect for a brief walkthrough.\n\nBest regards,\n[Your Name]\n[Your Company/Role]"
    );
    window.location.href = `mailto:vedanttalekar1705@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#f9f6ee] text-[#781c2e] selection:bg-[#781c2e] selection:text-[#f9f6ee] overflow-x-hidden font-sans">

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white border border-[#dad9d2] rounded-full px-6 py-3 shadow-md">
          <Link href="#philosophy">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="h-8 w-8 bg-[#781c2e] rounded-xl flex items-center justify-center text-[#f9f6ee] font-black transform group-hover:rotate-12 transition-transform duration-500">
                N
              </div>
              <span className="font-black text-xl tracking-tighter">NEXORA</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Solutions', href: '#solutions' },
              { label: 'AI Agent', href: '#ai-agent' },
              { label: 'About', href: '#capabilities' }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-black text-[#781c2e] transition-colors hover:text-[#570010]">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-bold">Sign In</Link>
            <Button className="rounded-full bg-[#781c2e] hover:bg-[#570010] text-[#f9f6ee] px-6 font-bold shadow-lg transition-transform active:scale-95">
              Get Started
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Aurora */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#f9f6ee]">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#781c2e] opacity-5 rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#dad9d2] opacity-10 rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dad9d2] shadow-sm mb-8"
            >
              <Sparkles className="h-4 w-4 text-[#781c2e]" />
              <span className="text-[10px] uppercase font-black tracking-widest text-[#781c2e]">Next-Gen Marketplace Hub</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#570010] mb-8">
              Transform marketplace operations into <HeroHighlight>intelligent action</HeroHighlight>.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-[#781c2e] max-w-2xl mx-auto mb-12 font-bold leading-relaxed"
            >
              Nexora is an AI-ready marketplace operations platform that connects vendors, admins, and logistics into one calm, scalable control system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="h-16 px-10 rounded-3xl bg-[#781c2e] hover:bg-[#570010] text-white text-lg font-black shadow-2xl group transition-all duration-500 hover:scale-105 active:scale-95">
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemoRequest}
                className="h-16 px-10 rounded-3xl border-[#dad9d2] bg-white text-lg font-black hover:bg-[#dad9d2] transition-all duration-500 hover:scale-105 active:scale-95"
              >
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Dashboard Scroll Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 max-w-6xl w-full mx-auto relative group"
        >
          <div className="bg-white border-[8px] border-white shadow-2xl rounded-[40px] overflow-hidden">
            <div className="h-12 border-b bg-[#f9f6ee] flex items-center px-6 gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#dad9d2]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#dad9d2]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#dad9d2]" />
            </div>

            <div className="p-8 grid md:grid-cols-4 gap-6">
              {[
                { label: "Total Revenue", value: "₹48,29,102", trend: "+12.5%", icon: Activity },
                { label: "Orders Processed", value: "12,482", trend: "+8.2%", icon: Zap },
                { label: "Fulfillment Rate", value: "98.2%", trend: "+0.4%", icon: Shield },
                { label: "Vendor Growth", value: "124", trend: "+15%", icon: Plus },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <MetricsCard label={stat.label} value={stat.value} trend={stat.trend} trendIcon={stat.icon} />
                </motion.div>
              ))}
            </div>

            {/* Live Data Context - Recent Activity & Alerts */}
            <div className="px-8 pb-12 grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-[#f9f6ee]/30 rounded-[32px] p-6 border border-[#dad9d2]/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xs font-black text-[#570010] uppercase tracking-wider">Recent Activity</h4>
                    <p className="text-[10px] font-bold text-[#781c2e]/60">Live operational updates</p>
                  </div>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center border border-[#dad9d2] shadow-sm">
                    <Activity className="h-4 w-4 text-[#781c2e]" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { user: "Admin (Vedantt)", action: "Approved vendor Nexus-Grid", time: "2m ago", status: "success" },
                    { user: "System", action: "Global inventory sync completed", time: "5m ago", status: "info" },
                    { user: "Vendor (Swift)", action: "Dispatched batch #8291", time: "12m ago", status: "success" },
                    { user: "Security", action: "New terminal login detected", time: "24m ago", status: "warning" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`h-1.5 w-1.5 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-[#781c2e]'}`} />
                        <div>
                          <p className="text-[11px] font-black text-[#570010] leading-none mb-1">{item.user}</p>
                          <p className="text-[10px] font-bold text-[#781c2e]/60">{item.action}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-[#781c2e]/30 uppercase">{item.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Vendor Performance Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-[#781c2e]/5 rounded-[32px] p-6 border border-[#dad9d2]/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xs font-black text-[#570010] uppercase tracking-wider">Vendor Performance</h4>
                    <p className="text-[10px] font-bold text-[#781c2e]/60">Top performers & at-risk accounts</p>
                  </div>
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center border border-[#dad9d2] shadow-sm">
                    <Users className="h-4 w-4 text-[#781c2e]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-[9px] font-black text-[#781c2e] uppercase tracking-[0.2em] mb-3">Top Performing</div>
                    <div className="space-y-3">
                      {[
                        { name: "Nexus-Grid", score: "99.8%", trend: "up" },
                        { name: "SwiftCart Ops", score: "98.4%", trend: "up" }
                      ].map((v, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#570010]">{v.name}</span>
                          <span className="text-[10px] font-black text-emerald-600">{v.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-black text-[#b91c1c] uppercase tracking-[0.2em] mb-3">At Risk</div>
                    <div className="space-y-3">
                      {[
                        { name: "GlobalLogix", score: "84.2%", trend: "down" },
                        { name: "AuraMarket", score: "82.1%", trend: "down" }
                      ].map((v, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#570010]">{v.name}</span>
                          <span className="text-[10px] font-black text-red-600">{v.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="px-8 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full bg-white border border-[#dad9d2] rounded-[48px] p-12 shadow-2xl"
              >
                <div className="flex flex-col items-center text-center mb-16">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="px-6 py-2 rounded-full bg-[#781c2e] text-white text-[12px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg"
                  >
                    Core Attributes
                  </motion.div>
                  <h3 className="text-4xl md:text-6xl font-black text-[#570010] tracking-tighter">These answer:</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {[
                    {
                      q: "Is this production-ready?",
                      a: "Yes. Architected for 24/7 high-volume marketplace operations.",
                      icon: Zap,
                      color: "bg-amber-50 text-amber-600"
                    },
                    {
                      q: "Is this secure?",
                      a: "Built with enterprise-grade auth and data residency guardrails.",
                      icon: Shield,
                      color: "bg-emerald-50 text-emerald-600"
                    },
                    {
                      q: "Is this scalable?",
                      a: "Stateless edge architecture that grows with your vendor base.",
                      icon: BarChart3,
                      color: "bg-blue-50 text-blue-600"
                    },
                    {
                      q: "Is this intelligent?",
                      a: "Powered by NexoAI for proactive insight and guided execution.",
                      icon: Sparkles,
                      color: "bg-purple-50 text-purple-600"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex gap-6 p-8 bg-white rounded-[32px] border border-[#dad9d2] hover:border-[#781c2e] shadow-sm hover:shadow-xl transition-all duration-500 group"
                    >
                      <div className={`h-16 w-16 shrink-0 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <item.icon className="h-8 w-8" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="font-black text-[#570010] text-2xl mb-2 tracking-tight group-hover:text-[#781c2e] transition-colors">{item.q}</div>
                        <div className="text-lg font-medium text-[#781c2e]/60 leading-relaxed">{item.a}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 hidden lg:block bg-[#781c2e] text-[#f9f6ee] px-4 py-3 rounded-2xl shadow-2xl z-20 flex items-center gap-3"
          >
            <Shield className="h-4 w-4 shrink-0" />
            <h4 className="font-bold text-[10px] leading-tight tracking-tight uppercase max-w-[120px]">Secured Hub Architecture</h4>
          </motion.div>
        </motion.div>
      </section>


      {/* What is Nexora Section */}
      <section id="solutions" className="py-32 px-6 overflow-hidden scroll-mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-24 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-0.5 w-64 bg-[#dad9d2] mx-auto mb-10 origin-center"
            />
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-[#570010] mb-8 tracking-tight"
            >
              A Control Layer for <br />Modern Marketplaces
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl max-w-2xl mx-auto text-[#781c2e] font-bold"
            >
              Nexora replaced scattered tools, spreadsheets, and manual coordination with a single operational system.
              Vendors execute. Admins control. AI assists.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-[#dad9d2] rounded-[40px] p-2 shadow-2xl overflow-hidden group"
            >
              <div className="bg-[#f9f6ee] rounded-[36px] p-10 flex flex-col h-[600px] relative overflow-hidden">
                <div className="z-10">
                  <div className="h-12 w-12 rounded-2xl bg-[#781c2e] flex items-center justify-center text-white mb-6">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black text-[#570010] mb-4">Admin Control Hub</h3>
                  <p className="text-lg text-[#781c2e] font-bold leading-relaxed mb-8">
                    Monitor vendors, risk, and global metrics from a unified center.
                    High-density data designed for rapid oversight.
                  </p>
                  <ul className="space-y-4 font-bold text-sm text-[#781c2e]">
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Global Order Streams</li>
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Vendor Onboarding Logic</li>
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Compliance & Risk Guard</li>
                  </ul>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white border border-[#dad9d2] rounded-3xl transform rotate-12 group-hover:rotate-6 transition-transform duration-700 shadow-xl p-2">
                  <div className="w-full h-full bg-[#f9f6ee] rounded-2xl overflow-hidden border border-[#dad9d2] relative">
                    <Image
                      src="/admin.jpg"
                      alt="Admin Dashboard View"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm py-2 text-center italic text-[8px] uppercase font-black text-[#781c2e] tracking-widest border-t border-[#dad9d2]">Global View</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-[#dad9d2] rounded-[40px] p-2 shadow-2xl overflow-hidden group"
            >
              <div className="bg-white rounded-[36px] p-10 flex flex-col h-[600px] relative overflow-hidden border border-[#dad9d2]">
                <div className="z-10">
                  <div className="h-12 w-12 rounded-2xl bg-[#dad9d2] flex items-center justify-center text-[#781c2e] mb-6">
                    <Store className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black text-[#570010] mb-4">Vendor Execution Panel</h3>
                  <p className="text-lg text-[#781c2e] font-bold leading-relaxed mb-8">
                    Empower your sellers with pro-grade tools to manage stock, shipping, and sales analytics.
                  </p>
                  <ul className="space-y-4 font-bold text-sm text-[#781c2e]">
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Simplified Order Fulfillment</li>
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Real-time Stock Sync</li>
                    <li className="flex items-center gap-2"><Plus className="h-4 w-4" /> Margin Analytics</li>
                  </ul>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#f9f6ee] border border-[#dad9d2] rounded-3xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 shadow-xl p-2">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden border border-[#dad9d2] relative">
                    <Image
                      src="/vendor.jpg"
                      alt="Vendor Dashboard View"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm py-2 text-center italic text-[8px] uppercase font-black text-[#781c2e] tracking-widest border-t border-[#dad9d2]">Seller Tool</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AgentNexora Section */}
      <section id="ai-agent" className="py-32 px-6 bg-[#570010] border-y border-white/10 relative overflow-hidden scroll-mt-20">
        {/* Subtle decorative elements for the dark theme - SOLID COLORS */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#781c2e] opacity-10 rounded-full -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#781c2e] opacity-5 rounded-full -z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center mb-20"
          >
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#dad9d2] mb-4 block">Automated Intelligence Layer</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#f9f6ee] tracking-tight mb-8 uppercase">AgentNexora</h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-xl font-bold text-white leading-relaxed">
                AgentNexora is an AI-powered operational assistant that works behind the scenes to help vendors act faster, recover missed revenue, and make smarter decisions.
              </p>
              <p className="text-lg font-bold text-[#dad9d2] leading-relaxed">
                It learns from patterns across orders, inventory, and customer behavior then guides vendors with safe, actionable suggestions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="bg-[#570010] border-2 border-white/20 rounded-[48px] p-8 shadow-2xl max-w-6xl mx-auto overflow-hidden">
              <Image
                src="/Ai Agent.png"
                alt="AgentNexora Operational Process"
                width={1400}
                height={900}
                className="w-full h-auto rounded-[32px] shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
                priority
              />
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#dad9d2] block">
              (Upcoming Feature)
            </span>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities Bento */}
      <section id="capabilities" className="py-24 px-6 bg-[#f9f6ee] scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#781c2e] mb-2 block">Enterprise Stack</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#570010]">Built for flow.</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <BentoCard
              title="Vendor Velocity"
              description="Orders, products, and fulfillment managed without friction. Designed for high-volume execution."
              icon={Zap}
              className="md:col-span-8 h-[380px]"
            >
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-white rounded-2xl border border-[#dad9d2]">
                  <div className="text-[10px] font-black text-[#781c2e] uppercase mb-2">Active Orders</div>
                  <div className="text-2xl font-black text-[#781c2e]">1,204</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#dad9d2]">
                  <div className="text-[10px] font-black text-[#781c2e] uppercase mb-2">Stock Syncs</div>
                  <div className="text-2xl font-black text-[#781c2e]">24k/hr</div>
                </div>
              </div>
            </BentoCard>

            <BentoCard
              title="Real-time Analytics"
              description="Track marketplace health instantly with low-latency data streams."
              icon={BarChart3}
              className="md:col-span-4"
            >
              <div className="h-32 flex items-end gap-2 px-4 pb-2">
                {[30, 60, 45, 90, 65, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    className="flex-1 bg-[#781c2e] rounded-t-lg"
                  />
                ))}
              </div>
            </BentoCard>

            <BentoCard
              title="AI Intelligence"
              description="A safe, low-latency AI agent that explains, guides, and suggests marketplace actions."
              icon={Sparkles}
              className="md:col-span-4"
            >
              <div className="bg-[#781c2e] text-[#f9f6ee] p-4 rounded-2xl text-[10px] font-mono leading-relaxed">
                ❯ Analyzing order #2948...<br />
                ❯ Identifying stock risk...<br />
                ❯ Suggesting restocking...
              </div>
            </BentoCard>

            <BentoCard
              title="Modern Core"
              description="Built with Next.js, Drizzle ORM, Neon PostgreSQL, and Clerk for unbeatable scale."
              icon={Shield}
              className="md:col-span-8"
            >
              <div className="flex items-center gap-6">
                {[
                  { name: "Neon", src: "/neon.png" },
                  { name: "Clerk", src: "/clerk.png" },
                  { name: "Drizzle", src: "/drizzle.png" },
                  { name: "Next.js", src: "/nextjs.png" }
                ].map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 group/icon">
                    <div className="h-14 w-14 rounded-full bg-white border border-[#dad9d2] p-2 overflow-hidden flex items-center justify-center shadow-sm group-hover/icon:shadow-md transition-shadow">
                      <Image
                        src={tech.src}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className="object-contain filter grayscale group-hover/icon:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-[#781c2e]">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* AI Vision Section (Bubble) */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#781c2e] text-white text-[10px] font-black uppercase mb-8">
              Phase 2: NexoAI
            </div>
            <h2 className="text-5xl font-black text-[#570010] leading-tight mb-8">
              An AI helper that lives inside the product.
            </h2>
            <p className="text-xl font-bold text-[#781c2e] leading-relaxed mb-8">
              Nexora’s AI Agent is aware of your page, your role, and your data.
              It explains, guides, and suggests, without ever taking control away from you.
            </p>
            <div className="flex flex-col gap-4 font-bold text-sm text-[#781c2e]">
              <div className="flex items-center gap-3"><ChevronRight className="h-4 w-4" /> Explain anomaly in fulfillment rates</div>
              <div className="flex items-center gap-3"><ChevronRight className="h-4 w-4" /> Predict weekend order volume</div>
              <div className="flex items-center gap-3"><ChevronRight className="h-4 w-4" /> Bulk adjust product pricing on signal</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group p-4"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[320px] md:w-[400px] h-[500px] bg-white border border-[#dad9d2] rounded-[48px] shadow-2xl p-6 relative z-10"
            >
              {/* AI Chat Preview */}
              <div className="flex items-center gap-3 border-b border-[#dad9d2] pb-6 mb-8">
                <div className="h-10 w-10 bg-[#f9f6ee] rounded-full flex items-center justify-center border border-[#dad9d2]">
                  <Image src="/NEXORA.png" alt="Nexora" width={24} height={24} />
                </div>
                <div>
                  <div className="font-black text-sm text-[#570010]">NexoAI Agent</div>
                  <div className="text-[10px] font-black text-[#781c2e] uppercase tracking-tighter">Operational context mode</div>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { text: 'I see your fulfillment rate for "Leather Gear" dropped by 4%. Would you like me to check for warehouse delays?', role: 'ai' },
                  { text: 'Yes, pull the last 24h activity logs for vendor V-291.', role: 'user' },
                  { text: 'Pulling activity logs...', role: 'status' },
                ].map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.8 }}
                    className={`${msg.role === 'user' ? 'bg-[#781c2e] text-[#f9f6ee] ml-12 rounded-tr-none' : 'bg-[#f9f6ee] rounded-tl-none'
                      } p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === 'status' ? 'font-bold flex items-center gap-2' : ''}`}
                  >
                    {msg.role === 'status' && <Activity className="h-4 w-4 animate-pulse text-[#781c2e]" />}
                    <span>{msg.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Shadow element */}
            <div className="absolute inset-x-8 bottom-0 h-10 bg-[#781c2e]/10 rounded-full translate-y-4 -z-0" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-white border-y border-[#dad9d2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#781c2e] mb-4 block">Wall of Trust</span>
            <h2 className="text-5xl font-black text-[#570010] tracking-tight">What our customers say.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Nexora has completely streamlined our internal coordination. The AI context awareness alone saved our vendors hours every week.",
                author: "Alex Rivers",
                role: "Ops Director at SwiftCart"
              },
              {
                text: "The calm UI and structured approach to marketplace management is what sets Nexora apart. It's built for scale, not just show.",
                author: "Sarah Chen",
                role: "CEO of AuraMarket"
              },
              {
                text: "Transitioning to Nexora Hub was seamless. The deep database connectivity gives us insights we previously had to manually pull for hours.",
                author: "James Miller",
                role: "Vendor Relations at GlobalLogix"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-[#f9f6ee] p-8 rounded-[32px] border border-[#dad9d2] relative group"
              >
                <div className="text-[#781c2e] font-medium leading-relaxed mb-8 italic text-lg">
                  "{t.text}"
                </div>
                <div>
                  <div className="font-black text-[#570010]">{t.author}</div>
                  <div className="text-xs font-black text-[#781c2e] uppercase tracking-wider">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 bg-[#dad9d2]/10 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#781c2e] mb-8 block">The Philosophy</span>
              <h2 className="text-5xl font-black text-[#570010] tracking-tight mb-8">
                Why we call it <br /><span className="text-[#781c2e]">Nexora.</span>
              </h2>
              <div className="space-y-6 text-xl font-medium text-[#781c2e]/80 leading-relaxed">
                <p>
                  The name Nexora is derived from <span className="font-black text-[#570010]">“Next”</span> and <span className="font-black text-[#570010]">“Aura”</span>symbolizing the next layer of intelligence that surrounds and enhances operational systems.
                </p>
                <p>
                  Nexora is not just software you use; it&apos;s an intelligent control layer that brings clarity, flow, and confidence to complex marketplace operations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-12 border border-[#dad9d2] shadow-sm relative group">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#781c2e]/40 mb-10">Visual Identity System</h3>
              <ul className="space-y-8">
                {[
                  { color: "bg-[#f9f6ee]", title: "Bone White", desc: "For clarity and openness" },
                  { color: "bg-[#781c2e]", title: "Garnet & Burnt Red", desc: "For control and authority" },
                  { color: "bg-gradient-to-br from-[#dad9d2] to-[#f9f6ee]", title: "Soft Gradients & Motion", desc: "To reduce cognitive load" }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-6 items-center">
                    <div className={`h-14 w-14 rounded-[20px] ${item.color} border border-[#dad9d2] shrink-0 shadow-inner`} />
                    <div>
                      <div className="font-black text-[#570010] text-lg leading-none mb-1">{item.title}</div>
                      <div className="text-[10px] font-black text-[#781c2e] uppercase tracking-[0.1em]">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-[#dad9d2] text-[11px] font-black italic text-[#781c2e] text-center leading-relaxed">
                "Every design choice is intentional—built to support <br /> decision-making, not distract from it."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developed By Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#781c2e] mb-16">Project Architect</span>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white border-2 border-[#781c2e] rounded-[48px] p-12 shadow-2xl relative overflow-hidden group max-w-2xl w-full text-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-24 w-24 bg-[#f9f6ee] rounded-[32px] border-4 border-[#dad9d2] flex items-center justify-center mb-8 relative overflow-hidden">
                <Image
                  src="/tm1.png.jpeg"
                  alt="Vedantt"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-[#781c2e] rounded-full border-4 border-white flex items-center justify-center z-20">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-[#570010] mb-2 tracking-tight">Developed by Vedantt</h3>
              <p className="text-lg font-bold text-[#781c2e] mb-10 max-w-sm text-center">
                Full-stack engineer focused on building calm, scalable, AI-ready marketplace systems.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/thevedantt" target="_blank" className="h-14 w-14 bg-[#f9f6ee] rounded-2xl border border-[#dad9d2] flex items-center justify-center text-[#781c2e] hover:bg-[#781c2e] hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-transparent hover:shadow-[#781c2e]/20">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/vedant-talekar-055910208/" target="_blank" className="h-14 w-14 bg-[#f9f6ee] rounded-2xl border border-[#dad9d2] flex items-center justify-center text-[#781c2e] hover:bg-[#781c2e] hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-transparent hover:shadow-[#781c2e]/20">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="h-14 w-14 bg-[#f9f6ee] rounded-2xl border border-[#dad9d2] flex items-center justify-center text-[#781c2e] hover:bg-[#781c2e] hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-transparent hover:shadow-[#781c2e]/20">
                  <Activity className="h-6 w-6" />
                </Link>
              </div>
            </div>
            {/* Decorative Garnet Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#781c2e] to-transparent" />
          </motion.div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-32 px-6 bg-white border-t border-[#dad9d2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#781c2e] mb-4 block">Information Hub</span>
            <h2 className="text-5xl font-black text-[#570010] tracking-tight">Common Questions</h2>
          </div>

          <div className="space-y-2">
            <FAQItem
              question="What is Nexora, in simple terms?"
              answer="Nexora is a marketplace operations platform that helps vendors and admins manage orders, inventory, and performance from a single control system. It replaces fragmented tools and manual coordination with a structured, scalable workflow."
            />
            <FAQItem
              question="Who is Nexora built for?"
              answer={
                <div className="space-y-4">
                  <p>Nexora is built for:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Vendors who need to execute orders, manage inventory, and act faster</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Admins / operators who need visibility, control, and accountability across the marketplace</li>
                  </ul>
                  <p>It’s designed for real operational teams, not just analytics viewers.</p>
                </div>
              }
            />
            <FAQItem
              question="Is Nexora production-ready or just a concept?"
              answer="Nexora is designed as a production-ready system from day one. Its architecture supports role-based access, auditability, scalability, and safe operations—making it suitable for real, high-volume marketplace workflows."
            />
            <FAQItem
              question="How does the AI agent (AgentNexora) work?"
              answer={
                <div className="space-y-4">
                  <p>AgentNexora is an assistive AI layer that:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Observes patterns in orders, inventory, and sales</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Suggests actions like revenue recovery, restocking, or marketing signals</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Explains insights clearly to the vendor or admin</li>
                  </ul>
                  <p>Importantly, AgentNexora never auto-executes actions. All decisions remain with the user.</p>
                </div>
              }
            />
            <FAQItem
              question="Can the AI perform actions on my behalf?"
              answer={
                <div className="space-y-4">
                  <p>AgentNexora can prepare and suggest actions, such as:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Drafting updates</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Highlighting opportunities</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Triggering notifications (with approval)</li>
                  </ul>
                  <p>However, every action requires explicit user confirmation. Nexora is built with a strict human-in-the-loop approach.</p>
                </div>
              }
            />
            <FAQItem
              question="Is Nexora secure?"
              answer={
                <div className="space-y-4">
                  <p>Yes. Nexora follows security-first principles:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Role-based access control (Admin / Vendor)</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Permission-aware actions</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Audit-friendly data flows</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> No blind automation</li>
                  </ul>
                  <p>Security and clarity are prioritized over convenience.</p>
                </div>
              }
            />
            <FAQItem
              question="Does Nexora replace existing tools like dashboards or spreadsheets?"
              answer="Yes—by design. Nexora replaces disconnected dashboards, spreadsheets, and manual coordination with a single operational layer where execution, control, and insight live together."
            />
            <FAQItem
              question="Is Nexora tied to a specific scale or business size?"
              answer={
                <div className="space-y-4">
                  <p>No. Nexora is designed to scale:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> From small vendor networks</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> To large, multi-vendor marketplaces</li>
                  </ul>
                  <p>The system grows with operational complexity without needing redesign.</p>
                </div>
              }
            />
            <FAQItem
              question="What makes Nexora different from other marketplace platforms?"
              answer={
                <div className="space-y-4">
                  <p>Nexora focuses on:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Calm, distraction-free UI</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Clear role separation</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Safe AI assistance (not automation chaos)</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Architecture-driven design</li>
                  </ul>
                  <p>It’s built as an operations system, not just a UI or analytics layer.</p>
                </div>
              }
            />
            <FAQItem
              question="Is Nexora open to future expansion (AI, analytics, automation)?"
              answer={
                <div className="space-y-4">
                  <p>Yes. Nexora is intentionally designed in phases:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Phase 1: Core operations & control</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Phase 2: Assistive AI (AgentNexora)</li>
                    <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#781c2e]" /> Phase 3: Advanced intelligence & optimization</li>
                  </ul>
                  <p>Each phase builds safely on the previous one.</p>
                </div>
              }
            />
            <FAQItem
              question="Can Nexora be customized or extended?"
              answer="The system is modular by design. Features, workflows, and intelligence layers can be extended without disrupting the core operational flow."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <footer className="relative bg-[#570010] text-[#f9f6ee] py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-20%] left-[20%] w-full h-full border-[1.5px] border-white rounded-full opacity-10" />
          <div className="absolute top-[-10%] left-[10%] w-full h-full border-[1.5px] border-white rounded-full opacity-5" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Ready to simplify marketplace operations?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                onClick={handleDemoRequest}
                className="h-16 px-12 rounded-3xl bg-white text-[#781c2e] text-lg font-black hover:bg-[#dad9d2] transition-all duration-500 shadow-2xl"
              >
                Explore Nexora
              </Button>
              <Link href="/sign-up" className="font-bold border-b-2 border-white/20 hover:border-white transition-all pb-1">
                Create your account
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-[#781c2e] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
          <div>© 2025 Nexora Operations Platform</div>
          <div className="flex gap-8 text-[#781c2e]">
            <Link href="#" className="hover:font-black transition-all">Privacy</Link>
            <Link href="#" className="hover:font-black transition-all">Terms</Link>
            <Link href="#" className="hover:font-black transition-all">Contact</Link>
          </div>
        </div>
      </footer>

    </div >
  );
}
