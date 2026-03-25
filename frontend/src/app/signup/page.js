"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signupUser } from "../../apis/auth.api";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "male",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(formData);
      toast.success("Account created successfully. Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden py-12">
      {/* Animated Background Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-30 animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-purple-500 rounded-full blur-[120px] opacity-20 animate-float-reverse z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-slideUp">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm">Join Saraha today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="johndoe"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="phone">Phone (Optional)</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="010..."
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5" htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-primary to-purple-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-6 text-slate-400 text-sm">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3">or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <button 
          onClick={handleGoogleSignup}
          type="button"
          disabled={loading}
          className="flex items-center justify-center w-full py-3 gap-3 font-medium text-slate-800 bg-white rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

