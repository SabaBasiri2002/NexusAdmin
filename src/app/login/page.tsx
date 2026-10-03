import { Metadata } from "next";
import { Zap, ShieldCheck, LayoutGrid, Sparkles } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login | Dashora Management",
  description: "Sign in to your account to manage your workspace",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex w-full text-white selection:bg-white/20">
      {/* Left Pane - Branding & Info */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden border-r border-white/5">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="w-7 h-7 bg-[#0A0A0A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">D</span>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-lg leading-tight">Dashora</h1>
              <p className="text-[#888888] text-xs">Management Platform</p>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#888888] text-xs font-medium mb-8">
            <Sparkles size={14} className="text-white/60" />
            Modern Admin Experience
          </div>

          {/* Hero Text */}
          <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight mb-6 max-w-xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            Everything you need<br />to manage your<br />workspace.
          </h2>
          <p className="text-[#888888] max-w-md text-base leading-relaxed mb-16">
            A clean and focused dashboard experience built for efficient
            management. Unify your workflow today.
          </p>

          {/* Features */}
          <div className="space-y-8">
            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                <Zap size={18} className="text-white/70" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1 text-sm">Fast workflow</h3>
                <p className="text-[#888888] text-xs">Built for extreme productivity and speed</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                <ShieldCheck size={18} className="text-white/70" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1 text-sm">Secure access</h3>
                <p className="text-[#888888] text-xs">Enterprise-grade protected admin environment</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                <LayoutGrid size={18} className="text-white/70" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1 text-sm">Simple management</h3>
                <p className="text-[#888888] text-xs">Everything you need in one unified place</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-[420px] relative z-10">
          <div className="mb-8">
            <p className="text-[#888888] text-sm mb-2 font-medium">Welcome back</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">
              Sign in to your account
            </h2>
            <p className="text-[#888888] text-sm">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}