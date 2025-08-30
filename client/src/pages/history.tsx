import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import type { PlantAnalysis } from "@shared/schema";

export default function History() {
  const [filter, setFilter] = useState<'all' | 'healthy' | 'diseased'>('all');

  const { data: analyses, isLoading } = useQuery<PlantAnalysis[]>({
    queryKey: ["/api/analyses"],
  });

  const filteredAnalyses = analyses?.filter(analysis => {
    if (filter === 'healthy') return analysis.isHealthy;
    if (filter === 'diseased') return !analysis.isHealthy;
    return true;
  }) || [];

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#edfffa] min-h-screen max-w-[393px] mx-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1c8567]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#edfffa] min-h-screen max-w-[393px] mx-auto">
      {/* Header */}
      <header className="pt-8 px-8 pb-4">
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0 bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014] mr-4"
            >
              <ArrowLeft className="w-4 h-4 text-[#063528]" />
            </Button>
          </Link>
          <AloeGuardLogo />
        </div>
        
        <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-2xl">
          Analysis History
        </h1>
      </header>

      <main className="px-8 pb-20">
        {/* Filter Options */}
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? "bg-[#1c8567] text-white" : "bg-[#1c8567]/10 text-[#1c8567]"}
            size="sm"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter('healthy')}
            className={filter === 'healthy' ? "bg-[#1c8567] text-white" : "bg-[#1c8567]/10 text-[#1c8567]"}
            size="sm"
          >
            Healthy
          </Button>
          <Button
            onClick={() => setFilter('diseased')}
            className={filter === 'diseased' ? "bg-[#1c8567] text-white" : "bg-[#1c8567]/10 text-[#1c8567]"}
            size="sm"
          >
            Diseased
          </Button>
        </div>

        {/* History Items */}
        {filteredAnalyses.length > 0 ? (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <Card key={analysis.id} className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[#063528] flex items-center">
                      {analysis.isHealthy ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                      )}
                      <span>{analysis.diagnosis}</span>
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      analysis.isHealthy 
                        ? "bg-green-100 text-green-800"
                        : (analysis.confidence || 0) > 0.85 
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {Math.round((analysis.confidence || 0) * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-[#063528]/70 mb-3">
                    {analysis.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#063528]/50">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(analysis.createdAt)}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#1c8567] hover:underline h-auto p-0">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#1c8567]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {filter === 'healthy' ? (
                  <CheckCircle className="w-8 h-8 text-[#1c8567]" />
                ) : filter === 'diseased' ? (
                  <AlertTriangle className="w-8 h-8 text-[#1c8567]" />
                ) : (
                  <Calendar className="w-8 h-8 text-[#1c8567]" />
                )}
              </div>
              <h3 className="font-medium text-[#063528] mb-2">
                {filter === 'healthy' ? "No healthy plants recorded" : 
                 filter === 'diseased' ? "No diseased plants recorded" : 
                 "No analyses yet"}
              </h3>
              <p className="text-sm text-[#063528]/70">
                {filter === 'all' ? "Start analyzing plants to see your history here" : 
                 `No ${filter} plants found in your history`}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
