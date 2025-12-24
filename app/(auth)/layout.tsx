import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f9f6ee] relative overflow-hidden font-sans">
            {/* Abstract Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#781c2e]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#781c2e]/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="z-10 w-full max-w-[440px] p-6 flex flex-col items-center">
                <Link href="/" className="group flex flex-col items-center mb-10 transition-transform active:scale-95">
                    <div className="relative w-20 h-20 bg-[#781c2e] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#781c2e]/30 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                        <Image
                            src="/NEXORA.png"
                            alt="Nexora Logo"
                            fill
                            className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 p-2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#781c2e]/40 to-transparent" />
                    </div>
                    <h1 className="mt-6 text-4xl font-bold text-[#781c2e] tracking-tighter">NEXORA</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-px w-8 bg-[#781c2e]/20" />
                        <p className="text-[#781c2e]/50 text-[10px] uppercase tracking-[0.3em] font-semibold">Enterprise Intelligence</p>
                        <div className="h-px w-8 bg-[#781c2e]/20" />
                    </div>
                </Link>

                <div className="w-full backdrop-blur-xl bg-white/40 rounded-[2.5rem] p-2 shadow-[0_32px_64px_-16px_rgba(120,28,46,0.15)] border border-white/60 relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] pointer-events-none" />
                    <div className="relative z-10 w-full flex justify-center">
                        {children}
                    </div>
                </div>

                <p className="mt-12 text-[#781c2e]/40 text-xs font-medium tracking-wide">
                    &copy; {new Date().getFullYear()} Nexora Global Systems. All rights reserved.
                </p>
            </div>
        </div>
    );
}
