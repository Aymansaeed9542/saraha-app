"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Trash2, MessageCircle, Clock } from "lucide-react";
import { fetchMessages, deleteMessage } from "../../apis/messages.api";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      toast.error(error.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-slideUp">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Inbox</h1>
          <p className="text-slate-400">You have {messages.length} message{messages.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="p-3 bg-primary/20 rounded-2xl text-primary">
          <MessageCircle size={28} />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
          <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-500">
             <MessageCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No messages yet</h2>
          <p className="text-slate-400 text-center max-w-sm">
            Share your profile link to start receiving anonymous feedback and constructive messages!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:border-primary/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <p className="text-lg text-slate-100 leading-relaxed font-medium mb-3">
                  "{msg.content}"
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock size={14} />
                  <span>
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute:'2-digit'
                    })}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(msg._id)}
                className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300"
                title="Delete message"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
