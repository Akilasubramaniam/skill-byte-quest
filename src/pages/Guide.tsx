import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Guide() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-28 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Learning Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Your personalized learning assistant
            </p>
          </div>
          
          <Card className="shadow-card border-primary/20 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-2xl">Copilot Studio Bot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This is where your Copilot Studio bot will be embedded. The bot will help you:
              </p>
              
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Get personalized learning recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Understand complex Python concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Receive coding tips and best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Track your learning progress</span>
                </li>
              </ul>
              
              <div className="bg-muted/20 border border-primary/20 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <p className="text-lg font-medium">Copilot Studio Bot Placeholder</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    To integrate your bot, you'll need to add the embed code from Microsoft Copilot Studio here.
                    The bot will provide interactive assistance for your learning journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}