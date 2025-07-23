'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function GetStartedPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
        router.refresh();
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.name,
        },
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      toast({
        title: "Success!",
        description: "Check your email for a confirmation link.",
      });
      router.refresh();
    }
  };

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster />
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
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4 ml-8">
            <div className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">🌐 EN</div>
            <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">👤</div>
            <Button asChild className="px-6 py-2 bg-white text-black rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/30 hover:scale-105 transform">
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
                      <Button asChild className="w-full mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold text-lg">
                          <Link href="/get-started">Get started</Link>
                      </Button>
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
            <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/60">
                    <TabsTrigger value="signup"><UserPlus className="mr-2"/>Sign Up</TabsTrigger>
                    <TabsTrigger value="signin"><LogIn className="mr-2"/>Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Create an Account</CardTitle>
                            <CardDescription>Join FinLight and start your journey to smarter investing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Form {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                              <FormField
                                control={signUpForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Doe" {...field} className="bg-slate-800/60 border-cyan-400/30"/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                               <FormField
                                control={signUpForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="you@example.com" {...field} className="bg-slate-800/60 border-cyan-400/30"/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                               <FormField
                                control={signUpForm.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                      <Input type="password" placeholder="••••••••" {...field} className="bg-slate-800/60 border-cyan-400/30"/>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">Create Account</Button>
                            </form>
                          </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signin">
                    <Card className="bg-slate-900/50 border-cyan-400/20 text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Welcome Back</CardTitle>
                            <CardDescription>Sign in to access your dashboard and portfolio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Form {...signInForm}>
                              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                                <FormField
                                  control={signInForm.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} className="bg-slate-800/60 border-cyan-400/30"/>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={signInForm.control}
                                  name="password"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Password</FormLabel>
                                      <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} className="bg-slate-800/60 border-cyan-400/30"/>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                    </div>
                                    <Link href="#" className="text-sm text-cyan-400 hover:underline">Forgot password?</Link>
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">Sign In</Button>
                              </form>
                          </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
