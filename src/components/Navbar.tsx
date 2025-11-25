import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onAboutClick?: () => void;
}

export const Navbar = ({ onAboutClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="CodeMaster" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeMaster
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onAboutClick}
              className="text-foreground hover:text-primary"
            >
              About
            </Button>
            <Link to="/guide">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Guide
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};