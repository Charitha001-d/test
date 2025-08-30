import React from "react";
import { ArrowLeft, User, Edit, Mail, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, signout } = useAuth();
  const { toast } = useToast();

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

  const profileStats = [
    { label: "Plants Analyzed", value: "24", color: "text-[#1c8567]" },
    { label: "Diseases Detected", value: "6", color: "text-[#b91946]" },
    { label: "Healthy Plants", value: "18", color: "text-[#0a8c2d]" },
    { label: "Days Active", value: "15", color: "text-[#ff8c00]" },
  ];

  return (
    <div className="bg-[#edfffa] min-h-screen w-full">
      <div className="bg-[#edfffa] w-full max-w-[393px] mx-auto relative">
        {/* Header */}
        <header className="relative pt-8 px-8">
          <div className="flex justify-between items-center">
            <div className="relative h-[26px] w-20">
              <div className="absolute top-1 left-0 bg-[linear-gradient(90deg,rgba(7,54,41,1)_0%,rgba(28,134,104,1)_49%,rgba(7,54,41,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Salsa',Helvetica] font-normal text-transparent text-[15px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
                AloeGuard
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-[#063528] hover:bg-[#1c85672e]"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-[33px] h-[33px] p-0 bg-[#1c85672e] rounded-[16.5px] shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014]"
              >
                <ArrowLeft className="w-5 h-5 text-[#063528]" />
              </Button>
            </Link>
            <h1 className="ml-4 [font-family:'Roboto',Helvetica] font-bold text-[#063528d4] text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
              Profile
            </h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col w-full px-8 mt-6">
          {/* Profile Header */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src="/figmaAssets/ellipse-17.svg" alt="Profile" />
                <AvatarFallback className="bg-[#1c85672e] text-[#063528] text-2xl">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-xl mb-2">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.username || 'User'
                }
              </h2>
              
              <p className="text-[#063528d4] text-sm mb-1">@{user?.username}</p>
              
              {user?.email && (
                <div className="flex items-center justify-center text-[#063528d4] text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {profileStats.map((stat, index) => (
              <Card key={index} className="bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#063528d4]">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Account Information */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[#1c85672e]">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Username</p>
                      <p className="text-xs text-[#063528d4]">{user?.username}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#1c8567]">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>

                {user?.email && (
                  <div className="flex items-center justify-between py-2 border-b border-[#1c85672e]">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-[#1c8567] mr-3" />
                      <div>
                        <p className="text-sm font-medium text-[#063528]">Email</p>
                        <p className="text-xs text-[#063528d4]">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#1c8567]">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Member Since</p>
                      <p className="text-xs text-[#063528d4]">January 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link href="/settings">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#1c85672e] text-[#063528] hover:bg-[#1c85672e]"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Account Settings
                  </Button>
                </Link>
                
                <Link href="/history">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-[#1c85672e] text-[#063528] hover:bg-[#1c85672e]"
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    View History
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full justify-start border-[#b91946] text-[#b91946] hover:bg-[#b919461a]"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[393px] mx-auto h-[77px] flex justify-center items-center bg-white">
          <div className="flex space-x-8">
            <Link href="/">
              <Button variant="ghost" className="w-[60px] h-[60px] flex items-center justify-center">
                <img className="w-5 h-5" alt="Home" src="/figmaAssets/vector-9.svg" />
              </Button>
            </Link>
            
            <Link href="/history">
              <Button variant="ghost" className="w-[60px] h-[60px] flex items-center justify-center">
                <img className="w-5 h-5" alt="History" src="/figmaAssets/vector-3.svg" />
              </Button>
            </Link>
            
            <Button variant="ghost" className="w-[60px] h-[60px] flex items-center justify-center">
              <User className="w-5 h-5 text-[#1c8567]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}