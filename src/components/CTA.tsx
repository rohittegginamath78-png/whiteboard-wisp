import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 gradient-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to start creating?
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Join thousands of creators using our whiteboard
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Start your creative journey today with our powerful, intuitive whiteboard tools. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-strong"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="mt-12 text-white/70 text-sm">
            Free forever • No credit card required • Start in 30 seconds
          </div>
        </div>
      </div>
    </section>
  );
};