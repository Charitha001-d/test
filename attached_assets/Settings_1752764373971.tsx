import React, { useState } from "react";
import { ArrowLeftIcon, BellIcon, UserIcon, ShieldIcon, HelpCircleIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Settings = (): JSX.Element => {
  const [notifications, setNotifications] = useState(true);
  const [autoAnalysis, setAutoAnalysis] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  return (
    <div className="bg-[#edfffa] min-h-screen flex flex-row justify-center w-full">
      <div className="bg-[#edfffa] w-[393px] relative flex flex-col">
        {/* Header */}
        <header className="relative pt-8 px-8 pb-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="w-[33px] h-[33px] p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014]"
              >
                <ArrowLeftIcon className="w-5 h-5 text-[#063528]" />
              </Button>
            </Link>

            <div className="bg-[linear-gradient(90deg,rgba(7,54,41,1)_0%,rgba(28,134,104,1)_49%,rgba(7,54,41,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Salsa',Helvetica] font-normal text-transparent text-[15px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
              AloeGuard
            </div>
          </div>

          <h1 className="mt-4 [font-family:'Roboto',Helvetica] font-bold text-[#063528d4] text-2xl tracking-[0] leading-[normal]">
            Settings
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-6 pb-20">
          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4] flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  defaultValue="PlantLover123"
                />
              </div>
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="user@example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4] flex items-center gap-2">
                <BellIcon className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive alerts about plant health updates
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-analysis">Auto Analysis</Label>
                  <p className="text-sm text-gray-500">
                    Automatically analyze uploaded images
                  </p>
                </div>
                <Switch
                  id="auto-analysis"
                  checked={autoAnalysis}
                  onCheckedChange={setAutoAnalysis}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4] flex items-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-gray-500">
                    Help improve AI by sharing anonymous data
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={dataSharing}
                  onCheckedChange={setDataSharing}
                />
              </div>

              <Button
                variant="outline"
                className="w-full border-[#1c8567] text-[#1c8567] hover:bg-[#1c85672e]"
              >
                Export My Data
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4] flex items-center gap-2">
                <HelpCircleIcon className="w-5 h-5" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#063528d4] hover:bg-[#1c85672e]"
              >
                Help Center
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#063528d4] hover:bg-[#1c85672e]"
              >
                Contact Support
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#063528d4] hover:bg-[#1c85672e]"
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#063528d4] hover:bg-[#1c85672e]"
              >
                Terms of Service
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};