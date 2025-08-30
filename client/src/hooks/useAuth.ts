import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { User, SigninForm, SignupForm } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user", {
        credentials: "include",
      });
      
      if (res.status === 401) {
        return null; // Return null for unauthenticated users
      }
      
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      
      return await res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const signinMutation = useMutation({
    mutationFn: async (data: SigninForm) => {
      const res = await apiRequest("POST", "/api/auth/signin", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      const res = await apiRequest("POST", "/api/auth/signup", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  const signoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/signout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signin: signinMutation.mutateAsync,
    isSigningIn: signinMutation.isPending,
    signinError: signinMutation.error,
    signup: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,
    signout: signoutMutation.mutateAsync,
    isSigningOut: signoutMutation.isPending,
  };
}
