import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);
      await fetchQuestions();
    };

    checkAuth();
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await supabase.functions.invoke("generate-quiz", {
        body: { difficulty: "beginner" },
      });

      if (response.error) throw response.error;

      if (response.data?.questions) {
        setQuestions(response.data.questions);
      } else {
        toast.error("Failed to load quiz questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score;
    const percentage = (finalScore / questions.length) * 100;
    
    let skillLevel: "beginner" | "intermediate" | "advanced";
    if (percentage >= 80) {
      skillLevel = "advanced";
    } else if (percentage >= 50) {
      skillLevel = "intermediate";
    } else {
      skillLevel = "beginner";
    }

    if (userId) {
      try {
        const { error } = await supabase.from("quiz_results").insert([{
          user_id: userId,
          score: finalScore,
          total_questions: questions.length,
          skill_level: skillLevel,
          quiz_data: { questions } as any,
        }]);
        
        if (error) {
          console.error("Error saving quiz result:", error);
        }
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    }

    navigate("/results", { 
      state: { 
        score: finalScore, 
        total: questions.length, 
        skillLevel 
      } 
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Generating your quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-card">
          <CardContent className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">Failed to load quiz questions.</p>
            <Button onClick={fetchQuestions} variant="hero">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Python Quiz
          </h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="shadow-card border-primary/20 animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                Score: {score}/{questions.length}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
            
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-card/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button
              onClick={handleNext}
              variant="hero"
              className="w-full"
              disabled={selectedAnswer === null}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}