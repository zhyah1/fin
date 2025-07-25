
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CandlestickChart, Scale, Bot, Banknote, ShieldCheck, Menu, Workflow } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductPage() {
  const products = [
    {
      title: "AI Portfolio Analyst",
      description: "Get deep insights into your investment portfolio. Our AI analyzes your holdings, identifies risks, and suggests opportunities for growth.",
      icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />,
      gradient: "from-cyan-900 via-slate-900 to-slate-900",
      href: "/product/portfolio-analyst"
    },
    {
      title: "Market Sentiment AI",
      description: "Stay ahead of market trends by understanding the sentiment. We analyze news, social media, and financial reports in real-time.",
      icon: <CandlestickChart className="h-8 w-8 text-cyan-400" />,
      gradient: "from-blue-900 via-slate-900 to-slate-900",
      href: "/product/market-sentiment"
    },
    {
      title: "Robo-Advisor",
      description: "Automated, algorithm-driven financial planning services with little to no human supervision. Your personal AI financial guide.",
      icon: <Bot className="h-8 w-8 text-cyan-400" />,
      gradient: "from-indigo-900 via-slate-900 to-slate-900",
      href: "/product/robo-advisor"
    },
    {
      title: "Predictive Market Trends",
      description: "Leverage machine learning to forecast market movements. Get data-driven predictions to make smarter investment decisions.",
      icon: <Scale className="h-8 w-8 text-cyan-400" />,
      gradient: "from-purple-900 via-slate-900 to-slate-900",
      href: "#"
    },
    {
        title: "Fraud Detection AI",
        description: "Protect your assets with our real-time fraud detection system. Our AI constantly monitors transactions for suspicious activity.",
        icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
        gradient: "from-red-900/80 via-slate-900 to-slate-900",
        href: "#"
    },
    {
        title: "AI-Powered Credit Scoring",
        description: "A more inclusive and accurate credit scoring model using AI to assess creditworthiness based on a wider range of data.",
        icon: <Banknote className="h-8 w-8 text-cyan-400" />,
        gradient: "from-emerald-900 via-slate-900 to-slate-900",
        href: "#"
    },
    {
      title: "Business Process Agents",
      description: "Automate sales, customer service, data analysis, and reporting with a single, powerful AI agent.",
      icon: <Workflow className="h-8 w-8 text-cyan-400" />,
      gradient: "from-teal-900 via-slate-900 to-slate-900",
      href: "#"
    }
  ];

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
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></span>
            </Link>
            {['Community', 'Markets', 'Brokers', 'More'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
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
                      <Link href="/product" className="text-xl text-white">Products</Link>
                      <Link href="/community" className="text-xl text-gray-300 hover:text-white">Community</Link>
                      <Link href="/markets" className="text-xl text-gray-300 hover:text-white">Markets</Link>
                      <Link href="/brokers" className="text-xl text-gray-300 hover:text-white">Brokers</Link>
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
            Explore Our AI-Powered Financial Tools
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Leverage the power of artificial intelligence to make smarter financial decisions.
          </p>
        </div>
        <div className="mt-16 max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product) => (
            <Card key={product.title} className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col overflow-hidden transition-all duration-300 hover:border-cyan-400/60 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <Link href={product.href || '#'} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="flex-shrink-0">{product.icon}</div>
                        <div>
                        <CardTitle className="text-xl font-bold text-white">{product.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="aspect-video relative mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-md`}></div>
                        </div>
                        <CardDescription className="text-gray-300 text-base">{product.description}</CardDescription>
                    </CardContent>
                </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
