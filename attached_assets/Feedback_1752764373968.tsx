import React, { useState } from "react";
import { ArrowLeftIcon, StarIcon, SendIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const Feedback = (): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Mock user ID
          analysisId: null, // Could be linked to specific analysis
          rating,
          comment: feedback,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setRating(0);
      setFeedback("");
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            Feedback
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-6 pb-20">
          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Rate Your Experience</CardTitle>
              <CardDescription>
                How satisfied are you with the plant analysis accuracy?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => handleRatingClick(star)}
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                ))}
              </div>
              
              {rating > 0 && (
                <p className="text-center text-sm text-[#063528d4] opacity-70">
                  You rated: {rating} star{rating !== 1 ? 's' : ''}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Additional Comments</CardTitle>
              <CardDescription>
                Share your thoughts or suggestions for improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="feedback-message">Your feedback</Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us about your experience with AloeGuard..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitting}
                className="w-full bg-[#1c8567] hover:bg-[#156b54] text-white"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[11px] border-[0.5px] border-[#1c85672e] shadow-[0px_4px_12.1px_#0000001a]">
            <CardHeader>
              <CardTitle className="text-[#063528d4]">Recent Feedback</CardTitle>
              <CardDescription>
                Your previous feedback submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-[#1c85672e] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`w-4 h-4 ${
                            star <= 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#063528d4] opacity-70">
                      Jan 15, 2024
                    </span>
                  </div>
                  <p className="text-sm text-[#063528d4] opacity-80">
                    Great accuracy in detecting root rot. The treatment suggestions were very helpful.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};