import { ArrowLeftIcon, HomeIcon, CameraIcon, SettingsIcon } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { AdditionalFeaturesSection } from "./sections/AdditionalFeaturesSection";
import { DiagnosisResultSection } from "./sections/DiagnosisResultSection";
import { DiseaseMappingSection } from "./sections/DiseaseMappingSection";
import { FeedbackLoopSection } from "./sections/FeedbackLoopSection";
import { HistoryLogSection } from "./sections/HistoryLogSection";
import { PlantAnalysisSection } from "./sections/PlantAnalysisSection";

export const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-[#edfffa] flex flex-row justify-center w-full">
      <div className="bg-[#edfffa] w-[393px] relative flex flex-col">
        {/* Header */}
        <header className="relative pt-8 px-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/settings">
                <button className="w-[33px] h-[33px] flex items-center justify-center bg-[#1c85672e] rounded-full shadow-[0px_4px_10.8px_#00000040,inset_0px_4px_11.4px_#00000014]">
                  <SettingsIcon className="w-5 h-5 text-[#063528]" />
                </button>
              </Link>

              <div className="ml-4 h-[26px]">
                <div className="relative">
                  <div className="absolute w-3.5 h-[13px] top-px left-[65px] overflow-hidden rotate-[-9.17deg]">
                    <div className="relative h-[13px] top-[-1281px] left-[-1961px] bg-[100%_100%]">
                      <img
                        className="absolute w-3 h-3 top-px left-px"
                        alt="Vector"
                        src="/figmaAssets/vector.svg"
                      />
                    </div>
                  </div>

                  <div className="bg-[linear-gradient(90deg,rgba(7,54,41,1)_0%,rgba(28,134,104,1)_49%,rgba(7,54,41,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Salsa',Helvetica] font-normal text-transparent text-[15px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
                    AloeGuard
                  </div>
                </div>
              </div>
            </div>

            <Avatar className="w-[42px] h-[42px]">
              <AvatarImage
                src="/figmaAssets/ellipse-17.svg"
                alt="UserIcon profile"
              />
            </Avatar>
          </div>

          <h1 className="mt-4 [font-family:'Roboto',Helvetica] font-bold text-[#063528d4] text-2xl tracking-[0] leading-[normal]">
            AloeGuard Dashboard
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col px-8 gap-6">
          {/* Plant Analysis Section */}
          <PlantAnalysisSection />

          {/* Diagnosis Result Section */}
          <DiagnosisResultSection />

          {/* Feedback Loop Section */}
          <FeedbackLoopSection />

          {/* Disease Mapping Section */}
          <DiseaseMappingSection />

          {/* Additional Features Section */}
          <section>
            <h2 className="[font-family:'Roboto',Helvetica] font-medium text-[#063528d4] text-xl tracking-[0] leading-[normal] mb-4">
              Additional Features
            </h2>
            <AdditionalFeaturesSection />
          </section>

          {/* History Log Section */}
          <HistoryLogSection />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 w-full h-[77px] bg-white flex items-center justify-around border-t border-[#0000000f]">
          <Link href="/">
            <button className="flex flex-col items-center justify-center p-2">
              <HomeIcon className="w-5 h-5 text-[#063528]" />
            </button>
          </Link>

          <Link href="/analysis">
            <button className="flex flex-col items-center justify-center">
              <div className="w-[60px] h-[60px] bg-[#1c8567] rounded-full flex items-center justify-center shadow-lg">
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            </button>
          </Link>

          <Link href="/settings">
            <button className="flex flex-col items-center justify-center p-2">
              <SettingsIcon className="w-5 h-5 text-[#063528]" />
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
};
