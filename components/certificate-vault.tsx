'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { certificates } from '@/content/certificates';

const domainLabels: Record<string, string> = {
  software: 'Engineering',
  design: 'Design & Growth',
  data: 'Analytics & Business',
  marketing: 'Marketing',
  office: 'Office & Admin',
  communication: 'Communication',
};

const domainColors: Record<string, string> = {
  software: 'var(--accent)',
  design: 'var(--accent-secondary)',
  data: 'color-mix(in srgb, var(--accent) 60%, var(--accent-secondary))',
  marketing: 'color-mix(in srgb, var(--accent-secondary) 60%, var(--accent))',
  office: 'color-mix(in srgb, var(--accent) 55%, var(--foreground))',
  communication: 'color-mix(in srgb, var(--accent-secondary) 55%, var(--foreground))',
};

export function CertificateVault() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return certificates;
    return certificates.filter((c) => c.domain === filter);
  }, [filter]);

  const domains = ['all', ...new Set(certificates.map((c) => c.domain))];

  return (
    <section className="section" id="certificates">
      <div className="container-page">
        <div className="mb-12">
          <h2 className="glow-text text-4xl md:text-5xl font-bold mb-4">
            Certificate Vault
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            {certificates.length} verified credentials across {domains.length - 1} domains.
            Click any card to view details.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setFilter(domain)}
              className={`chip ${
                filter === domain ? 'chip-active' : ''
              }`}
              style={{
                borderColor: domain !== 'all' ? domainColors[domain] : undefined,
              }}
            >
              {domain === 'all' ? 'All' : domainLabels[domain]}
              <span className="ml-2 text-xs opacity-70">
                {domain === 'all'
                  ? certificates.length
                  : certificates.filter((c) => c.domain === domain).length}
              </span>
            </button>
          ))}
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cert, index) => (
            <div
              key={cert.id || index}
              className="certificate-card"
              onClick={() => setSelectedCert(cert)}
              style={{ cursor: 'pointer' }}
            >
              <div className="certificate-card-inner">
                <div className="certificate-card-front">
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${domainColors[cert.domain]} 20%, transparent)`,
                      color: domainColors[cert.domain],
                    }}
                  >
                    {cert.title.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {cert.issuer}
                  </p>
                  {cert.id && (
                    <p className="text-[11px] text-text-muted font-mono mb-3 truncate" title={cert.id}>
                      ID: {cert.id}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-text-muted font-mono">
                      {cert.date}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${domainColors[cert.domain]} 15%, transparent)`,
                        color: domainColors[cert.domain],
                      }}
                    >
                      {domainLabels[cert.domain]}
                    </span>
                  </div>
                </div>
                <div className="certificate-card-back">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${domainColors[cert.domain]} 20%, transparent)`,
                        color: domainColors[cert.domain],
                      }}
                    >
                      ✓
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-foreground">
                      Verified
                    </h4>
                    {cert.id && (
                      <p className="text-xs text-text-muted font-mono mb-4 break-all">
                        ID: {cert.id}
                      </p>
                    )}
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Verify Certificate
                      </a>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        Contact for verification
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="glass-card max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-surface/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-foreground" aria-hidden="true" />
            </button>

            <div
              className="w-20 h-20 rounded-xl mb-6 flex items-center justify-center text-4xl font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${domainColors[selectedCert.domain]} 20%, transparent)`,
                color: domainColors[selectedCert.domain],
              }}
            >
              {selectedCert.title.charAt(0)}
            </div>

            <h3 className="text-2xl font-bold mb-2 text-foreground">
              {selectedCert.title}
            </h3>
            <p className="text-text-secondary mb-6">{selectedCert.issuer}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-text-muted text-sm">Date:</span>
                <span className="text-foreground font-mono text-sm">
                  {selectedCert.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-muted text-sm">Domain:</span>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${domainColors[selectedCert.domain]} 15%, transparent)`,
                    color: domainColors[selectedCert.domain],
                  }}
                >
                  {domainLabels[selectedCert.domain]}
                </span>
              </div>
              {selectedCert.id && (
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-sm">Certificate ID:</span>
                  <span className="text-foreground font-mono text-sm break-all">
                    {selectedCert.id}
                  </span>
                </div>
              )}
            </div>

            {selectedCert.verifyUrl ? (
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
              >
                Verify on Issuer Site
              </a>
            ) : (
              <div className="text-center p-4 rounded-lg bg-surface">
                <p className="text-sm text-text-secondary">
                  Verification link not available. Contact for proof.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
