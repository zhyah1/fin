'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SpaceBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<any[]>([]);
  const [planets, setPlanets] = useState<any[]>([]);
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [nebulaClouds, setNebulaClouds] = useState<any[]>([]);
  const [cosmicDust, setCosmicDust] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate diverse star field
    setStars(Array.from({ length: 400 }, (_, i) => ({
      key: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.9 + 0.1,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: 2 + Math.random() * 3,
      color: ['bg-white', 'bg-blue-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100'][Math.floor(Math.random() * 5)],
      glowColor: ['white', 'blue', 'purple', 'pink', 'yellow'][Math.floor(Math.random() * 5)]
    })));

    // Generate floating planets
    setPlanets(Array.from({ length: 6 }, (_, i) => ({
      key: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: 40 + Math.random() * 80,
      color: ['from-blue-600', 'from-purple-600', 'from-red-600', 'from-green-600', 'from-orange-600', 'from-pink-600'][i],
      floatSpeed: 15 + Math.random() * 20,
      rotationSpeed: 20 + Math.random() * 30,
      opacity: 0.3 + Math.random() * 0.4
    })));

    // Generate asteroid belt
    setAsteroids(Array.from({ length: 50 }, (_, i) => ({
      key: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 8,
      speed: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      opacity: 0.4 + Math.random() * 0.4
    })));

    // Generate nebula clouds
    setNebulaClouds(Array.from({ length: 12 }, (_, i) => ({
      key: i,
      x: Math.random() * 90,
      y: Math.random() * 90,
      width: 200 + Math.random() * 300,
      height: 100 + Math.random() * 200,
      color: [
        'from-purple-600/20', 'from-blue-600/20', 'from-pink-600/20', 
        'from-indigo-600/20', 'from-cyan-600/20', 'from-violet-600/20'
      ][i % 6],
      rotation: Math.random() * 360,
      floatSpeed: 25 + Math.random() * 15,
      blur: ['blur-2xl', 'blur-3xl'][Math.floor(Math.random() * 2)]
    })));

    // Generate cosmic dust
    setCosmicDust(Array.from({ length: 100 }, (_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `dustFloat ${20 + Math.random() * 20}s linear infinite ${Math.random() * 10}s`
    })));
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-indigo-900"></div>
      
      {/* Animated nebula clouds */}
      {isMounted && <div className="absolute inset-0">
        {nebulaClouds.map(cloud => (
          <div
            key={cloud.key}
            className={`absolute bg-gradient-to-r ${cloud.color} via-transparent to-transparent rounded-full ${cloud.blur} opacity-60`}
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              width: `${cloud.width}px`,
              height: `${cloud.height}px`,
              transform: `rotate(${cloud.rotation}deg)`,
              animation: `nebulaDrift ${cloud.floatSpeed}s ease-in-out infinite`
            }}
          />
        ))}
      </div>}

      {/* Floating planets */}
      {isMounted && <div className="absolute inset-0">
        {planets.map(planet => (
          <div
            key={planet.key}
            className="absolute rounded-full"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              animation: `planetFloat ${planet.floatSpeed}s ease-in-out infinite`,
              opacity: planet.opacity
            }}
          >
            <div 
              className={`w-full h-full rounded-full bg-gradient-radial ${planet.color} via-transparent to-transparent shadow-2xl`}
              style={{
                animation: `planetRotate ${planet.rotationSpeed}s linear infinite`,
                boxShadow: `0 0 ${planet.size}px ${planet.color.split('-')[1]}/30`
              }}
            />
            {/* Planet rings for some planets */}
            {planet.key % 3 === 0 && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
                style={{
                  width: `${planet.size * 1.8}px`,
                  height: `${planet.size * 0.3}px`,
                  animation: `ringRotate ${planet.rotationSpeed * 0.7}s linear infinite`
                }}
              />
            )}
          </div>
        ))}
      </div>}

      {/* Asteroid belt */}
      {isMounted && <div className="absolute inset-0">
        {asteroids.map(asteroid => (
          <div
            key={asteroid.key}
            className="absolute bg-gray-400 rounded-full opacity-70"
            style={{
              left: `${asteroid.x}%`,
              top: `${asteroid.y}%`,
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              animation: `asteroidDrift ${asteroid.speed}s linear infinite ${asteroid.delay}s`,
              opacity: asteroid.opacity,
              boxShadow: '0 0 4px rgba(156, 163, 175, 0.5)'
            }}
          />
        ))}
      </div>}

      {/* Enhanced star field */}
      {isMounted && <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.key}
            className={`absolute rounded-full ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `starTwinkle ${star.twinkleDuration}s ease-in-out infinite ${star.twinkleDelay}s`,
              boxShadow: `0 0 ${star.size * 4}px ${star.glowColor === 'white' ? 'rgba(255, 255, 255, 0.8)' : 
                star.glowColor === 'blue' ? 'rgba(59, 130, 246, 0.8)' :
                star.glowColor === 'purple' ? 'rgba(147, 51, 234, 0.8)' :
                star.glowColor === 'pink' ? 'rgba(236, 72, 153, 0.8)' :
                'rgba(250, 204, 21, 0.8)'}`
            }}
          />
        ))}
      </div>}

      {/* Shooting stars with trails */}
      {isMounted && <div className="absolute inset-0">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="absolute opacity-0"
            style={{
              left: `${10 + i * 15}%`,
              top: `${5 + i * 10}%`,
              animation: `shootingStarTrail ${4 + i}s linear infinite ${i * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full shadow-lg shadow-white/70"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-white via-blue-200 to-transparent transform -translate-y-1/2 origin-left -rotate-45 blur-sm"></div>
          </div>
        ))}
      </div>}

      {/* Solar flares */}
      {isMounted && <div className="absolute top-10 right-20 w-32 h-32 opacity-40">
        <div className="w-full h-full bg-gradient-radial from-orange-400 via-red-500 to-transparent rounded-full animate-pulse blur-xl"></div>
      </div>}
      {isMounted && <div className="absolute bottom-20 left-16 w-24 h-24 opacity-30">
        <div className="w-full h-full bg-gradient-radial from-yellow-400 via-orange-500 to-transparent rounded-full animate-pulse blur-lg"></div>
      </div>}

      {/* Cosmic dust particles */}
       {isMounted && <div className="absolute inset-0">
        {cosmicDust.map((dust, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: dust.left,
              top: dust.top,
              animation: dust.animation
            }}
          />
        ))}
      </div>}

      {/* Atmospheric glow layers */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent"></div>
    </div>
  );
};

