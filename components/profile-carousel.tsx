'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export type ProfilePhoto = {
  src: string;
  alt: string;
};

const ROTATE_MS = 4500;

export function ProfileCarousel({ photos }: { photos: ProfilePhoto[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="absolute inset-0">
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === index ? photo.alt : ''}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 288px, 384px"
          className={`object-cover object-center transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
