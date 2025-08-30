import React from "react";
import { ArrowLeft, Settings as SettingsIcon, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { signout } = useAuth();
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
                <SettingsIcon className="w-4 h-4" />
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
              Settings
            </h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col w-full px-8 mt-6">
          {/* Notifications Settings */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                Notifications
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Push Notifications</p>
                      <p className="text-xs text-[#063528d4]">Get alerts for analysis results</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Disease Alerts</p>
                      <p className="text-xs text-[#063528d4]">Get notified when diseases are detected</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Maintenance Reminders</p>
                      <p className="text-xs text-[#063528d4]">Regular plant care reminders</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                Privacy & Security
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Data Sharing</p>
                      <p className="text-xs text-[#063528d4]">Share anonymous data to improve AI</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Location Services</p>
                      <p className="text-xs text-[#063528d4]">Use location for disease mapping</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-[#1c8567] mr-3" />
                    <div>
                      <p className="text-sm font-medium text-[#063528]">Two-Factor Authentication</p>
                      <p className="text-xs text-[#063528d4]">Add extra security to your account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#1c8567] border-[#1c8567]">
                    Setup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                App Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[#063528]">App Version</p>
                    <p className="text-xs text-[#063528d4]">AloeGuard v1.0.0</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#1c8567] border-[#1c8567]">
                    Check Updates
                  </Button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[#063528]">Cache Size</p>
                    <p className="text-xs text-[#063528d4]">45.2 MB used</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#b91946] border-[#b91946]">
                    Clear Cache
                  </Button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[#063528]">Storage</p>
                    <p className="text-xs text-[#063528d4]">124 images, 78.5 MB</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#1c8567] border-[#1c8567]">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support & Help */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg mb-4">
                Support & Help
              </h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#1c85672e] text-[#063528] hover:bg-[#1c85672e]"
                >
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help Center
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#1c85672e] text-[#063528] hover:bg-[#1c85672e]"
                >
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Contact Support
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#1c85672e] text-[#063528] hover:bg-[#1c85672e]"
                >
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Terms & Privacy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="w-full bg-white rounded-[11px] border-[0.5px] border-solid border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a] mb-6">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full justify-start border-[#b91946] text-[#b91946] hover:bg-[#b919461a]"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[#b91946] text-[#b91946] hover:bg-[#b919461a]"
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Delete Account
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
            
            <Link href="/profile">
              <Button variant="ghost" className="w-[60px] h-[60px] flex items-center justify-center">
                <img className="w-5 h-5" alt="Profile" src="/figmaAssets/vector-3.svg" />
              </Button>
            </Link>
            
            <Button variant="ghost" className="w-[60px] h-[60px] flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-[#1c8567]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}