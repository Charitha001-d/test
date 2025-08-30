import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninForm = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [, setLocation] = useLocation();
  const { signin, isSigningIn, signinError } = useAuth();
  const { toast } = useToast();

  const form = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninForm) => {
    try {
      await signin(data);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-[#edfffa] min-h-screen flex flex-col justify-center w-full">
      <div className="bg-[#edfffa] w-full max-w-[393px] mx-auto relative px-8">
        {/* Header */}
        <header className="relative pt-8 mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-[33px] h-[33px] p-0 bg-[#1c85672e] rounded-[16.5px] shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014]"
              >
                <ArrowLeft className="w-5 h-5 text-[#063528]" />
              </Button>
            </Link>
            <h1 className="ml-4 [font-family:'Roboto',Helvetica] font-bold text-[#063528d4] text-2xl tracking-[0] leading-[normal]">
              Sign In
            </h1>
          </div>
        </header>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-[linear-gradient(90deg,rgba(7,54,41,1)_0%,rgba(28,134,104,1)_49%,rgba(7,54,41,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Salsa',Helvetica] font-normal text-transparent text-3xl text-center tracking-[0] leading-[normal]">
            AloeGuard
          </div>
          <p className="text-[#063528d4] text-sm mt-2">Plant Disease Detection & Analysis</p>
        </div>

        {/* Sign In Form */}
        <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
          <CardHeader>
            <CardTitle className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-xl">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-[#063528d4]">
              Sign in to your AloeGuard account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#063528]">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className="border-[#1c85672e] focus:border-[#1c8567]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#063528]">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="border-[#1c85672e] focus:border-[#1c8567]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full bg-[#1c8567] hover:bg-[#073629] text-white"
                >
                  {isSigningIn ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#063528d4]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#1c8567] hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}