
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Bot, TrendingUp } from 'lucide-react';
import { runSalesAgent, type SalesAgentOutput } from '@/ai/flows/sales-agent';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleContext = `Product: FinLight AI Suite
Description: An AI-powered platform for financial analysis, including portfolio management, market sentiment analysis, and a robo-advisor.
Target Audience: Tech-savvy retail investors and independent financial advisors.
Pricing: $29/month for the Pro plan.
Unique Selling Proposition: We offer a more comprehensive set of AI tools than competitors at a lower price point.
`;

export default function SalesAutomationPage() {
  const [salesContext, setSalesContext] = useState(sampleContext);
  const [task, setTask] = useState('Write a brief, compelling cold email to a potential user who fits our target audience.');
  const [result, setResult] = useState<SalesAgentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunAgent = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await runSalesAgent({ salesContext, task });
      setResult(response);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`An error occurred while running the sales agent: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const examples = [
    "Draft a follow-up email for a user who attended our webinar but didn't sign up.",
    "Generate 5 engaging subject lines for an email campaign promoting our new Robo-Advisor feature.",
    "Create a short script for a sales call to a prospective financial advisor.",
    "List three potential lead qualification questions to ask on our pricing page.",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
        <header className="relative z-50 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FL</div>
                <div className="text-xl font-semibold text-white">FinLight</div>
            </Link>
            <Button asChild variant="outline" className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                <Link href="/dashboard">Dashboard</Link>
            </Button>
            </div>
      </header>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                 <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl flex items-center justify-center gap-4">
                    <TrendingUp className="h-12 w-12" /> Sales Automation Agent
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                    Your expert AI assistant for drafting emails, generating leads, and creating sales strategies.
                </p>
            </div>
            
          <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3"><Bot /> Interactive Demo</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Provide your sales context and a specific task to see the agent work its magic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-lg font-semibold mb-2 block">Sales Context</label>
                    <Textarea
                        value={salesContext}
                        onChange={(e) => setSalesContext(e.target.value)}
                        placeholder="Provide product details, target audience, pricing, etc."
                        className="bg-slate-800/60 border-cyan-400/30 min-h-[150px] text-base"
                    />
                </div>
                 <div>
                    <label className="text-lg font-semibold mb-2 block">Sales Task</label>
                    <Input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="e.g., 'Draft a follow-up email...'"
                        className="bg-slate-800/60 border-cyan-400/30 text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleRunAgent()}
                    />
                </div>
              <Button
                onClick={handleRunAgent}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
              >
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <><Sparkles className="mr-2 h-6 w-6" /> Run Sales Agent</>}
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <Card className="bg-slate-900/50 border-cyan-400/20">
                <CardHeader>
                    <CardTitle>Example Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-gray-300">
                        {examples.map((ex, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <Button variant="link" size="sm" className="text-cyan-400 text-left p-0 h-auto" onClick={() => setTask(ex)}>
                                    "{ex}"
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>

          {error && (
             <Alert variant="destructive" className="mt-8 bg-red-900/30 border-red-500/50 text-red-300">
                <AlertTitle className="text-red-400">Agent Execution Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {result && (
            <div className="mt-8">
              <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Sales Agent Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-gray-300 bg-slate-800/50 p-4 rounded-md">
                      <ReactMarkdown>{result.response}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
