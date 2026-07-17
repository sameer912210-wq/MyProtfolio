import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle, Github, Linkedin, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Simulate standard async message submission delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-100">
            Let's Collaborate
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-lg">
            I am always open to discussing new software architectures, freelance projects, full-time engineering roles, or collaboration opportunities.
          </p>
        </div>

        {/* Form & Info Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 space-y-8">
              <h3 className="text-lg font-sans font-bold text-zinc-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4 items-start group">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400 group-hover:border-zinc-600 transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      Direct Email
                    </h4>
                    <a
                      id="contact_email_link"
                      href={`mailto:${personalInfo.email}`}
                      className="text-zinc-200 hover:text-emerald-400 text-sm sm:text-base font-sans font-medium transition-colors block mt-1"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400 group-hover:border-zinc-600 transition-colors shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      Base Location
                    </h4>
                    <p className="text-zinc-200 text-sm sm:text-base font-sans font-medium mt-1">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-6 border-t border-zinc-800/60">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-4">
                  Social Channels
                </h4>
                <div className="flex gap-4">
                  <a
                    id="contact_github"
                    href={personalInfo.github}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex-1 py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-xl font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Github className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
                    GitHub
                  </a>
                  <a
                    id="contact_linkedin"
                    href={personalInfo.linkedin}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex-1 py-2.5 px-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-xl font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Linkedin className="w-4 h-4 text-indigo-400 group-hover:scale-105 transition-transform" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Trust Badge / Security note */}
              <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Encrypted client-side dispatch transmission.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction message dispatcher form */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 text-left">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  id="success_response_box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-6 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-zinc-100">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 max-w-sm">
                    Thank you for reaching out. I have received your message and will review it carefully. I'll get back to you within 24 hours!
                  </p>
                  <button
                    id="success_reset_btn"
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-mono text-xs rounded-lg transition-colors border border-zinc-700/50"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  id="contact_form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 hover:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-500/20"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 hover:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Subject Title
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Collaboration opportunity / Freelance Project"
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 hover:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                      Detailed Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Sameer, I'd love to chat about a potential project opportunity..."
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 hover:border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                    {status === 'error' && (
                      <p className="text-xs text-red-400 font-mono">
                        ⚠️ Please fill in all required fields.
                      </p>
                    )}
                    <div className="flex-1" />

                    <button
                      id="contact_submit_btn"
                      type="submit"
                      disabled={status === 'submitting'}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Dispatch Message
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
