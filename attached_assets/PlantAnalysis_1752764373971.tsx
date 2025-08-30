import React, { useState } from "react";
import { ArrowLeftIcon, CameraIcon, UploadIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const PlantAnalysis = (): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "Image selected",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Call the mock analysis API
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageName: selectedFile.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      
      // Save analysis to database (using mock user ID for now)
      const analysisResponse = await fetch('/api/plant-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Mock user ID
          imagePath: selectedFile.name,
          diagnosis: result.diagnosis,
          confidence: result.confidence,
          status: result.status,
          notes: result.notes,
        }),
      });

      if (analysisResponse.ok) {
        toast({
          title: "Analysis complete",
          description: `Diagnosis: ${result.diagnosis} (${result.confidence}% confidence)`,
        });
      } else {
        throw new Error('Failed to save analysis');
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your plant image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
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
            Plant Analysis
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-6 pb-20">
          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Upload Plant Image</CardTitle>
              <CardDescription>
                Take a photo or upload an image of your Aloe Vera plant for health analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="plant-image">Plant Image</Label>
                <Input
                  id="plant-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>

              {selectedFile && (
                <div className="mt-4 p-4 bg-[#1c85672e] rounded-lg">
                  <p className="text-sm text-[#063528d4]">
                    Selected: {selectedFile.name}
                  </p>
                  <p className="text-xs text-[#063528d4] opacity-70">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  className="flex-1 bg-[#1c8567] hover:bg-[#156b54] text-white"
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <CameraIcon className="w-4 h-4 mr-2" />
                      Analyze Plant
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Quick Capture</CardTitle>
              <CardDescription>
                Use your camera to instantly capture and analyze your plant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-[#1c8567] text-[#1c8567] hover:bg-[#1c85672e]"
              >
                <CameraIcon className="w-4 h-4 mr-2" />
                Open Camera
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};