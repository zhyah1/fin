
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, LifeBuoy, ArrowRight, BotMessageSquare, BrainCircuit, Users, BarChart3, DatabaseZap } from 'lucide-react';
import { runCustomerServiceAgent, type CustomerServiceAgentOutput } from '@/ai/flows/customer-service-agent';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const sampleContext = `**Ticket History:**
- User ID: 5678
- Product: FinLight Pro Tier
- Previous Interactions: 
  - #1234 (Resolved): "How do I set up my portfolio?"
  - #1298 (Open): "My sentiment analysis widget isn't loading."

**Knowledge Base Article:** "Troubleshooting Widget Issues"
- Check browser console for errors.
- Ensure third-party cookies are enabled.
- Clear application cache.
- Confirm API key has correct permissions.
`;

export default function CustomerServiceAgentPage() {
  const [ticketContext, setTicketContext] = useState(sampleContext);
  const [customerQuery, setCustomerQuery] = useState("It's been 2 hours and my sentiment widget is still broken. I've tried refreshing. What's next?");
  const [result, setResult] = useState<CustomerServiceAgentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunAgent = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await runCustomerServiceAgent({ ticketContext, customerQuery });
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
    { title: "Ticket Creation & Categorization", icon: <BotMessageSquare />, description: "Instantly categorizes incoming queries (e.g., Billing, Technical, General) using natural language understanding." },
    { title: "Instant, Contextual Responses", icon: <BrainCircuit />, description: "Analyzes ticket history and consults the knowledge base to provide immediate, relevant answers to common questions." },
    { title: "Sentiment Analysis", icon: <Users />, description: "Gauges customer sentiment in real-time to prioritize frustrated users and tailor the tone of the response." },
    { title: "Intelligent Escalation", icon: <ArrowRight />, description: "Knows when to hand off complex issues to a human agent, providing them with a full summary and suggested actions." },
    { title: "Automated Follow-ups", icon: <DatabaseZap />, description: "Checks in with customers after resolution to ensure satisfaction and gathers feedback to improve processes." },
    { title: "Analytics & Reporting", icon: <BarChart3 />, description: "Tracks key metrics like resolution time, customer satisfaction (CSAT), and common issues to provide actionable insights." },
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
                    <LifeBuoy className="h-12 w-12" /> Customer Service Agent
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                    Automate up to 70% of your support inquiries, providing instant, 24/7 resolutions and freeing up your team for high-impact issues.
                </p>
            </div>
            
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">The Modern Support Workflow, Reimagined</h2>
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
                Provide ticket context and a customer query to see the agent generate a response.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-lg font-semibold mb-2 block">Ticket Context & Knowledge Base</label>
                    <Textarea
                        value={ticketContext}
                        onChange={(e) => setTicketContext(e.target.value)}
                        placeholder="Provide ticket history, user data, and relevant knowledge base articles..."
                        className="bg-slate-800/60 border-cyan-400/30 min-h-[180px] text-base font-mono"
                    />
                </div>
                 <div>
                    <label className="text-lg font-semibold mb-2 block">Customer Query</label>
                    <Input
                        value={customerQuery}
                        onChange={(e) => setCustomerQuery(e.target.value)}
                        placeholder="e.g., 'My login isn't working on the mobile app.'"
                        className="bg-slate-800/60 border-cyan-400/30 text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleRunAgent()}
                    />
                </div>
              <Button
                onClick={handleRunAgent}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
              >
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <><Sparkles className="mr-2 h-6 w-6" /> Generate Response</>}
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
                  <CardTitle className="text-2xl">Agent's Recommended Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-gray-300 bg-slate-800/50 p-6 rounded-md">
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
