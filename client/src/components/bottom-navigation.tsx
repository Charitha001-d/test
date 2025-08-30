import { Camera, History, Home, Map, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function BottomNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[393px] mx-auto bg-white border-t border-[#1c85672e] h-[77px]">
      <div className="flex items-center justify-around py-3 h-full">
        <Link href="/">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto p-2" data-testid="nav-home">
            <Home className={`w-5 h-5 ${isActive("/") ? "text-[#1c8567]" : "text-[#063528]/60"}`} />
            <span className={`text-xs ${isActive("/") ? "text-[#1c8567]" : "text-[#063528]/60"}`}>
              Home
            </span>
          </Button>
        </Link>
        
        <Link href="/history">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto p-2" data-testid="nav-history">
            <History className={`w-5 h-5 ${isActive("/history") ? "text-[#1c8567]" : "text-[#063528]/60"}`} />
            <span className={`text-xs ${isActive("/history") ? "text-[#1c8567]" : "text-[#063528]/60"}`}>
              History
            </span>
          </Button>
        </Link>
        
        <Link href="/analysis">
          <Button className="w-14 h-14 bg-[#1c8567] hover:bg-[#073629] rounded-full -mt-6 shadow-lg p-0" data-testid="nav-camera">
            <Camera className="w-6 h-6 text-white" />
          </Button>
        </Link>
        
        <Link href="/mapping">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto p-2" data-testid="nav-mapping">
            <Map className={`w-5 h-5 ${isActive("/mapping") ? "text-[#1c8567]" : "text-[#063528]/60"}`} />
            <span className={`text-xs ${isActive("/mapping") ? "text-[#1c8567]" : "text-[#063528]/60"}`}>
              Map
            </span>
          </Button>
        </Link>
        
        <Link href="/profile">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto p-2" data-testid="nav-profile">
            <User className={`w-5 h-5 ${isActive("/profile") ? "text-[#1c8567]" : "text-[#063528]/60"}`} />
            <span className={`text-xs ${isActive("/profile") ? "text-[#1c8567]" : "text-[#063528]/60"}`}>
              Profile
            </span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
