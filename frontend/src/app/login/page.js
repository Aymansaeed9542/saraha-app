"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back!");
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-30 animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-purple-500 rounded-full blur-[120px] opacity-20 animate-float-reverse z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-slideUp">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your Saraha account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-primary to-purple-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-6 text-slate-400 text-sm">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3">or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="flex items-center justify-center w-full py-3 gap-3 font-medium text-slate-800 bg-white rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
