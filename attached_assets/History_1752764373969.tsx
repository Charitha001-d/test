import React from "react";
import { ArrowLeftIcon, CalendarIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useQuery } from "@tanstack/react-query";

export const History = (): JSX.Element => {
  const { data: historyData = [], isLoading } = useQuery({
    queryKey: ['/api/plant-analysis/user/1'], // Mock user ID
    queryFn: async () => {
      const response = await fetch('/api/plant-analysis/user/1');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      return response.json();
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "danger": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <TrendingUpIcon className="w-4 h-4" />;
      case "warning": return <AlertTriangleIcon className="w-4 h-4" />;
      case "danger": return <AlertTriangleIcon className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
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
            Analysis History
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-4 pb-20">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p className="text-[#063528d4] opacity-70">Loading analysis history...</p>
            </div>
          ) : (
            historyData.map((item) => (
              <Card
                key={item.id}
                className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-[#063528d4] flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      {item.diagnosis}
                    </CardTitle>
                    <Badge className={getStatusColor(item.status)}>
                      {Math.round(item.confidence)}% confidence
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    {formatDate(item.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#063528d4] opacity-80">
                    {item.notes}
                  </p>
                </CardContent>
              </Card>
            ))
          )}

          {historyData.length === 0 && (
            <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
              <CardContent className="text-center py-8">
                <CalendarIcon className="w-12 h-12 mx-auto text-[#063528d4] opacity-50 mb-4" />
                <p className="text-[#063528d4] opacity-70">
                  No analysis history available yet.
                </p>
                <Link href="/analysis">
                  <Button className="mt-4 bg-[#1c8567] hover:bg-[#156b54] text-white">
                    Start First Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};