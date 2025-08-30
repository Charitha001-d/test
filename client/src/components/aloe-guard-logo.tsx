interface AloeGuardLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AloeGuardLogo({ size = "md", className = "" }: AloeGuardLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };

  return (
    <div className={`bg-[linear-gradient(90deg,rgba(7,54,41,1)_0%,rgba(28,134,104,1)_49%,rgba(7,54,41,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Salsa',Helvetica] font-normal text-transparent ${sizeClasses[size]} text-center tracking-[0] leading-[normal] ${className}`}>
      AloeGuard
    </div>
  );
}
