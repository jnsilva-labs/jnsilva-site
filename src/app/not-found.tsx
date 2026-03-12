import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-6 font-[family-name:var(--font-mono)]">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-6">
          Page Not Found
        </h1>
        <p className="text-[#F5F0E8]/40 text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-8 py-3 border border-[#C8C0B4]/40 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4]/10 hover:border-[#C8C0B4] transition-all duration-300"
        >
          Back to Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
