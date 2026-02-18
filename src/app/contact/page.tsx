'use client';

import { useState } from 'react';
import { ExternalLink, Send, MapPin, Mail } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handler — can be connected to a serverless function
    const mailtoLink = `mailto:jns@jnsilva.com?subject=${encodeURIComponent(formData.subject || 'Website Inquiry')}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\n${formData.message}`)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Connect
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Get in Touch
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          For inquiries about brand campaigns, creative direction, photography,
          film, and speaking engagements.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left — Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-mono)]">
                Direct
              </h3>
              <a
                href="mailto:jns@jnsilva.com"
                className="flex items-center gap-3 text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors text-base"
              >
                <Mail size={16} className="text-[#C8C0B4]/60" />
                jns@jnsilva.com
              </a>
            </div>

            <div>
              <h3 className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-4 font-[family-name:var(--font-mono)]">
                Location
              </h3>
              <p className="flex items-center gap-3 text-[#F5F0E8]/50 text-base">
                <MapPin size={16} className="text-[#C8C0B4]/60" />
                New York City
              </p>
            </div>

            <div>
              <h3 className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-6 font-[family-name:var(--font-mono)]">
                Social
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Instagram', url: 'https://instagram.com/jnsilva' },
                  { name: 'X (Twitter)', url: 'https://x.com/JNSilva_' },
                  { name: 'SuperRare', url: 'https://superrare.com/jnsilva' },
                  { name: 'LinkedIn', url: 'https://linkedin.com/in/jnsilva' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#F5F0E8]/40 hover:text-[#F5F0E8] text-sm transition-colors"
                  >
                    {social.name}
                    <ExternalLink size={12} className="text-[#C8C0B4]/40" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#141414] border border-[#C8C0B4]/10">
              <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-3 font-[family-name:var(--font-mono)]">
                Services
              </p>
              <ul className="space-y-2 text-[#F5F0E8]/40 text-sm">
                <li>Brand Photography &amp; Film</li>
                <li>Creative Direction</li>
                <li>NFT &amp; Digital Art Commissions</li>
                <li>Speaking &amp; Workshops</li>
                <li>Experiential Concepts</li>
              </ul>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider mb-2 block font-[family-name:var(--font-mono)]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#C8C0B4]/10 text-[#F5F0E8] px-4 py-3 text-sm focus:border-[#C8C0B4]/40 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider mb-2 block font-[family-name:var(--font-mono)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141414] border border-[#C8C0B4]/10 text-[#F5F0E8] px-4 py-3 text-sm focus:border-[#C8C0B4]/40 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider mb-2 block font-[family-name:var(--font-mono)]">
                  Inquiry Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#141414] border border-[#C8C0B4]/10 text-[#F5F0E8] px-4 py-3 text-sm focus:border-[#C8C0B4]/40 focus:outline-none transition-colors appearance-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="commercial">Brand / Commercial</option>
                  <option value="creative">Creative Direction</option>
                  <option value="nft">NFT / Digital Art</option>
                  <option value="speaking">Speaking / Workshop</option>
                  <option value="press">Press / Interview</option>
                </select>
              </div>

              <div>
                <label className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider mb-2 block font-[family-name:var(--font-mono)]">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#141414] border border-[#C8C0B4]/10 text-[#F5F0E8] px-4 py-3 text-sm focus:border-[#C8C0B4]/40 focus:outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="text-[#F5F0E8]/40 text-xs uppercase tracking-wider mb-2 block font-[family-name:var(--font-mono)]">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full bg-[#141414] border border-[#C8C0B4]/10 text-[#F5F0E8] px-4 py-3 text-sm focus:border-[#C8C0B4]/40 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, vision, or idea..."
                  required
                />
              </div>

              <button
                type="submit"
                className="group flex items-center gap-3 px-10 py-4 border border-[#C8C0B4] text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] transition-all duration-300"
              >
                Send Message
                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
