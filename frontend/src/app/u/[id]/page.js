"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Send, User } from "lucide-react";
import { sendAnonymousMessage } from "../../../apis/messages.api";
import { useParams } from "next/navigation";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { TypewriterEffect } from "../../../components/ui/typewriter-effect";
import api from "../../../lib/api";

export default function SendMessage() {
  const params = useParams();
  const receiverId = params.id;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${receiverId}`);
        if (res.data.status === 200) {
          setUserData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };
    if (receiverId) fetchUser();
  }, [receiverId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Message cannot be empty");
    
    setLoading(true);
    try {
      await sendAnonymousMessage(content, receiverId);
      toast.success("Message sent anonymously!");
      setContent("");
      setSent(true);
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const titleWords = [
    { text: "Send" },
    { text: "anonymous" },
    { text: "message" },
    { text: "to" },
    { text: userData?.userName || "...", className: "text-primary" },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden py-12 bg-slate-950">
      {/* Subtle Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl animate-slideUp">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-900 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-primary border border-white/10 mb-6 shadow-inner">
               <User size={32} />
            </div>
            
            <TypewriterEffect words={titleWords} className="text-2xl md:text-3xl mb-2" />
            
            <p className="text-slate-400 text-sm mt-4">
              Your message is 100% anonymous. They will never know who sent it.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-10 px-6 bg-green-500/5 border border-green-500/10 rounded-3xl mb-4">
              <h2 className="text-2xl font-bold text-green-400 mb-3">Delivered!</h2>
              <p className="text-slate-300 mb-8 max-w-xs mx-auto">Your message has been safely delivered to {userData?.userName || "the user"}.</p>
              <div className="space-y-3">
                <a href="/signup" className="w-full flex items-center justify-center py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20">
                  Create Your Account
                </a>
                <button onClick={() => setSent(false)} className="text-slate-400 text-sm hover:text-white transition-colors">
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-6">
              <div className="relative">
                <textarea
                  className="w-full p-6 bg-black/40 border border-white/5 rounded-3xl text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none min-h-[160px] text-lg"
                  placeholder="Write something constructive..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={1000}
                  required
                />
                <div className="absolute bottom-4 right-6 text-xs font-medium text-slate-600">
                  {content.length}/1000
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="w-full flex items-center justify-center gap-3 py-4 font-bold text-white bg-white/10 hover:bg-white/15 border border-white/5 rounded-3xl transition-all duration-300 disabled:opacity-50 group hover:border-primary/50 shadow-xl"
              >
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                {loading ? "Sending..." : "Send Securely"}
              </button>
            </form>
          )}
        </BackgroundGradient>
      </div>
    </div>
  );
}
