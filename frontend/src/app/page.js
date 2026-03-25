import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* Animated Background Blobs */}
      <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-20 animate-float z-0 pointer-events-none"></div>
      
      <div className="relative z-10 text-center space-y-8 animate-slideUp">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
          Welcome to Saraha
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto">
          Get honest feedback from your friends and colleagues anonymously.
        </p>

        <div className="flex items-center justify-center gap-6 pt-8">
          <Link 
            href="/login"
            className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Login
          </Link>
          <Link 
            href="/signup"
            className="px-8 py-3 rounded-full bg-primary/20 border border-primary/50 text-white font-semibold hover:bg-primary/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
