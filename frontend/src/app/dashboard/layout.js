"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/u/${session?.user?.id}`;

  const copyProfileLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied!");
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[5%] left-[10%] w-[300px] h-[300px] bg-primary rounded-full blur-[100px] opacity-20 animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-20 animate-float-reverse z-0 pointer-events-none"></div>

      {/* Sidebar */}
      <aside className="relative z-10 w-full md:w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent mb-8">
            Saraha
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.[0]?.toUpperCase() || <User size={20} />}
                 </div>
                 <div>
                    <h3 className="font-semibold">{session?.user?.name || "User"}</h3>
                    <p className="text-xs text-slate-400 truncate w-32">{session?.user?.email}</p>
                 </div>
               </div>
            </div>

            <Link 
              href={`/u/${session?.user?.id}`}
              className="w-full flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all font-medium mb-3"
            >
              <User size={18} />
              View My Profile
            </Link>

            <button 
              onClick={copyProfileLink}
              className="w-full flex items-center justify-center gap-2 p-3 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-xl transition-all font-medium"
            >
              <LinkIcon size={18} />
              Copy Public Link
            </button>
          </div>
        </div>

        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-8 flex items-center justify-center gap-2 w-full p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
