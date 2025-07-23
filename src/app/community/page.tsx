'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, MessageSquare, Rss, ThumbsUp, UserPlus, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const testimonials = [
  {
    name: 'Alex Johnson',
    handle: '@alexj',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'FinLight has revolutionized my trading strategy. The community is incredibly supportive and the insights are top-notch!',
    likes: 120,
    comments: 15,
  },
  {
    name: 'Samantha Bee',
    handle: '@samanthab',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'The Market Sentiment AI is a game-changer. I\'ve made more informed decisions in the last month than in the past year.',
    likes: 250,
    comments: 32,
  },
  {
    name: 'Carlos Gomez',
    handle: '@carlosg',
    avatar: 'https://placehold.co/100x100.png',
    testimonial: 'The discussions here are invaluable. Learning from experienced traders in real-time is something you can\'t get anywhere else.',
    likes: 180,
    comments: 22,
  },
];

const discussions = [
    {
        title: 'Future of AI in Fintech',
        author: 'Jane Doe',
        authorHandle: '@janed',
        participants: 45,
        lastPost: '5m ago'
    },
    {
        title: 'Best long-term crypto holds?',
        author: 'Mike Ross',
        authorHandle: '@miker',
        participants: 120,
        lastPost: '12m ago'
    },
    {
        title: 'Interpreting the latest Fed announcement',
        author: 'Sarah Connor',
        authorHandle: '@sarahc',
        participants: 78,
        lastPost: '2h ago'
    }
]

const stats = [
    { label: 'Active Members', value: '150,000+', icon: <Users className="h-8 w-8 text-cyan-400"/> },
    { label: 'Daily Discussions', value: '5,000+', icon: <MessageSquare className="h-8 w-8 text-cyan-400"/> },
    { label: 'Shared Strategies', value: '1,200+', icon: <ThumbsUp className="h-8 w-8 text-cyan-400"/> },
    { label: 'Live Feeds', value: '50+', icon: <Rss className="h-8 w-8 text-cyan-400"/> },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
       <header className="relative z-50 px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">FL</div>
            <div className="text-xl font-semibold text-white">FinLight</div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="/product" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            {['Community', 'Markets', 'Brokers', 'More'].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group ${item.toLowerCase() === 'community' ? 'text-white' : ''}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300 ${item.toLowerCase() === 'community' ? 'w-full' : 'w-0'}`}></span>
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4 ml-8">
            <div className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">🌐 EN</div>
            <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">👤</div>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transform">
              Get started
            </button>
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
                  <nav className="flex flex-col items-center gap-6 mt-12">
                      <a href="/product" className="text-xl text-gray-300 hover:text-white">Products</a>
                      <a href="/community" className="text-xl text-white">Community</a>
                      <a href="/markets" className="text-xl text-gray-300 hover:text-white">Markets</a>
                      <a href="/brokers" className="text-xl text-gray-300 hover:text-white">Brokers</a>
                      <a href="/more" className="text-xl text-gray-300 hover:text-white">More</a>
                      <Button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold text-lg">
                          Get started
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
            Join the FinLight Community
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            Connect with thousands of traders, share insights, and learn from the best. Our community is the heart of our platform.
          </p>
          <Button className="mt-8 px-8 py-4 text-lg font-bold bg-white text-black rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-white/30 transform group">
            <UserPlus className="h-6 w-6 mr-3"/>
            Become a Member
          </Button>
        </div>

        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
                <Card key={stat.label} className="bg-slate-900/50 border-cyan-400/20 text-white text-center p-6">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-gray-400">{stat.label}</p>
                </Card>
            ))}
        </div>

        <div className="mt-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Members Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.handle} className="bg-slate-900/50 border-cyan-400/20 text-white flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <p className="text-sm text-cyan-400">{testimonial.handle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-300">{testimonial.testimonial}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-gray-400">
                    <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5"/> {testimonial.likes}
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5"/> {testimonial.comments}
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-20 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Hot Discussions</h2>
            <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                <CardContent className="p-0">
                    <ul className="divide-y divide-cyan-400/20">
                       {discussions.map(discussion => (
                            <li key={discussion.title} className="p-6 hover:bg-slate-900 transition-colors duration-300 flex justify-between items-center">
                               <div>
                                 <h3 className="text-xl font-semibold text-white">{discussion.title}</h3>
                                 <p className="text-gray-400">by <span className="text-cyan-400">{discussion.authorHandle}</span></p>
                               </div>
                               <div className="text-right">
                                    <p className="flex items-center justify-end gap-2 text-gray-300"><Users className="h-4 w-4"/> {discussion.participants} participants</p>
                                    <p className="text-sm text-gray-500">Last post: {discussion.lastPost}</p>
                               </div>
                            </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

      </main>
    </div>
  );
}
