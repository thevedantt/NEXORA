import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <SignIn
            appearance={{
                elements: {
                    formButtonPrimary:
                        "bg-[#781c2e] hover:bg-[#5a1522] text-sm normal-case",
                    card: "bg-white/0 shadow-none",
                    headerTitle: "text-[#781c2e]",
                    headerSubtitle: "text-[#781c2e]/70",
                    socialButtonsBlockButton:
                        "border-[#781c2e]/10 hover:bg-[#781c2e]/5 text-[#781c2e] border",
                    socialButtonsBlockButtonText: "font-medium",
                    dividerLine: "bg-[#781c2e]/10",
                    dividerText: "text-[#781c2e]/40",
                    formFieldLabel: "text-[#781c2e]/70",
                    formFieldInput:
                        "border-[#781c2e]/20 focus:border-[#781c2e] focus:ring-[#781c2e]/20 bg-white/50",
                    footerActionLink: "text-[#781c2e] hover:text-[#5a1522]",
                    identityPreviewText: "text-[#781c2e]",
                    identityPreviewEditButtonIcon: "text-[#781c2e]",
                    formResendCodeLink: "text-[#781c2e]",
                },
            }}
        />
    );
}