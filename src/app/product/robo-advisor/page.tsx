
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, PieChart as PieChartIcon, CheckSquare, BarChart2 } from 'lucide-react';
import { generateAdvice } from '@/ai/flows/robo-advisor';
import type { RoboAdvisorOutput, RoboAdvisorInput } from '@/ai/schemas/robo-advisor';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoboAdvisorInputSchema } from '@/ai/schemas/robo-advisor';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ASSET_COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const ETF_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];


export default function RoboAdvisorPage() {
    const [advice, setAdvice] = useState<RoboAdvisorOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RoboAdvisorInput>({
        resolver: zodResolver(RoboAdvisorInputSchema),
        defaultValues: {
            age: 30,
            annualIncome: 75000,
            investmentHorizon: 20,
            riskTolerance: 'Medium',
        },
    });

    const handleGenerateAdvice = async (values: RoboAdvisorInput) => {
        setIsLoading(true);
        setAdvice(null);
        setError(null);
        try {
            const result = await generateAdvice(values);
            setAdvice(result);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Failed to generate advice: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const allocationData = advice ? [
        { name: 'Stocks', value: advice.assetAllocation.stocks },
        { name: 'Bonds', value: advice.assetAllocation.bonds },
        { name: 'Cash', value: advice.assetAllocation.cash },
    ] : [];
    
    const etfAllocationData = advice ? advice.recommendedETFs : [];

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
                    <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                        <CardHeader>
                            <CardTitle className="text-3xl text-center">AI Robo-Advisor</CardTitle>
                            <CardDescription className="text-center text-lg text-gray-300">
                                Get a personalized investment plan in seconds. Tell us about yourself to get started.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleGenerateAdvice)} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Age</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-slate-800/60 border-cyan-400/30" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="annualIncome"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Annual Income (USD)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-slate-800/60 border-cyan-400/30" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                     <FormField
                                        control={form.control}
                                        name="investmentHorizon"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Investment Horizon (Years): {field.value}</FormLabel>
                                                <FormControl>
                                                    <Slider
                                                        value={[field.value]}
                                                        onValueChange={(value) => field.onChange(value[0])}
                                                        min={1}
                                                        max={50}
                                                        step={1}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="riskTolerance"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Risk Tolerance</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-slate-800/60 border-cyan-400/30">
                                                            <SelectValue placeholder="Select your risk tolerance" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Low">Low - I prefer to preserve my capital.</SelectItem>
                                                        <SelectItem value="Medium">Medium - I'm willing to take on some risk for moderate growth.</SelectItem>
                                                        <SelectItem value="High">High - I'm seeking high growth and can tolerate significant drawdowns.</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg py-6"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Generate My Plan'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {error && (
                        <Alert variant="destructive" className="mt-8 bg-red-900/30 border-red-500/50 text-red-300">
                           <AlertTitle className="text-red-400">Analysis Failed</AlertTitle>
                           <AlertDescription>{error}</AlertDescription>
                         </Alert>
                    )}

                    {advice && (
                        <div className="mt-8 space-y-8">
                            <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2"><PieChartIcon /> Asset Allocation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full h-[300px]">
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                                                <Legend />
                                                <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                                    {allocationData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={ASSET_COLORS[index % ASSET_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2"><CheckSquare /> Recommended ETFs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full h-[400px] mb-8">
                                        <ResponsiveContainer>
                                            <BarChart data={etfAllocationData} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                                <XAxis type="number" domain={[0, 100]} stroke="#888" tickFormatter={(value) => `${value}%`} />
                                                <YAxis type="category" dataKey="ticker" stroke="#888" width={80} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            const data = payload[0].payload;
                                                            return (
                                                                <div className="bg-slate-800 p-3 rounded-md border border-cyan-400/30 text-sm">
                                                                    <p className="font-bold">{`${data.ticker} (${data.name})`}</p>
                                                                    <p>Allocation: {data.allocation}%</p>
                                                                    <p className="mt-2 text-gray-400 max-w-xs">{data.rationale}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Bar dataKey="allocation" name="Allocation" fill="url(#etfGradient)" radius={[0, 4, 4, 0]}>
                                                    {etfAllocationData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={ETF_COLORS[index % ETF_COLORS.length]} />
                                                    ))}
                                                </Bar>
                                                 <defs>
                                                    <linearGradient id="etfGradient" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="#8884d8" />
                                                        <stop offset="100%" stopColor="#82ca9d" />
                                                    </linearGradient>
                                                </defs>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <ul className="space-y-4">
                                        {advice.recommendedETFs.map(etf => (
                                            <li key={etf.ticker} className="p-3 bg-slate-800/50 rounded-md">
                                                <div className="font-bold">{etf.ticker} - {etf.name} ({etf.allocation}%)</div>
                                                <p className="text-sm text-gray-300">{etf.rationale}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Investment Plan Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-invert max-w-none text-gray-300">
                                    <ReactMarkdown>{advice.summary}</ReactMarkdown>
                                </CardContent>
                            </Card>

                             <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2"><BarChart2 /> Projected Growth</CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-invert max-w-none text-gray-300">
                                    <ReactMarkdown>{advice.projectedGrowth}</ReactMarkdown>
                                </CardContent>
                            </Card>

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
