"use client";

import { Send, Mail, Linkedin, Github, MessageSquare, Copy, Check, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import React from "react";

export function Contact() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section
      eyebrow="Connections"
     title={
  <>
    Ready for the <span className="text-[#00ff9d]">next</span> challenge.
  </>
}
      description="Whether it is a complex backend architecture, an AI integration, or a scalable enterprise service — let us talk about how I can contribute to your team."
    >
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <a href={`mailto:${profile.email}`} className="group p-8 rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-[#00ff9d]/30 hover:bg-[#00ff9d]/5">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Mail size={24} className="text-[#00ff9d]" />
                </div>
                <ArrowIcon />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">Direct Email</h4>
              <p className="text-sm text-slate-500 font-medium">{profile.email}</p>
            </a>

            <a href="https://linkedin.com/in/arcanep00" target="_blank" className="group p-8 rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-[#00f5ff]/30 hover:bg-[#00f5ff]/5">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Linkedin size={24} className="text-[#00f5ff]" />
                </div>
                <ArrowIcon />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">LinkedIn</h4>
              <p className="text-sm text-slate-500 font-medium">Connect professionally</p>
            </a>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-[#111118]/50 backdrop-blur-xl">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[#00ff9d]/10 rounded-2xl">
                  <MessageSquare size={24} className="text-[#00ff9d]" />
                </div>
                <div>
                   <h4 className="text-xl font-bold text-white">Send a Message</h4>
                   <p className="text-sm text-slate-500 font-medium">Inquiry for backend engineering roles</p>
                </div>
             </div>

             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                   <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00ff9d]/40 transition-colors" />
                   <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00ff9d]/40 transition-colors" />
                </div>
                <textarea rows={4} placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-[#00ff9d]/40 transition-colors resize-none"></textarea>
                <button className="w-full bg-white text-black py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                   <Send size={18} /> Send Message
                </button>
             </form>
          </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="p-10 rounded-3xl border border-[#00ff9d]/20 bg-[#00ff9d]/5 flex flex-col items-center text-center">
              <div className="relative mb-8">
                 <div className="h-24 w-24 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-white/5">
                    {/* Placeholder for Profile Image */}
                    <div className="h-20 w-20 rounded-full bg-[#00ff9d]/20 blur-xl animate-pulse" />
                    <Terminal className="absolute text-[#00ff9d]" size={32} />
                 </div>
                 <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#00ff9d] border-4 border-[#050508] flex items-center justify-center" />
              </div>

              <h4 className="text-2xl font-bold text-white mb-2">Abhinav Pandey</h4>
              <p className="text-slate-400 font-medium mb-8">Available for worldwide opportunities in Python, Django, and FastAPI.</p>
              
              <button 
                onClick={copyEmail}
                className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between group hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                   {copied ? <Check size={18} className="text-[#00ff9d]" /> : <Mail size={18} className="text-slate-500" />}
                   <span className={`text-sm font-bold uppercase tracking-widest ${copied ? "text-[#00ff9d]" : "text-slate-400"}`}>
                      {copied ? "Copied!" : "Copy Email"}
                   </span>
                </div>
                <Copy size={16} className="text-slate-600 group-hover:text-white transition-colors" />
              </button>
           </div>

           <div className="p-10 rounded-3xl border border-white/10 bg-white/5">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Current Location</h5>
              <div className="flex items-center gap-4 text-white">
                 <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapIcon />
                 </div>
                 <div>
                    <p className="font-bold">Greater Noida West</p>
                    <p className="text-xs text-slate-500">Uttar Pradesh, India</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Section>
  );
}

function ArrowIcon() {
  return (
    <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-white/10 transition-all">
       <ArrowUpRight size={16} />
    </div>
  );
}

function ArrowUpRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
