'use client';

const ROW_ONE = 'Business Development — Operations — Growth — ';
const ROW_TWO = 'Data Analytics — Clean Code — UI/UX Design — ';

export function ScrollMarquee() {
  return (
    <section
      aria-hidden="true"
      className="select-none overflow-hidden border-y border-[var(--border)] py-14"
    >
      <div className="marquee-mask">
        <div className="marquee-track is-slow">
          <MarqueeRow text={ROW_ONE} outline />
          <MarqueeRow text={ROW_ONE} outline />
        </div>
      </div>
      <div className="marquee-mask mt-4">
        <div className="marquee-track is-slow is-reversed">
          <MarqueeRow text={ROW_TWO} glow />
          <MarqueeRow text={ROW_TWO} glow />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ text, outline, glow }: { text: string; outline?: boolean; glow?: boolean }) {
  return (
    <div className="marquee-group">
      <span
        className={`marquee-text ${outline ? 'text-outline' : ''} ${glow ? 'glow-text' : ''}`}
      >
        {text}
      </span>
    </div>
  );
}