const marketPerformanceData = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 1900 },
    { month: 'Mar', value: 1500 },
    { month: 'Apr', value: 2200 },
    { month: 'May', value: 1800 },
    { month: 'Jun', value: 2500 },
    { month: 'Jul', value: 2800 },
    { month: 'Aug', value: 3200 },
    { month: 'Sep', value: 3000 },
    { month: 'Oct', value: 3500 },
    { month: 'Nov', value: 3800 },
    { month: 'Dec', value: 4200 },
  ];
  
  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(142.1 76.2% 41.2%)", // green-500
    },
  };

export default function SpaceFinLightLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Beautiful Space Background */}
      <SpaceBackground />
      
      {/* Header with enhanced space theme */}
      <header className="relative z-50 px-4 sm:px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FL</div>
            <div className="text-xl font-semibold text-white">FinLight</div>
          </Link>
          
          <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link href="/product" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              {['Community', 'Markets', 'Brokers', 'More'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:bg-white/15 backdrop-blur-md transition-all duration-300 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xs">
                ⌘K
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
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
                      <Link href="/more" className="text-xl text-gray-300 hover:text-white">More</Link>
                      <div className="relative w-full max-w-xs mt-8">
                          <input
                              type="text"
                              placeholder="Search..."
                              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:bg-white/15 backdrop-blur-md text-base"
                          />
                           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm">
                             ⌘K
                           </div>
                      </div>
                      <Button asChild className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-lg">
                          <Link href="/get-started">Get started</Link>
                      </Button>
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
            <span className="block text-white mb-4 animate-fade-in-up">
            Research first
            </span>
            <span className="block text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              / Invest smart.
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          Master the markets with intelligent research tools and data-driven insights.
          </p>
          
          <div className="animate-fade-in-up space-y-6" style={{animationDelay: '0.6s'}}>
            <Button asChild className="px-12 py-5 bg-white text-black rounded-full text-xl font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-white/30 transform group">
                <Link href="/get-started" className="flex items-center gap-3">
                    Get started for free
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
            </Button>
            
            <p className="text-sm text-gray-400">
              $0 forever, no credit card needed ❤️
            </p>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* New Market Section */}
      <section className="relative py-20 px-6 bg-black">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/30 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-900/30 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Where the world does markets
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
                Join 100 million traders and investors taking the future into their own hands.
            </p>
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20 border border-cyan-400/20 p-4 md:p-8 bg-slate-900/50">
            <ChartContainer config={chartConfig} className="w-full h-[400px] md:h-[600px]">
                <AreaChart
                    accessibilityLayer
                    data={marketPerformanceData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        stroke="rgba(255, 255, 255, 0.7)"
                    />
                    <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        stroke="rgba(255, 255, 255, 0.7)"
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" labelClassName="text-black" />}
                        
                    />
                    <defs>
                        <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-value)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-value)"
                            stopOpacity={0.1}
                        />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="value"
                        type="natural"
                        fill="url(#fillValue)"
                        stroke="var(--color-value)"
                        stackId="a"
                    />
                </AreaChart>
                </ChartContainer>
            </div>
        </div>
      </section>

      {/* Enhanced Custom CSS animations */}
      <style jsx>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        
        @keyframes planetFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(20px) translateX(5px); }
        }
        
        @keyframes planetRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ringRotate {
          0% { transform: translateX(-50%) translateY(-50%) rotateX(75deg) rotateZ(0deg); }
          100% { transform: translateX(-50%) translateY(-50%) rotateX(75deg) rotateZ(360deg); }
        }
        
        @keyframes asteroidDrift {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes nebulaDrift {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-40px) translateX(20px) rotate(90deg); }
          50% { transform: translateY(-20px) translateX(-30px) rotate(180deg); }
          75% { transform: translateY(30px) translateX(15px) rotate(270deg); }
        }
        
        @keyframes shootingStarTrail {
          0% { 
            opacity: 0; 
            transform: translateX(-200px) translateY(-200px) scale(0); 
          }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { 
            opacity: 0; 
            transform: translateX(500px) translateY(500px) scale(0); 
          }
        }
        
        @keyframes dustFloat {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
