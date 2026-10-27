'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProfileCarousel } from './profile-carousel';
import type { Profile } from '@/content/schemas/profile.schema';
import { Mail, Phone, MessageCircle, Link2, Code2, Download, Share2, MapPin, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';

function generateVCard(profile: Profile): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `TITLE:${profile.title}`,
    `EMAIL:${profile.email}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `ADR;TYPE=WORK:;;${profile.location.city};${profile.location.country};;`,
    `URL:${profile.links.linkedin}`,
    `URL:${profile.links.github}`,
    'END:VCARD',
  ].join('\n');
}

export function BusinessCard({ profile }: { profile: Profile }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate QR code client-side for reliable scanning
    QRCode.toDataURL('https://tayyab.co', {
      width: 200,
      margin: 2,
      color: {
        dark: '#0B132B',
        light: '#FFFFFF'
      }
    }).then(setQrDataUrl).catch(console.error);
  }, []);

  const handleDownloadVCard = () => {
    const vcard = generateVCard(profile);
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: profile.name,
      text: `${profile.name} — ${profile.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-3">
            Digital Business Card
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Connect professionally — scan, save, or share
          </p>
        </motion.div>

        {/* 3D Card Container */}
        <div className="perspective-1500 mb-12">
          <motion.div
            className="relative w-full aspect-[1.75/1] cursor-pointer mx-auto"
            style={{ maxWidth: '700px', transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          >
            {/* Front Side - Professional Business Card */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-glass)]">
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--background)]" />
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />

                {/* Holographic shine effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.15), transparent 40%)`,
                    mixBlendMode: 'overlay'
                  }}
                />

                {/* Accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)]" />

                {/* Content */}
                <div className="relative h-full flex flex-col md:flex-row p-8 md:p-10">
                  {/* Left - Photo & Branding */}
                  <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 flex flex-col items-center md:items-start">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-lg mb-4">
                      {profile.photos && profile.photos.length > 0 ? (
                        <ProfileCarousel photos={profile.photos} />
                      ) : (
                        <div className="w-full h-full bg-[var(--background)] flex items-center justify-center text-[var(--text-muted)]">
                          No photo
                        </div>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                        <span className="font-mono">Available for work</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Contact Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-1 tracking-tight">
                        {profile.name}
                      </h2>
                      <p className="text-base md:text-lg text-[var(--accent)] font-semibold mb-4">
                        {profile.title}
                      </p>

                      {/* Contact info - clean list */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                          <MapPin className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                          <span>{profile.location.city}, {profile.location.country}</span>
                        </div>
                        <a
                          href={`mailto:${profile.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <Mail className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                          <span>{profile.email}</span>
                        </a>
                        <a
                          href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                        >
                          <Phone className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                          <span>{profile.phone}</span>
                        </a>
                      </div>

                      {/* Social links - minimal */}
                      <div className="flex gap-3">
                        <a
                          href={profile.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all border border-[var(--border)]"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        {profile.links.linkedin && (
                          <a
                            href={profile.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all border border-[var(--border)]"
                            title="LinkedIn"
                          >
                            <Link2 className="w-4 h-4" />
                          </a>
                        )}
                        {profile.links.github && (
                          <a
                            href={profile.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all border border-[var(--border)]"
                            title="GitHub"
                          >
                            <Code2 className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Flip hint */}
                <div className="absolute bottom-3 right-4 text-xs text-[var(--text-muted)] flex items-center gap-1 font-mono">
                  <span>Tap to flip</span>
                  <motion.span
                    animate={{ rotateY: [0, 180, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    ↻
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Back Side - QR & Actions */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-glass)]">
                {/* Premium gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-[var(--background)]" />
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />

                {/* Accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-secondary)] via-[var(--accent)] to-[var(--accent-secondary)]" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-5 w-full max-w-sm"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                        Scan to Connect
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Point your camera at the QR code
                      </p>
                    </div>

                    {/* Real QR Code */}
                    <div className="w-44 h-44 mx-auto bg-white rounded-xl p-3 shadow-lg border border-[var(--border)]">
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="QR code to visit tayyab.co"
                          width={200}
                          height={200}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                          Loading QR...
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2.5 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadVCard();
                        }}
                        className="w-full px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        Save Contact
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare();
                        }}
                        className="w-full px-5 py-2.5 rounded-lg bg-[var(--background)] text-[var(--foreground)] font-semibold hover:bg-[var(--surface)] transition-colors border border-[var(--border)] flex items-center justify-center gap-2 text-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        Share Card
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Flip hint */}
                <div className="absolute bottom-3 right-4 text-xs text-[var(--text-muted)] flex items-center gap-1 font-mono">
                  <span>Tap to flip back</span>
                  <motion.span
                    animate={{ rotateY: [0, 180, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    ↻
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-sm text-[var(--text-muted)]">
            Click the card to flip • Download to save contact • Share to send link
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1500 {
          perspective: 1500px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </>
  );
}
