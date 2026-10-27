'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle, Clock, Send, Tag } from 'lucide-react';

interface ContactFormProps {
  email: string;
  whatsapp: string;
}

const SUBJECT_OPTIONS = [
  'Freelance Project',
  'E-commerce Store (Shopify / WordPress / Odoo)',
  'Full-time Opportunity',
  'Collaboration',
  'Other',
] as const;

export function ContactForm({ email, whatsapp }: ContactFormProps) {
  const [name, setName] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [subject, setSubject] = useState<string>(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const whatsappNumber = whatsapp.replace(/[^0-9]/g, '');

  const buildText = () => {
    const sentAt = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return [
      '📩 *New Message — tayyab.co*',
      '━━━━━━━━━━━━━━━━━━',
      `*Name:* ${name}`,
      `*Email:* ${emailValue}`,
      `*Subject:* ${subject}`,
      `*Sent:* ${sentAt}`,
      '━━━━━━━━━━━━━━━━━━',
      '',
      message,
      '',
      '━━━━━━━━━━━━━━━━━━',
      '_Sent from the portfolio contact form_',
    ].join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const encoded = encodeURIComponent(buildText());
    const mailSubject = `[Portfolio] ${subject} — ${name}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encoded}`;

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-1 text-2xl font-bold">Send a message</h2>
      <p className="mb-6 text-sm text-[var(--text-muted)]">
        Delivered straight to WhatsApp and email — typically answered within 24 hours.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm transition-colors focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm transition-colors focus:border-[var(--accent)] focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            <Tag className="mr-1 inline size-3.5 text-[var(--accent)]" aria-hidden="true" />
            Subject
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm transition-colors focus:border-[var(--accent)] focus:outline-none"
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            placeholder="Tell me about your project, timeline, and budget range..."
            className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm transition-colors focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="hidden items-center gap-1.5 text-xs text-[var(--text-muted)] sm:flex">
            <Clock className="size-3.5" aria-hidden="true" />
            Replies within 24 hours
          </p>
          <button type="submit" className="btn btn-primary">
            {sent ? (
              <>
                <CheckCircle className="size-4" aria-hidden="true" />
                Sent!
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Send via WhatsApp
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
