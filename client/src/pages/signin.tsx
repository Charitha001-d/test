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
import { signinSchema, type SigninForm } from "@shared/schema";

export default function SignIn() {
  const [, setLocation] = useLocation();
  const { signin, isSigningIn } = useAuth();
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
    <div className="bg-[#edfffa] min-h-screen flex flex-col justify-center max-w-[393px] mx-auto">
      <div className="px-8">
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
              Sign In
            </h1>
          </div>
        </header>

        {/* Logo */}
        <div className="text-center mb-8">
          <AloeGuardLogo size="lg" />
          <p className="text-[#063528d4] text-sm mt-2">Plant Disease Detection & Analysis</p>
        </div>

        {/* Sign In Form */}
        <Card className="bg-white rounded-xl border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
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
                          data-testid="input-username"
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
                          data-testid="input-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full bg-[#1c8567] hover:bg-[#073629] text-white font-medium py-3"
                  data-testid="button-signin"
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
