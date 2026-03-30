"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-animation";
import { ConnectWallet } from "@/components/connect-button";

interface HeroSectionProps {
  onConnectStore?: () => void;
}

const headlineWords = ["Money 9–23 Days.", "Cash Flow Gap.", "Sales Cycle.", "Working Capital."];

export default function HeroSection({ onConnectStore }: HeroSectionProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const word = headlineWords[currentWordIndex];
    
    if (isTyping) {
      if (displayText.length < word.length) {
        const timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % headlineWords.length);
          setIsTyping(true);
        }, 0);
      }
    }
  }, [displayText, isTyping, currentWordIndex]);

  return (
    <section className="bg-[#F5F3EC] pt-32 pb-24 px-8 md:px-16">
      {/* Tag */}
      <ScrollReveal className="mb-8">
        <span className="inline-block bg-[#EBE8DE] text-[#1C1B18] px-4 py-2 text-sm font-medium rounded-none">
          RWA-Backed Stablecoin Protocol
        </span>
      </ScrollReveal>

      {/* Headline with typing animation */}
      <ScrollReveal animation="fade-in-up" className="mb-8">
        <h1 className="text-[12vw] md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.85] text-[#1C1B18] text-balance">
          Amazon Holds Your
          <br />
          <span className="inline-block min-w-[10ch]">
            {displayText}
            <span className="animate-pulse inline-block w-[0.1em] ml-1 bg-[#1C1B18] align-middle" />
          </span>
        </h1>
      </ScrollReveal>

      {/* Sub-headline */}
      <ScrollReveal animation="fade-in-up" className="mb-12" style={{ animationDelay: '100ms' }}>
        <p className="text-2xl md:text-3xl text-[#1C1B18]/70 max-w-3xl leading-snug tracking-tight">
          We advance up to 80% of your daily net sales the same day Amazon confirms the order. No waiting. No credit checks. No paperwork.
        </p>
      </ScrollReveal>

      {/* Buttons */}
      <ScrollReveal animation="fade-in-up" className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '200ms' }}>
        <button
          onClick={onConnectStore}
          className="group inline-flex items-center gap-3 bg-[#0A2E20] text-[#F5F3EC] px-10 py-6 text-lg font-medium rounded-none hover:bg-black transition-colors"
        >
          Connect Amazon Store
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <ConnectWallet variant="secondary" />
      </ScrollReveal>
    </section>
  );
}
