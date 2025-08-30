import { useState } from "react";
import { ArrowLeft, Bell, Shield, HelpCircle, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { signout } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [diseaseAlerts, setDiseaseAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

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
            <SettingsIcon className="w-4 h-4 text-[#063528]" />
          </Button>
        </div>
        
        <div className="flex items-center">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014] mr-4"
            >
              <ArrowLeft className="w-4 h-4 text-[#063528]" />
            </Button>
          </Link>
          <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-2xl">
            Settings
          </h1>
        </div>
      </header>

      <main className="px-8 pb-20">
        {/* Notifications Settings */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 mb-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell className="w-4 h-4 text-[#1c8567] mr-3" />
                <div>
                  <p className="text-sm font-medium text-[#063528]">Push Notifications</p>
                  <p className="text-xs text-[#063528]/70">Get alerts for analysis results</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Bell className="w-4 h-4 text-[#1c8567] mr-3" />
                <div>
                  <p className="text-sm font-medium text-[#063528]">Disease Alerts</p>
                  <p className="text-xs text-[#063528]/70">Get notified when diseases are detected</p>
                </div>
              </div>
              <Switch
                checked={diseaseAlerts}
                onCheckedChange={setDiseaseAlerts}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 mb-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Privacy & Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-[#1c8567] mr-3" />
                <div>
                  <p className="text-sm font-medium text-[#063528]">Data Sharing</p>
                  <p className="text-xs text-[#063528]/70">Share anonymous data to improve AI</p>
                </div>
              </div>
              <Switch
                checked={dataSharing}
                onCheckedChange={setDataSharing}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-[#1c8567] mr-3" />
                <div>
                  <p className="text-sm font-medium text-[#063528]">Location Services</p>
                  <p className="text-xs text-[#063528]/70">Use location for disease mapping</p>
                </div>
              </div>
              <Switch
                checked={locationServices}
                onCheckedChange={setLocationServices}
              />
            </div>
          </div>
        </Card>

        {/* Support & Help */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4 mb-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Support & Help
          </h3>
          
          <div className="space-y-3">
            <Button 
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#063528] border border-[#1c8567]/20 rounded-lg hover:bg-[#1c8567]/5"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Help Center
            </Button>
            
            <Button 
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#063528] border border-[#1c8567]/20 rounded-lg hover:bg-[#1c8567]/5"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Contact Support
            </Button>
            
            <Button 
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#063528] border border-[#1c8567]/20 rounded-lg hover:bg-[#1c8567]/5"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              Terms & Privacy
            </Button>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-4">
          <div className="space-y-3">
            <Button 
              onClick={handleSignOut}
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#b91946] border border-[#b91946]/20 rounded-lg hover:bg-[#b91946]/5"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
            
            <Button 
              variant="ghost"
              className="w-full flex items-center justify-start p-3 text-[#b91946] border border-[#b91946]/20 rounded-lg hover:bg-[#b91946]/5"
            >
              <Shield className="w-4 h-4 mr-3" />
              Delete Account
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
