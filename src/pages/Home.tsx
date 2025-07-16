import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cpu, Zap, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-pc-gaming.jpg";

const Home = () => {
  const features = [
    {
      icon: Cpu,
      title: "Smart Component Selection",
      description: "Choose from our curated database of the latest PC components with detailed specifications."
    },
    {
      icon: Shield,
      title: "Compatibility Checking",
      description: "Get real-time compatibility warnings to ensure all your components work together perfectly."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Build configurations optimized for gaming, content creation, or professional workloads."
    },
    {
      icon: Users,
      title: "Expert Reviews",
      description: "Read detailed reviews and recommendations from PC building experts and community."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Gaming PC Setup"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build Your Dream PC
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The ultimate PC building companion. Choose components, check compatibility, 
              and create the perfect gaming or workstation setup.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="gaming-button text-lg px-8 py-3">
                <Link to="/builder">Start Building</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-3">
                <Link to="/compare">Compare Parts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PC Builder Assistant?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="component-card text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of builders who have created their dream PCs with our platform. 
            Start your journey today!
          </p>
          <Button asChild className="gaming-button text-lg px-12 py-3">
            <Link to="/builder">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;