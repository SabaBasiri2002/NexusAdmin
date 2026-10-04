"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8">
      {error && (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-xl border border-red-500/20">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#1A1A1A] text-white border border-[#333333] rounded-xl px-4 py-3.5 outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all placeholder:text-[#666666] text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#1A1A1A] text-white border border-[#333333] rounded-xl px-4 py-3.5 outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all placeholder:text-[#666666] text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 border border-[#333333] rounded-[4px] bg-[#1A1A1A] group-hover:border-white/40 transition-colors flex items-center justify-center">
          </div>
          <span className="text-[#888888] text-sm group-hover:text-white transition-colors">
            Remember me
          </span>
        </label>

        <button
          type="button"
          className="text-[#888888] text-sm hover:text-white transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#EAEAEA] text-black font-medium rounded-xl py-3.5 mt-4 hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign in"}
        {!isLoading && <span className="text-lg leading-none">→</span>}
      </button>

      <div className="flex items-center justify-center gap-2 mt-8 text-[#666666] text-xs">
        <div className="w-3 h-3 rounded-full border border-[#666666] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#666666]" />
        </div>
        Secure admin access
      </div>
    </form>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<div className="mt-8 text-center text-[#888888] text-sm">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
