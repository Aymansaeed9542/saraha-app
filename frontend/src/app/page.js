import Link from "next/link";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export default function Home() {
  const words = [
    { text: "Welcome" },
    { text: "to" },
    { text: "Saraha", className: "text-primary" },
  ];

  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center pointer-events-none px-4 text-center">
        <div className="space-y-8 animate-slideUp">
          <TypewriterEffect words={words} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight" />
          
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium">
            Get honest feedback from your friends and colleagues anonymously.
            <span className="block mt-2 text-primary/80">Express yourself without fear.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 pointer-events-auto">
            <Link 
              href="/login"
              className="group relative px-10 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            <Link 
              href="/signup"
              className="px-10 py-4 rounded-2xl bg-primary/20 border border-primary/50 text-white font-bold hover:bg-primary/30 transition-all duration-300 backdrop-blur-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
