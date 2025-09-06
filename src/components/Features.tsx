import { Card } from "@/components/ui/card";
import { Brush, Share2, Shapes, Type, ArrowRight, Palette, MousePointer } from "lucide-react";

const features = [
  {
    icon: <Brush className="w-8 h-8" />,
    title: "Free Drawing",
    description: "Express your ideas with natural brush strokes and drawing tools that feel responsive and smooth.",
  },
  {
    icon: <Shapes className="w-8 h-8" />,
    title: "Smart Shapes",
    description: "Add perfect rectangles, circles, arrows, and custom shapes with precision and ease.",
  },
  {
    icon: <Type className="w-8 h-8" />,
    title: "Rich Text",
    description: "Insert and format text with multiple fonts, sizes, and styling options for clear communication.",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Color System",
    description: "Choose from unlimited colors, gradients, and themes to make your whiteboard uniquely yours.",
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly with team members, see changes instantly, and chat while you create.",
  },
  {
    icon: <MousePointer className="w-8 h-8" />,
    title: "Intuitive Interface",
    description: "Designed for creators with keyboard shortcuts, gesture support, and an interface that stays out of your way.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              create
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful tools that adapt to your workflow, whether you're sketching ideas, designing interfaces, or collaborating with your team.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card border-0 shadow-soft hover:shadow-medium transition-smooth group cursor-pointer"
            >
              <div className="flex flex-col items-start">
                <div className="p-3 gradient-secondary rounded-xl mb-6 text-primary group-hover:scale-110 transition-bounce">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-smooth">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-smooth" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};