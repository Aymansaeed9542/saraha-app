"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send, User } from "lucide-react";
import { sendAnonymousMessage } from "../../../apis/messages.api";
import { useParams } from "next/navigation";

export default function SendMessage() {
  const params = useParams();
  const receiverId = params.id;
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden py-12">
      {/* Animated Background Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-20 animate-float z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-sky-500 rounded-full blur-[120px] opacity-20 animate-float-reverse z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-slideUp">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-sky-400 p-1 mb-4">
             <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white/80">
                <User size={40} />
             </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Send anonymous message</h1>
          <p className="text-slate-400 text-sm">Say what's on your mind. They'll never know it's from you.</p>
        </div>

        {sent ? (
          <div className="text-center py-6 bg-green-500/10 border border-green-500/20 rounded-2xl mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-2">Message Delivered!</h2>
            <p className="text-green-200/80 mb-6">Want to receive messages like this?</p>
            <a href="/signup" className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all inline-block hover:-translate-y-0.5">
              Create your own account
            </a>
            <button onClick={() => setSent(false)} className="block w-full text-slate-400 mt-6 text-sm hover:text-white transition-colors">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div className="relative">
              <textarea
                className="w-full p-5 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                placeholder="Write your constructive feedback here..."
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={1000}
                required
              />
              <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-500">
                {content.length}/1000
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-white bg-gradient-to-r from-primary to-sky-500 rounded-2xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Anonymously"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
