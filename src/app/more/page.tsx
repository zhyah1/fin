'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Briefcase, Mail, Rss, Menu } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const moreLinks = [
  {
    title: "About Us",
    description: "Learn more about our mission, team, and the story behind FinLight.",
    icon: <Info className="h-8 w-8 text-cyan-400" />,
    href: "#"
  },
  {
    title: "Careers",
    description: "Join our team and help us build the future of finance. See open positions.",
    icon: <Briefcase className="h-8 w-8 text-cyan-400" />,
    href: "#"
  },
  {
    title: "Support",
    description: "Have questions? Get in touch with our support team for assistance.",
    icon: <Mail className="h-8 w-8 text-cyan-400" />,
    href: "#"
  },
    {
    title: "Blog",
    description: "Read our latest articles, insights, and company news on our official blog.",
    icon: <Rss className="h-8 w-8 text-cyan-400" />,
    href: "#"
  }
];

export default function MorePage() {
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
              <Link key={item} href={`/${item.toLowerCase()}`} className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${item.toLowerCase() === 'more' ? 'text-white' : ''}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300 ${item.toLowerCase() === 'more' ? 'w-full' : 'w-0'}`}></span>
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
                      <Link href="/brokers" className="text-xl text-gray-300 hover:text-white">Brokers</Link>
                      <Link href="/more" className="text-xl text-white">More</Link>
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
            More Resources
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Explore more about FinLight and how we are changing the financial landscape.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {moreLinks.map((link) => (
            <a href={link.href} key={link.title} className="block group">
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col h-full transition-all duration-300 group-hover:border-cyan-400/60 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                <CardHeader className="flex flex-row items-center gap-4">
                    {link.icon}
                    <CardTitle className="text-xl font-bold text-white">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-gray-300 text-base">{link.description}</CardDescription>
                </CardContent>
                </Card>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
