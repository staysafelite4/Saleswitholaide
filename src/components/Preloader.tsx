import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, Code, CheckCircle2 } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  brandName?: string;
  tagline?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  brandName = 'SalesWithOlaide Web Studio',
  tagline = 'Turnkey Business Websites & E-Commerce Systems'
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [statusText, setStatusText] = useState('Initializing E-Commerce Engine...');

  useEffect(() => {
    const statusMessages = [
      'Initializing E-Commerce Engine...',
      'Configuring WhatsApp Ordering Engine...',
      'Loading High-Performance Catalogs...',
      'Optimizing Mobile Admin CMS...',
      'Ready to Launch!'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Increment progress with slight variation for realistic feel
      const increment = Math.floor(Math.random() * 18) + 8;
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText('Ready to Launch!');
        clearInterval(interval);

        // Start fade out after reaching 100%
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // fade duration
        }, 400);
      } else {
        setProgress(currentProgress);
        // Update status text based on progress stage
        const msgIdx = Math.min(
          Math.floor((currentProgress / 100) * (statusMessages.length - 1)),
          statusMessages.length - 2
        );
        setStatusText(statusMessages[msgIdx]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950 text-white font-sans transition-opacity duration-500 selection:bg-amber-500 selection:text-stone-950 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm w-full px-6 text-center space-y-8">
        {/* Animated Icon Emblem */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-bold shadow-2xl shadow-amber-500/30 mx-auto relative z-10 transform hover:scale-105 transition-transform duration-300">
            <Zap className="w-10 h-10 fill-stone-950 stroke-stone-950 animate-bounce" />
          </div>

          {/* Pulsing Outer Rings */}
          <div className="absolute inset-0 rounded-2xl bg-amber-500/40 animate-ping opacity-75 pointer-events-none" />
          <div className="absolute -inset-3 rounded-3xl border border-amber-500/20 animate-spin-slow pointer-events-none" />
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <span>{brandName}</span>
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          </h1>
          <p className="text-xs text-stone-400 font-medium max-w-xs mx-auto">
            {tagline}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-3">
          <div className="w-full h-2.5 bg-stone-900 border border-stone-800 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-rose-500 rounded-full transition-all duration-200 ease-out shadow-lg shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-400 flex items-center gap-1.5">
              {progress === 100 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
              <span>{statusText}</span>
            </span>
            <span className="font-bold text-amber-400 tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Developer Attribution */}
        <div className="pt-6 border-t border-stone-900/80 text-xs text-stone-500 flex items-center justify-center gap-2">
          <Code className="w-3.5 h-3.5 text-amber-500" />
          <span>Developed by <strong className="text-stone-300 font-semibold">dev. Emmanuel Kehinde</strong></span>
        </div>
      </div>
    </div>
  );
};
