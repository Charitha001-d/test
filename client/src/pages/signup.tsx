import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, type SignupForm } from "@shared/schema";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { signup, isSigningUp } = useAuth();
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
      await signup(data);
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
    <div className="bg-[#edfffa] min-h-screen flex flex-col justify-center max-w-[393px] mx-auto">
      <div className="px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-8 h-8 p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014] mr-4"
              >
                <ArrowLeft className="w-4 h-4 text-[#063528]" />
              </Button>
            </Link>
            <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528d4] text-2xl">
              Sign Up
            </h1>
          </div>
        </header>

        {/* Logo */}
        <div className="text-center mb-8">
          <AloeGuardLogo size="lg" />
          <p className="text-[#063528d4] text-sm mt-2">Plant Disease Detection & Analysis</p>
        </div>

        {/* Sign Up Form */}
        <Card className="bg-white rounded-xl border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
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
                  className="w-full bg-[#1c8567] hover:bg-[#073629] text-white font-medium py-3"
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
