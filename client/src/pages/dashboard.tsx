import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { User, Camera, History, Map, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useAuth } from "@/hooks/useAuth";
import type { PlantAnalysis } from "@shared/schema";
import Chatbot from "@/components/Chatbot";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    initialData: { totalAnalyzed: 0, healthyPlants: 0 },
  });

  const { data: recentAnalyses } = useQuery<PlantAnalysis[]>({
    queryKey: ["/api/analyses"],
  });

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="bg-[#edfffa] min-h-screen max-w-[393px] mx-auto pb-20 relative">
      {/* Header */}
      <header className="pt-8 px-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <AloeGuardLogo />
          <Link href="/profile">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 bg-[#1c8567]/20 rounded-full"
            >
              <User className="w-4 h-4 text-[#063528]" />
            </Button>
          </Link>
        </div>

        <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#063528] text-2xl">
          Plant Health Dashboard
        </h1>
        <p className="text-[#063528]/70 text-sm mt-1">Monitor and analyze your plants</p>
      </header>

      {/* Quick Stats */}
      <section className="px-8 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#1c8567] mb-1">
                {stats?.totalAnalyzed || 0}
              </div>
              <div className="text-xs text-[#063528]/70">Plants Analyzed</div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#0a8c2d] mb-1">
                {stats?.healthyPlants || 0}
              </div>
              <div className="text-xs text-[#063528]/70">Healthy Plants</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Actions */}
      <section className="px-8 mb-6">
        <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
          Quick Actions
        </h2>

        {/* Analyze Plant Card */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm mb-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg">
                  Analyze Plant
                </h3>
                <p className="text-[#063528]/70 text-sm">Take a photo for instant health analysis</p>
              </div>
              <div className="w-12 h-12 bg-[#1c8567]/20 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-[#1c8567]" />
              </div>
            </div>
            <Link href="/analysis">
              <Button className="w-full bg-[#1c8567] hover:bg-[#063528] text-white font-medium py-3" data-testid="button-start-analysis-dashboard">
                Start Analysis
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Other Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/history">
            <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm hover:bg-[#1c8567]/5 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <History className="w-6 h-6 text-[#1c8567] mx-auto mb-2" />
                <div className="text-sm font-medium text-[#063528]">History</div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/mapping">
            <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm hover:bg-[#1c8567]/5 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Map className="w-6 h-6 text-[#1c8567] mx-auto mb-2" />
                <div className="text-sm font-medium text-[#063528]">Disease Map</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent Analysis */}
      <section className="px-8 mb-6">
        <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
          Recent Analysis
        </h2>

        {recentAnalyses && recentAnalyses.length > 0 ? (
          <div className="space-y-3">
            {recentAnalyses.slice(0, 3).map((analysis) => (
              <Card
                key={analysis.id}
                className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#063528]">{analysis.diagnosis}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        analysis.isHealthy
                          ? "bg-green-100 text-green-800"
                          : analysis.confidence && analysis.confidence > 0.85
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {Math.round((analysis.confidence || 0) * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-[#063528]/70 mb-2">
                    {analysis.description || "No description available"}
                  </p>
                  <div className="flex items-center text-xs text-[#063528]/50">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(analysis.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
            <CardContent className="p-6 text-center">
              <Camera className="w-12 h-12 text-[#1c8567]/40 mx-auto mb-3" />
              <p className="text-[#063528]/60">No analyses yet</p>
              <p className="text-sm text-[#063528]/50">Start by taking a photo of your plant</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Chatbot placed above BottomNavigation with margin and z-index */}
    <div className="sticky bottom-[0px] max-w-[370px] px-4 z-20 bg-white shadow-md rounded-t-lg">
        <Chatbot />
      </div>

      {/* Bottom Navigation fixed at bottom */}
      
        <BottomNavigation />
      </div>
    
    
  );
}
