import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, User, Mail, Calendar, Settings, History, LogOut } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, signout } = useAuth();
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const handleSignOut = async () => {
    try {
      await signout();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatJoinDate = (date: Date | string | null | undefined) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-[#edfffa] min-h-screen max-w-[393px] mx-auto">
      {/* Header */}
      <header className="pt-8 px-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <AloeGuardLogo />
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 bg-[#1c8567]/20 rounded-full"
          >
            <Edit className="w-4 h-4 text-[#063528]" />
          </Button>
        </div>
        
        <div className="flex items-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014] mr-4"
            >
              <ArrowLeft className="w-4 h-4 text-[#063528]" />
            </Button>
          </Link>
          <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-2xl">
            Profile
          </h1>
        </div>
      </header>

      <main className="px-8 pb-20">
        {/* Profile Header */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6 text-center mb-6">
          <div className="w-20 h-20 bg-[#1c8567]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#1c8567]" />
          </div>
          <h2 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-xl mb-2">
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user?.username || "Plant Lover"
            }
          </h2>
          <p className="text-[#063528]/70 text-sm mb-1">@{user?.username || "username"}</p>
          {user?.email && (
            <div className="flex items-center justify-center text-[#063528]/70 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              <span>{user.email}</span>
            </div>
          )}
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-[#1c8567] mb-1">
              {stats?.totalAnalyzed || 0}
            </div>
            <div className="text-xs text-[#063528]/70">Plants Analyzed</div>
          </Card>
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-[#b91946] mb-1">
              {stats?.diseasesDetected || 0}
            </div>
            <div className="text-xs text-[#063528]/70">Diseases Detected</div>
          </Card>
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-[#0a8c2d] mb-1">
              {stats?.healthyPlants || 0}
            </div>
            <div className="text-xs text-[#063528]/70">Healthy Plants</div>
          </Card>
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {stats?.daysActive || 0}
            </div>
            <div className="text-xs text-[#063528]/70">Days Active</div>
          </Card>
        </div>

        {/* Account Information */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 mb-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-[#1c8567]/20">
              <div className="flex items-center">
                <User className="w-4 h-4 text-[#1c8567] mr-3" />
                <div>
                  <p className="text-sm font-medium text-[#063528]">Username</p>
                  <p className="text-xs text-[#063528]/70">{user?.username || "Not set"}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[#1c8567] h-auto p-0">
                <Edit className="w-3 h-3" />
              </Button>
            </div>

            {user?.email && (
              <div className="flex items-center justify-between py-2 border-b border-[#1c8567]/20">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-[#1c8567] mr-3" />
                  <div>
                    <p className="text-sm font-medium text-[#063528]">Email</p>
                    <p className="text-xs text-[#063528]/70">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#1c8567] h-auto p-0">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}

            <div className="flex items-center py-2">
              <Calendar className="w-4 h-4 text-[#1c8567] mr-3" />
              <div>
                <p className="text-sm font-medium text-[#063528]">Member Since</p>
                <p className="text-xs text-[#063528]/70">{formatJoinDate(user?.createdAt)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 mb-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <Link href="/settings">
              <Button 
                variant="ghost"
                className="w-full flex items-center justify-start p-3 text-[#063528] border border-[#1c8567]/20 rounded-lg hover:bg-[#1c8567]/5"
              >
                <Settings className="w-4 h-4 mr-3" />
                Account Settings
              </Button>
            </Link>
            
            <Link href="/history">
              <Button 
                variant="ghost"
                className="w-full flex items-center justify-start p-3 text-[#063528] border border-[#1c8567]/20 rounded-lg hover:bg-[#1c8567]/5"
              >
                <History className="w-4 h-4 mr-3" />
                View History
              </Button>
            </Link>
            
            <Button 
              onClick={handleSignOut}
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#b91946] border border-[#b91946]/20 rounded-lg hover:bg-[#b91946]/5"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
