
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Workflow, Bot } from 'lucide-react';
import { runAgent, type BusinessAgentOutput } from '@/ai/flows/business-agent';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleContext = `Business: FinLight, a SaaS company providing AI-powered financial tools.
Products: AI Portfolio Analyst, Market Sentiment AI, Robo-Advisor.
Target Audience: Retail investors, day traders, and financial enthusiasts.
Recent Sales Data: Q1 2024 - 5,000 new users, $150,000 revenue. Q2 2024 - 7,500 new users, $225,000 revenue.
Customer Feedback: "The portfolio analyst is amazing, but I wish the interface was more customizable." - User ID 1234
`;

export default function BusinessAgentPage() {
  const [businessContext, setBusinessContext] = useState(sampleContext);
  const [request, setRequest] = useState('Write a sales email to a potential customer who visited our website but did not sign up.');
  const [result, setResult] = useState<BusinessAgentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunAgent = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await runAgent({ businessContext, request });
      setResult(response);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`An error occurred while running the agent: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const capabilities = [
    { title: "Sales Automation", description: "Draft compelling sales emails, generate leads, and create sales reports." },
    { title: "Customer Service", description: "Answer customer questions, resolve issues, and summarize feedback." },
    { title: "Data Analysis", description: "Analyze sales data, identify trends, and generate business insights." },
    { title: "Reporting", description: "Create weekly sales summaries, marketing campaign reports, and financial overviews." },
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
                    <Workflow className="h-12 w-12" /> Business Process Agent
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                    Your versatile AI assistant to automate sales, customer service, data analysis, and reporting.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {capabilities.map(cap => (
                    <Card key={cap.title} className="bg-slate-900/50 border-cyan-400/20">
                        <CardHeader>
                            <CardTitle className="text-xl">{cap.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">{cap.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

          <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center flex items-center justify-center gap-3"><Bot /> Interactive Demo</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Provide your business context and a request to see the agent in action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-lg font-semibold mb-2 block">Business Context</label>
                    <Textarea
                        value={businessContext}
                        onChange={(e) => setBusinessContext(e.target.value)}
                        placeholder="Provide details about your business..."
                        className="bg-slate-800/60 border-cyan-400/30 min-h-[150px] text-base"
                    />
                </div>
                 <div>
                    <label className="text-lg font-semibold mb-2 block">Your Request</label>
                    <Input
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="e.g., 'Draft a Q2 sales report summary'"
                        className="bg-slate-800/60 border-cyan-400/30 text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleRunAgent()}
                    />
                </div>
              <Button
                onClick={handleRunAgent}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
              >
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <><Sparkles className="mr-2 h-6 w-6" /> Run Agent</>}
              </Button>
            </CardContent>
          </Card>
          
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
                  <CardTitle className="text-2xl">Agent Response</CardTitle>
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
