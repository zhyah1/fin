
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, BarChart3, BotMessageSquare, BrainCircuit, Users, DatabaseZap, FileSearch } from 'lucide-react';
import { runDataAnalysisAgent, type DataAnalysisAgentOutput } from '@/ai/flows/data-analysis-agent';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleDataContext = `
Product,Category,UnitsSold,Revenue
"AI Portfolio Analyst",SaaS,1500,75000
"Market Sentiment AI",SaaS,2500,125000
"Robo-Advisor",SaaS,1000,50000
"Data Analysis Agent",SaaS,800,40000
"Predictive Market Trends",SaaS,1200,60000
`;

const sampleAnalysisRequest = "What are the key trends in this sales data? Summarize the performance of each product and identify the top performer by revenue.";


export default function DataAnalysisAgentPage() {
  const [dataContext, setDataContext] = useState(sampleDataContext);
  const [analysisRequest, setAnalysisRequest] = useState(sampleAnalysisRequest);
  const [result, setResult] = useState<DataAnalysisAgentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunAgent = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await runDataAnalysisAgent({ dataContext, analysisRequest });
      setResult(response);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`An error occurred while running the agent: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const workflowSteps = [
    { title: "Data Ingestion", icon: <DatabaseZap />, description: "Connect to various data sources like CSVs, databases, or paste raw data directly." },
    { title: "Natural Language Query", icon: <FileSearch />, description: "Ask questions about your data in plain English, just like you'd ask a human analyst." },
    { title: "Automated Analysis", icon: <BrainCircuit />, description: "The AI understands your request, performs the necessary calculations, and identifies patterns." },
    { title: "Insight Generation", icon: <Sparkles />, description: "Goes beyond numbers to provide summaries, trend analysis, and actionable insights." },
    { title: "Visual Reporting", icon: <BarChart3 />, description: "Generates clear, readable reports with tables and summaries to explain the findings." },
    { title: "Conversational Follow-up", icon: <BotMessageSquare />, description: "Ask follow-up questions to drill down deeper into the data without starting over." },
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
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                 <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl flex items-center justify-center gap-4">
                    <BarChart3 className="h-12 w-12" /> Data Analysis Agent
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                    Turn raw data into actionable insights. Simply provide your data, ask a question, and let our AI do the heavy lifting.
                </p>
            </div>
            
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">From Raw Data to Insightful Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflowSteps.map(step => (
                        <Card key={step.title} className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col">
                           <CardHeader className="flex flex-row items-center gap-4">
                               <div className="text-cyan-400">{step.icon}</div>
                               <CardTitle className="text-lg">{step.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <p className="text-gray-300">{step.description}</p>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>


          <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Interactive Demo</CardTitle>
              <CardDescription className="text-center text-lg text-gray-300">
                Provide your data and a question to see the agent generate an analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-lg font-semibold mb-2 block">Your Data (e.g., CSV, JSON, or text)</label>
                    <Textarea
                        value={dataContext}
                        onChange={(e) => setDataContext(e.target.value)}
                        placeholder="Paste your data here..."
                        className="bg-slate-800/60 border-cyan-400/30 min-h-[180px] text-base font-mono"
                    />
                </div>
                 <div>
                    <label className="text-lg font-semibold mb-2 block">What do you want to know?</label>
                    <Input
                        value={analysisRequest}
                        onChange={(e) => setAnalysisRequest(e.target.value)}
                        placeholder="e.g., 'What is the total revenue?' or 'Which product is the most popular?'"
                        className="bg-slate-800/60 border-cyan-400/30 text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleRunAgent()}
                    />
                </div>
              <Button
                onClick={handleRunAgent}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
              >
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <><Sparkles className="mr-2 h-6 w-6" /> Analyze Data</>}
              </Button>
            </CardContent>
          </Card>
          
          {error && (
             <Alert variant="destructive" className="mt-8 bg-red-900/30 border-red-500/50 text-red-300">
                <AlertTitle className="text-red-400">Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {result && (
            <div className="mt-8">
              <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Analysis Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-gray-300 bg-slate-800/50 p-6 rounded-md">
                      <ReactMarkdown>{result.analysis}</ReactMarkdown>
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
