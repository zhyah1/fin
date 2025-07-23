'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownRight, ArrowUpRight, DollarSign, Bitcoin, Landmark, Menu } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stockData = [
  { name: 'AAPL', value: 172.5, change: '+1.5%', changeType: 'increase' },
  { name: 'GOOGL', value: 139.8, change: '-0.8%', changeType: 'decrease' },
  { name: 'MSFT', value: 370.9, change: '+2.1%', changeType: 'increase' },
  { name: 'AMZN', value: 145.2, change: '-1.2%', changeType: 'decrease' },
  { name: 'TSLA', value: 240.1, change: '+5.3%', changeType: 'increase' },
];

const cryptoData = [
    { name: 'BTC', value: 42500, change: '+3.5%', changeType: 'increase', fullName: 'Bitcoin' },
    { name: 'ETH', value: 2300, change: '+2.8%', changeType: 'increase', fullName: 'Ethereum' },
    { name: 'SOL', value: 95.5, change: '-1.5%', changeType: 'decrease', fullName: 'Solana' },
    { name: 'XRP', value: 0.62, change: '+0.5%', changeType: 'increase', fullName: 'XRP' },
    { name: 'ADA', value: 0.45, change: '-2.1%', changeType: 'decrease', fullName: 'Cardano' },
];

const forexData = [
    { pair: 'EUR/USD', rate: 1.09, change: '+0.2%', changeType: 'increase' },
    { pair: 'USD/JPY', rate: 148.5, change: '-0.1%', changeType: 'decrease' },
    { pair: 'GBP/USD', rate: 1.27, change: '+0.4%', changeType: 'increase' },
    { pair: 'USD/CAD', rate: 1.35, change: '-0.3%', changeType: 'decrease' },
    { pair: 'AUD/USD', rate: 0.68, change: '+0.1%', changeType: 'increase' },
];

const marketPerformanceData = [
  { month: 'Jan', stocks: 12, crypto: 15, forex: 8 },
  { month: 'Feb', stocks: 19, crypto: 20, forex: 12 },
  { month: 'Mar', stocks: 3, crypto: 5, forex: 4 },
  { month: 'Apr', stocks: 10, crypto: 12, forex: 7 },
  { month: 'May', stocks: 15, crypto: 18, forex: 11 },
  { month: 'Jun', stocks: 8, crypto: 10, forex: 6 },
];

const chartConfig = {
    stocks: {
      label: "Stocks",
      color: "hsl(var(--primary))",
    },
    crypto: {
      label: "Crypto",
      color: "hsl(var(--accent-foreground))",
    },
    forex: {
        label: "Forex",
        color: "hsl(var(--secondary-foreground))",
    },
  }

export default function MarketsPage() {
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
              <Link key={item} href={`/${item.toLowerCase()}`} className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${item.toLowerCase() === 'markets' ? 'text-white' : ''}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300 ${item.toLowerCase() === 'markets' ? 'w-full' : 'w-0'}`}></span>
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
                      <Link href="/markets" className="text-xl text-white">Markets</Link>
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
            Market Overview
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Stay on top of the latest market trends across stocks, crypto, and forex.
          </p>
        </div>
        <div className="mt-16 max-w-7xl mx-auto">
            <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                    <CardDescription>Performance comparison across different markets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <BarChart data={marketPerformanceData} accessibilityLayer>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="stocks" fill="var(--color-stocks)" radius={4} />
                                <Bar dataKey="crypto" fill="var(--color-crypto)" radius={4} />
                                <Bar dataKey="forex" fill="var(--color-forex)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="mt-16 max-w-7xl mx-auto">
            <Tabs defaultValue="stocks" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/60">
                <TabsTrigger value="stocks">
                    <DollarSign className="h-5 w-5 mr-2"/>
                    Stocks
                </TabsTrigger>
                <TabsTrigger value="crypto">
                    <Bitcoin className="h-5 w-5 mr-2"/>
                    Cryptocurrencies
                </TabsTrigger>
                <TabsTrigger value="forex">
                    <Landmark className="h-5 w-5 mr-2"/>
                    Forex
                </TabsTrigger>
            </TabsList>
            <TabsContent value="stocks">
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                    <CardHeader>
                        <CardTitle>Top Stocks</CardTitle>
                        <CardDescription>Real-time stock market data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Ticker</TableHead>
                            <TableHead>Price (USD)</TableHead>
                            <TableHead>Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stockData.map((stock) => (
                            <TableRow key={stock.name}>
                                <TableCell className="font-medium">{stock.name}</TableCell>
                                <TableCell>${stock.value.toFixed(2)}</TableCell>
                                <TableCell className={`flex items-center ${stock.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                                {stock.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {stock.change}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="crypto">
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                    <CardHeader>
                        <CardTitle>Top Cryptocurrencies</CardTitle>
                        <CardDescription>The latest prices in the crypto world.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price (USD)</TableHead>
                            <TableHead>Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cryptoData.map((crypto) => (
                            <TableRow key={crypto.name}>
                                <TableCell>
                                    <div className="font-medium">{crypto.name}</div>
                                    <div className="text-sm text-gray-400">{crypto.fullName}</div>
                                </TableCell>
                                <TableCell>${crypto.value.toLocaleString()}</TableCell>
                                <TableCell className={`flex items-center ${crypto.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                                {crypto.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {crypto.change}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="forex">
                <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                    <CardHeader>
                        <CardTitle>Forex Rates</CardTitle>
                        <CardDescription>Major currency pair exchange rates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Pair</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead>Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {forexData.map((forex) => (
                            <TableRow key={forex.pair}>
                                <TableCell className="font-medium">{forex.pair}</TableCell>
                                <TableCell>{forex.rate.toFixed(3)}</TableCell>
                                <TableCell className={`flex items-center ${forex.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                                {forex.changeType === 'increase' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {forex.change}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
