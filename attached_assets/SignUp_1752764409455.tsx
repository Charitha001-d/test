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

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { signup, isSigningUp, signupError } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      const { confirmPassword, ...signupData } = data;
      // Convert empty string to undefined for optional fields
      const cleanData = {
        ...signupData,
        email: signupData.email || undefined,
        firstName: signupData.firstName || undefined,
        lastName: signupData.lastName || undefined,
      };
      
      await signup(cleanData);
      toast({
        title: "Account created!",
        description: "Welcome to AloeGuard. You can now start analyzing plants.",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-[#edfffa] min-h-screen flex flex-col justify-center w-full">
      <div className="bg-[#edfffa] w-full max-w-[393px] mx-auto relative px-8 py-8">
        {/* Header */}
        <header className="relative mb-8">
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
              Sign Up
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

        {/* Sign Up Form */}
        <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
          <CardHeader>
            <CardTitle className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-xl">
              Create Account
            </CardTitle>
            <CardDescription className="text-[#063528d4]">
              Join AloeGuard to start analyzing plants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#063528]">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#063528]">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="border-[#1c85672e] focus:border-[#1c8567]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#063528]">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#063528]">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
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
                          placeholder="Create a secure password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#063528]">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
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
                  disabled={isSigningUp}
                  className="w-full bg-[#1c8567] hover:bg-[#073629] text-white"
                >
                  {isSigningUp ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#063528d4]">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#1c8567] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}