import React from 'react';
import { Mail, Github, Linkedin, MapPin, Building2, MessageSquare, Send, Sparkles } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Let's Connect</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in <span className="gradient-text-primary">Touch</span>
        </h1>
        <p className="text-base text-text-muted">
          Have an AI engineering question, collaboration idea, or opportunity? Send a message directly or connect via verified channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information & Channels */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 space-y-6 lg:col-span-1 h-fit">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Direct Channels
          </h3>

          <div className="space-y-4 text-sm">
            {/* Email */}
            <a
              href="mailto:nmaduraaganesh@gmail.com"
              className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all group"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-text-subtle">Primary Email</div>
                <div className="text-white font-medium truncate text-xs sm:text-sm">
                  nmaduraaganesh@gmail.com
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/MADURAAGANESH-N"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-white/5 hover:border-secondary/40 hover:bg-white/5 transition-all group"
            >
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:scale-110 transition-transform shrink-0">
                <Github className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-text-subtle">GitHub Profile</div>
                <div className="text-white font-medium truncate text-xs sm:text-sm">
                  MADURAAGANESH-N
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-white/5 text-text-muted">
              <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-text-subtle">LinkedIn</div>
                <div className="placeholder-badge text-[11px] mt-1">
                  [Add correct public LinkedIn URL]
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Current: <strong className="text-white">AI Engineer @ Zoho</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>Location: <span className="placeholder-badge text-[10px]">[Add location]</span></span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
