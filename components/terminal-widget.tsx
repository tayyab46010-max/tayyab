'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help          Show this help message
  about         Learn about Tayyab Ali
  skills        List technical skills
  experience    View work experience
  education     View education background
  certificates  View certification count
  contact       Get contact information
  clear         Clear terminal
  exit          Close terminal`,

  about: `Tayyab Ali — Software Engineering Student & UI/UX Designer
Bridging clean code, analytical data, and user experience.
Based in Sialkot, Pakistan.`,

  skills: `Technical Skills:
  • Programming: C++, Python, TypeScript, JavaScript
  • Frameworks: Next.js, React, Tailwind CSS
  • Data: SQL, Business Intelligence, Analytics
  • Design: UI/UX, Figma, Adobe Creative Suite
  • Tools: Git, WordPress, Linux

Soft Skills:
  • Business Communication
  • Data-Driven Decision Making
  • Inventory & Logistics Management`,

  experience: `Work Experience:

[2024-08 → Present] Inventory / Stock Officer
  Trimed Pvt. Ltd
  • Manage daily inventory operations
  • Handle stock receiving and documentation
  • Coordinate with logistics teams

[2024-01 → 2024-07] KPO Executive
  Lay's Warehouse (PepsiCo-owned)
  • 99.8% data accuracy rate
  • High-volume logistics documentation
  • Supply-chain data flow support`,

  education: `Education:

[2026 → Present] BS Software Engineering
  Virtual University of Pakistan — Sambrial Campus

[2024 → 2026] Associate Degree in Computer Science
  Virtual University of Pakistan — Sambrial Campus

[2022 → 2024] FSc Pre-Engineering
  Superior Group of Colleges — Sambrial

[2020 → 2022] Matric (Science)
  Govt. High School Majra`,

  certificates: `Certifications: 22 completed across 4 domains
  • Software & Networking: 6 certificates
  • Design & UI/UX: 9 certificates
  • Analytics & Business: 7 certificates
  • Marketing: Multiple DigiSkills certifications

View all: /certificates`,

  contact: `Contact Information:

  Email:    tayyab46010@gmail.com
  WhatsApp: +92 318 2346010
  Location: Sialkot, Pakistan

  Links:
  • Portfolio: https://tayyab.co
  • LinkedIn:  https://www.linkedin.com/in/tayyab-ali-68980b404
  • GitHub:    https://github.com/tayyab46010-max`,
};

export function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Tayyab Ali — Interactive Terminal v1.0' },
    { type: 'output', content: 'Type "help" for available commands.\n' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsidePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown, true);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, content: cmd }];

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'exit') {
      setIsOpen(false);
      setHistory([]);
      setInput('');
      return;
    }

    if (COMMANDS[trimmed]) {
      newHistory.push({ type: 'output', content: COMMANDS[trimmed] });
    } else if (trimmed) {
      newHistory.push({
        type: 'error',
        content: `Command not found: ${trimmed}. Type "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-lg bg-surface border border-border hover:border-accent transition-all flex items-center justify-center group"
        aria-label="Open terminal"
        data-cursor="true"
        data-cursor-text="Terminal"
      >
        <span className="font-mono text-accent text-lg group-hover:scale-110 transition-transform">
          &gt;_
        </span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-text-secondary ml-2">
            tayyab@portfolio ~ %
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center size-7 rounded-md text-text-muted hover:text-foreground hover:bg-[var(--border)]/40 transition-colors"
          aria-label="Close terminal"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'input' && (
              <div className="flex items-start gap-2">
                <span className="text-accent shrink-0">$</span>
                <span className="text-foreground">{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <pre className="text-text-secondary whitespace-pre-wrap font-mono text-xs">
                {line.content}
              </pre>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-accent shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none font-mono text-sm"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
