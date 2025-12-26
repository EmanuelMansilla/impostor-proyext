import { Button } from '@/components/ui/button';
import { RefreshCw, Users, Target, AlertTriangle } from 'lucide-react';

interface GameStartProps {
  playerCount: number;
  categoryName: string;
  onReset: () => void;
}

export function GameStart({ playerCount, categoryName, onReset }: GameStartProps) {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="game-card text-center space-y-8 w-full glow-red border-2 border-primary/30">
        {/* Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center animate-pulse-glow">
            <Target className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              ¡El Juego Ha
              <br />
              <span className="text-impostor">Comenzado!</span>
            </h1>
          </div>
        </div>

        {/* Game Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="font-display text-2xl font-bold text-foreground">
              {playerCount}
            </p>
            <p className="text-xs text-muted-foreground">Jugadores</p>
          </div>
          
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-display text-2xl font-bold text-impostor">1</p>
            <p className="text-xs text-muted-foreground">Impostor</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 text-left p-4 rounded-xl bg-secondary/30 border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <span className="text-lg">📋</span>
            Cómo Jugar
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              Cada jugador dice algo relacionado con la identidad secreta
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              El impostor debe fingir que conoce la identidad
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              Voten para descubrir quién es el impostor
            </li>
          </ul>
        </div>

        {/* Category Info */}
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            Categoría: <span className="text-foreground font-medium">{categoryName}</span>
          </p>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="xl"
          className="w-full"
          onClick={onReset}
        >
          <RefreshCw className="w-5 h-5" />
          Nueva Partida
        </Button>
      </div>
    </div>
  );
}
