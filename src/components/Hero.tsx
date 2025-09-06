import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-whiteboard.jpg";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-accent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-up">
              <Sparkles className="w-4 h-4" />
              New collaborative features
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Create, Draw,{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Collaborate
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              The ultimate whiteboard experience for teams and individuals. Draw, design, and brainstorm with powerful tools that feel natural and intuitive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="premium" size="lg" className="text-lg px-8 py-6 h-auto">
                Watch Demo
              </Button>
            </div>
            
            {/* Early access note */}
            <div className="text-center lg:text-left mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-muted-foreground">
                🎨 Early Access — No credit card required
              </p>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={heroImage}
                alt="Whiteboard app interface showing creative design tools and collaborative features"
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
              
              {/* Floating UI elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium animate-float">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-medium animate-float" style={{ animationDelay: "1s" }}>
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};