import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImage from "@/assets/hero-coding.jpg";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            About CodeMaster
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              Enhance Your Python Comprehension
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              CodeMaster is an advanced code comprehension enhancer designed to help developers
              improve their Python programming skills through AI-powered assessments.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Features:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Dynamic AI-generated Python quizzes tailored to your skill level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Intelligent skill assessment (Beginner, Intermediate, Advanced)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Interactive learning experience with instant feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Track your progress and improve over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Secure authentication and personalized learning paths</span>
                </li>
              </ul>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Whether you're a beginner looking to strengthen your fundamentals or an experienced
              developer aiming to master advanced concepts, CodeMaster provides the perfect
              platform to enhance your Python expertise.
            </p>
          </div>
          
          <div className="relative">
            <img
              src={heroImage}
              alt="Coding illustration"
              className="w-full h-full object-cover rounded-lg shadow-card"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};