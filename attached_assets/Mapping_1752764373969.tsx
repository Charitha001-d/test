import React from "react";
import { ArrowLeftIcon, MapPinIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";

export const Mapping = (): JSX.Element => {
  const { data: diseaseData = [], isLoading } = useQuery({
    queryKey: ['/api/disease-reports'],
    queryFn: async () => {
      const response = await fetch('/api/disease-reports');
      if (!response.ok) {
        throw new Error('Failed to fetch disease reports');
      }
      return response.json();
    },
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUpIcon className="w-4 h-4 text-red-500" />;
      case "decreasing": return <TrendingUpIcon className="w-4 h-4 text-green-500 rotate-180" />;
      case "stable": return <div className="w-4 h-[2px] bg-gray-500 rounded" />;
      default: return null;
    }
  };

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
            Disease Mapping
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-4 pb-20">
          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Regional Overview</CardTitle>
              <CardDescription>
                Disease patterns and trends in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-[#1c85672e] rounded-lg flex items-center justify-center">
                <p className="text-[#063528d4] opacity-70">Interactive Map View</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-lg tracking-[0] leading-[normal]">
              Disease Reports
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p className="text-[#063528d4] opacity-70">Loading disease reports...</p>
              </div>
            ) : (
              diseaseData.map((item) => (
              <Card
                key={item.id}
                className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-[#063528d4] flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      {item.location}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                  <CardDescription>
                    {item.disease} • {item.cases || 1} reported cases
                  </CardDescription>
                </CardHeader>
              </Card>
              ))
            )}
          </div>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Report Disease</CardTitle>
              <CardDescription>
                Help improve community plant health by reporting diseases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#1c8567] hover:bg-[#156b54] text-white">
                <AlertTriangleIcon className="w-4 h-4 mr-2" />
                Report New Case
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};