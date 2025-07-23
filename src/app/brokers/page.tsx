'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, Menu, Shield, Star } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const brokers = [
  {
    name: "Stellar Brokers",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo stellar",
    rating: 4.9,
    description: "Top-tier execution speed and a wide range of assets. Perfect for day traders.",
    features: ["Low Spreads", "Advanced Charting", "24/7 Support"],
    website: "#"
  },
  {
    name: "Quantum Trades",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo quantum",
    rating: 4.8,
    description: "Zero commission on stocks and ETFs. A great choice for long-term investors.",
    features: ["Commission-Free", "Fractional Shares", "Portfolio Analytics"],
    website: "#"
  },
  {
    name: "Vertex Finance",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo vertex",
    rating: 4.7,
    description: "Access global markets with competitive forex rates and powerful trading tools.",
    features: ["Global Market Access", "Low Forex Fees", "Regulated & Secure"],
    website: "#"
  },
    {
    name: "Apex Clearing",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo apex",
    rating: 4.6,
    description: "Specializing in options and futures trading with a robust platform.",
    features: ["Advanced Options Strategies", "Futures Trading", "Risk Management Tools"],
    website: "#"
  },
  {
    name: "Infinity Invest",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo infinity",
    rating: 4.5,
    description: "A user-friendly platform for beginners with educational resources.",
    features: ["Beginner Friendly", "Educational Content", "Low Minimum Deposit"],
    website: "#"
  },
  {
    name: "Orion Capital",
    logo: "https://placehold.co/100x100.png",
    aiHint: "logo orion",
    rating: 4.4,
    description: "Your gateway to cryptocurrency trading with deep liquidity and security.",
    features: ["Crypto Specialist", "High Liquidity", "Secure Wallets"],
    website: "#"
  }
];

export default function BrokersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative z-50 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FL</div>
            <div className="text-xl font-semibold text-white">FinLight</div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/product" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {['Community', 'Markets', 'Brokers', 'More'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${item.toLowerCase() === 'brokers' ? 'text-white' : ''}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300 ${item.toLowerCase() === 'brokers' ? 'w-full' : 'w-0'}`}></span>
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4 ml-8">
            <div className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">🌐 EN</div>
            <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">👤</div>
            <Button asChild className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transform">
              <Link href="/get-started">Get started</Link>
            </Button>
          </div>
          <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6"/>
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-900/80 backdrop-blur-md border-cyan-400/20 text-white">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col items-center gap-6 mt-12">
                      <Link href="/product" className="text-xl text-gray-300 hover:text-white">Products</Link>
                      <Link href="/community" className="text-xl text-gray-300 hover:text-white">Community</Link>
                      <Link href="/markets" className="text-xl text-gray-300 hover:text-white">Markets</Link>
                      <Link href="/brokers" className="text-xl text-white">Brokers</Link>
                      <Link href="/more" className="text-xl text-gray-300 hover:text-white">More</Link>
                      <Button asChild className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-lg">
                          <Link href="/get-started">Get started</Link>
                      </Button>
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </header>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find the Right Broker for You
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            We've partnered with the world's leading brokers to give you a seamless trading experience.
          </p>
        </div>

        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brokers.map(broker => (
                <Card key={broker.name} className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col transition-all duration-300 hover:border-cyan-400/60 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-4">
                                <Image src={broker.logo} alt={`${broker.name} logo`} width={60} height={60} className="rounded-full" data-ai-hint={broker.aiHint} />
                                <CardTitle className="text-xl">{broker.name}</CardTitle>
                           </div>
                           <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="h-5 w-5 fill-current"/>
                                <span className="font-bold text-lg">{broker.rating}</span>
                           </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-gray-300 mb-6">{broker.description}</p>
                        <ul className="space-y-2">
                            {broker.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400"/>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Shield className="h-5 w-5 text-cyan-400"/>
                            <Globe className="h-5 w-5 text-cyan-400"/>
                        </div>
                        <Button variant="outline" className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                            Visit Website
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
