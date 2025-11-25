import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, BookOpen, Home } from "lucide-react";
import { useEffect } from "react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, skillLevel } = location.state || {};

  useEffect(() => {
    if (!score && score !== 0) {
      navigate("/quiz");
    }
  }, [score, navigate]);

  const percentage = ((score / total) * 100).toFixed(1);

  const getSkillInfo = () => {
    switch (skillLevel) {
      case "advanced":
        return {
          title: "Advanced Developer",
          color: "text-green-500",
          icon: Trophy,
          message: "Excellent work! You've mastered Python fundamentals.",
        };
      case "intermediate":
        return {
          title: "Intermediate Developer",
          color: "text-yellow-500",
          icon: TrendingUp,
          message: "Good job! Keep practicing to reach advanced level.",
        };
      default:
        return {
          title: "Beginner Developer",
          color: "text-blue-500",
          icon: BookOpen,
          message: "Great start! Continue learning to improve your skills.",
        };
    }
  };

  const skillInfo = getSkillInfo();
  const SkillIcon = skillInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-glow-pulse">
            <SkillIcon className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-6xl font-bold text-primary">
                {score}/{total}
              </p>
              <p className="text-2xl text-muted-foreground">
                {percentage}% Correct
              </p>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 border border-primary/20 ${skillInfo.color}`}>
              <SkillIcon className="w-5 h-5" />
              <span className="font-semibold text-lg">{skillInfo.title}</span>
            </div>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              {skillInfo.message}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="hero"
              onClick={() => navigate("/quiz")}
              className="w-full"
            >
              Take Another Quiz
            </Button>
            <Button
              variant="glass"
              onClick={() => navigate("/")}
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}