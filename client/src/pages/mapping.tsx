import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AloeGuardLogo } from "@/components/aloe-guard-logo";
import type { DiseaseReport } from "@shared/schema";

export default function Mapping() {
  const { data: reports, isLoading } = useQuery<DiseaseReport[]>({
    queryKey: ["/api/disease-reports"],
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (severity: string) => {
    if (severity.toLowerCase() === 'high') {
      return <TrendingUp className="w-4 h-4 text-red-500" />;
    } else if (severity.toLowerCase() === 'low') {
      return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
    }
    return <div className="w-4 h-0.5 bg-gray-500 rounded"></div>;
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
          Disease Mapping
        </h1>
      </header>

      <main className="px-8 pb-20">
        {/* Map View */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6 mb-6">
          <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Regional Overview
          </h2>
          
          {/* Placeholder for map */}
          <div className="h-48 bg-[#1c8567]/10 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#1c8567]/60 mx-auto mb-2" />
              <p className="text-[#063528]/60 text-sm">Interactive Disease Map</p>
              <p className="text-xs text-[#063528]/40 mt-1">Coming soon</p>
            </div>
          </div>
          
          <p className="text-sm text-[#063528]/70">
            Disease patterns and trends in your area
          </p>
        </Card>

        {/* Disease Reports */}
        <div className="mb-6">
          <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Recent Reports
          </h2>
          
          {reports && reports.length > 0 ? (
            <div className="space-y-3">
              {reports.slice(0, 5).map((report) => (
                <Card key={report.id} className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#063528] flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{report.location}</span>
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                        {getTrendIcon(report.severity)}
                      </div>
                    </div>
                    <p className="text-sm text-[#063528]/70">
                      {report.disease} • {report.description || "No description"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-[#1c8567]/40 mx-auto mb-3" />
                <p className="text-[#063528]/60">No disease reports yet</p>
                <p className="text-sm text-[#063528]/50">Be the first to report a disease in your area</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Report Disease */}
        <Card className="rounded-xl border-[0.5px] border-[#1c85672e] shadow-sm p-6">
          <h3 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528] text-lg mb-4">
            Report Disease
          </h3>
          <p className="text-sm text-[#063528]/70 mb-4">
            Help improve community plant health by reporting diseases
          </p>
          <Button className="w-full bg-[#1c8567] text-white flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report New Case
          </Button>
        </Card>
      </main>
    </div>
  );
}
