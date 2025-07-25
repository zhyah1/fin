// Fixed DashboardPage component
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CandlestickChart, Scale, Bot, Banknote, ShieldCheck, LogOut, MessageCircle, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Chat } from '@/components/chat';

export default function DashboardPage() {
  const products = [
    {
      title: "AI Portfolio Analyst",
      description: "Get deep insights into your investment portfolio. Our AI analyzes your holdings, identifies risks, and suggests opportunities for growth.",
      icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />,
      gradient: "from-cyan-900 via-slate-900 to-slate-900"
    },
    {
      title: "Market Sentiment AI",
      description: "Stay ahead of market trends by understanding the sentiment. We analyze news, social media, and financial reports in real-time.",
      icon: <CandlestickChart className="h-8 w-8 text-cyan-400" />,
      gradient: "from-blue-900 via-slate-900 to-slate-900"
    },
    {
      title: "Robo-Advisor",
      description: "Automated, algorithm-driven financial planning services with little to no human supervision. Your personal AI financial guide.",
      icon: <Bot className="h-8 w-8 text-cyan-400" />,
      gradient: "from-indigo-900 via-slate-900 to-slate-900"
    },
    {
      title: "Predictive Market Trends",
      description: "Leverage machine learning to forecast market movements. Get data-driven predictions to make smarter investment decisions.",
      icon: <Scale className="h-8 w-8 text-cyan-400" />,
      gradient: "from-purple-900 via-slate-900 to-slate-900"
    },
    {
        title: "Fraud Detection AI",
        description: "Protect your assets with our real-time fraud detection system. Our AI constantly monitors transactions for suspicious activity.",
        icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
        gradient: "from-red-900/80 via-slate-900 to-slate-900"
    },
    {
        title: "AI-Powered Credit Scoring",
        description: "A more inclusive and accurate credit scoring model using AI to assess creditworthiness based on a wider range of data.",
        icon: <Banknote className="h-8 w-8 text-cyan-400" />,
        gradient: "from-emerald-900 via-slate-900 to-slate-900"
    },
    {
      title: "Business Process Agents",
      description: "Automate sales, customer service, data analysis, and reporting with a single, powerful AI agent.",
      icon: <Workflow className="h-8 w-8 text-cyan-400" />,
      gradient: "from-teal-900 via-slate-900 to-slate-900"
    }
  ];

  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.replace('/get-started');
        } else {
          setUser(session.user);
          setIsLoading(false);
        }
      }
    );

    const getInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if(!session) {
             router.replace('/get-started');
        } else {
            setUser(session.user);
            setIsLoading(false);
        }
    }
    getInitialSession();


    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/get-started');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-black text-white">
       <header className="relative z-50 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-white">
            Dashboard
          </div>
          <div className="flex items-center gap-4">
            <Chat />
             <p className="text-gray-300 hidden sm:block">Welcome, {user.email}</p>
            <Button onClick={handleSignOut} variant="outline" className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your AI-Powered Financial Tools
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Leverage the power of artificial intelligence to make smarter financial decisions.
          </p>
        </div>
        <div className="mt-16 max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product) => (
            <Card key={product.title} className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col overflow-hidden transition-all duration-300 hover:border-cyan-400/60 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
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
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
