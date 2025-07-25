
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Zap, Cpu, Filter, Star, Mail, Linkedin, Calendar, Database, BarChart, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const workflowSteps = [
    { title: "Lead Capture & Processing", icon: <Zap />, description: "Ingests leads from web forms, emails, LinkedIn, and APIs in real-time." },
    { title: "Lead Enrichment & Research", icon: <Cpu />, description: "Automatically researches leads, gathering company info, tech stack, and contact details." },
    { title: "Lead Scoring & Qualification", icon: <Filter />, description: "Scores leads based on custom rules to prioritize high-value prospects." },
    { title: "Personalized Outreach", icon: <Mail />, description: "Generates hyper-personalized emails using enriched data and dynamic templates." },
    { title: "Multi-Channel Follow-up", icon: <GitBranch />, description: "Executes automated follow-up sequences across email and LinkedIn." },
    { title: "Response Handling", icon: <Star />, description: "Classifies responses and manages conversations, handling objections and scheduling meetings." },
    { title: "Meeting Scheduling & Handoff", icon: <Calendar />, description: "Manages calendars, sends invites, and generates pre-meeting briefs for sales reps." },
    { title: "CRM Integration", icon: <Database />, description: "Keeps your CRM perfectly in sync, logging all activities and updating records automatically." },
    { title: "Learning & Optimization", icon: <BarChart />, description: "Continuously tracks performance, A/B tests campaigns, and optimizes its own strategies." },
];

const keyBenefits = {
    salesTeams: [
        "5x more qualified conversations per rep",
        "80% reduction in manual research time",
        "24/7 lead response capability",
        "No leads fall through the cracks",
        "Data-driven insights for improvement"
    ],
    companies: [
        "40-60% increase in pipeline generation",
        "25-35% improvement in conversion rates",
        "Scalable growth without proportional hiring",
        "Better lead qualification & resource allocation",
        "Comprehensive tracking and ROI measurement"
    ]
};

const emailExample = `
Subject: Re: Your cloud migration inquiry - TechCorp's scaling solution

Hi John,

I noticed TechCorp's recent $10M Series B and your team's expansion - congratulations! With 200+ employees now, you're probably hitting those scaling bottlenecks that made legacy infrastructure painful.

Given your current AWS setup, you're likely dealing with:
- Multi-cloud complexity as you grow
- Security compliance for enterprise clients
- DevOps team stretched thin managing hybrid environment

We helped DataFlow Inc (similar size, same challenges) reduce infrastructure management overhead by 60% while improving security posture.

Worth a 15-minute conversation? I can show you their before/after setup.

Best regards,
[Sales Agent]

P.S. Saw your team's hiring spree for DevOps - smart move for the growth phase!
`;

const apiExample = `
// Webhook for Real-time Lead Processing
POST /api/v1/leads/new
{
  "lead_data": {
    "name": "John Smith",
    "email": "john@techcorp.com",
    "company": "TechCorp Inc",
    "message": "Interested in cloud migration"
  },
  "source": "website_form",
  "campaign_id": "cloud_migration_2024"
}

// CRM Synchronization
PUT /api/v1/leads/{lead_id}/assign_rep
{
  "rep_id": "sales_rep_123",
  "handoff_notes": "Hot lead, score 88. Mentioned scaling issues."
}
`;


export default function SalesAutomationPage() {

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
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                 <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Automate Your Entire Sales Funnel with AI
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                    From lead capture to close, our AI agent manages the full sales cycle, so your team can focus on what they do best: selling.
                </p>
                 <Button size="lg" className="mt-8 px-8 py-4 text-lg font-bold bg-white text-black rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-white/30 transform group">
                     Request a Demo <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                 </Button>
            </div>
            
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">The Complete Sales Workflow, Automated</h2>
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

            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Dynamic, Personalized Outreach at Scale</h2>
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white overflow-hidden">
                    <CardHeader>
                        <CardTitle>Generated Email Example</CardTitle>
                        <CardDescription>The AI crafts unique emails by analyzing all collected data points.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-black/50 p-4 rounded-md">
                            <pre className="whitespace-pre-wrap text-sm text-gray-200">
                                <code>{emailExample}</code>
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
                <div className="grid md:grid-cols-2 gap-8">
                     <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                         <CardHeader>
                             <CardTitle className="text-2xl">For Your Sales Team</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <ul className="space-y-3">
                                 {keyBenefits.salesTeams.map(benefit => (
                                     <li key={benefit} className="flex items-center gap-3">
                                         <CheckSquare className="h-5 w-5 text-green-400" />
                                         <span className="text-gray-300">{benefit}</span>
                                     </li>
                                 ))}
                             </ul>
                         </CardContent>
                     </Card>
                      <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                         <CardHeader>
                             <CardTitle className="text-2xl">For Your Business</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <ul className="space-y-3">
                                 {keyBenefits.companies.map(benefit => (
                                     <li key={benefit} className="flex items-center gap-3">
                                         <CheckSquare className="h-5 w-5 text-green-400" />
                                         <span className="text-gray-300">{benefit}</span>
                                     </li>
                                 ))}
                             </ul>
                         </CardContent>
                     </Card>
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-center mb-12">Seamless API & CRM Integration</h2>
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white overflow-hidden">
                    <CardHeader>
                        <CardTitle>API Integration Points</CardTitle>
                        <CardDescription>Integrate the agent directly into your existing systems with simple webhooks and API calls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="bg-black/50 p-4 rounded-md">
                            <pre className="whitespace-pre-wrap text-sm text-gray-200">
                                <code>{apiExample}</code>
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

    