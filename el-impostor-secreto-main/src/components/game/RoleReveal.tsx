import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { type Player } from '@/hooks/useGame';
import { Eye, ArrowRight, Skull, User } from 'lucide-react';

interface RoleRevealProps {
  player: Player;
  isRevealed: boolean;
  isLastPlayer: boolean;
  onReveal: () => void;
  onNext: () => void;
}

export function RoleReveal({
  player,
  isRevealed,
  isLastPlayer,
  onReveal,
  onNext,
}: RoleRevealProps) {
  const [countdown, setCountdown] = useState(5);
  const [countdownActive, setCountdownActive] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdownActive(true);
    setCountdown(5);
  }, []);

  useEffect(() => {
    if (!countdownActive) return;

    if (countdown === 0) {
      setCountdownActive(false);
      onReveal();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, countdownActive, onReveal]);

  const handleNext = () => {
    setCountdown(5);
    setCountdownActive(false);
    onNext();
  };

  // Countdown state
  if (countdownActive) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="game-card text-center space-y-6 w-full">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Preparando revelación
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Jugador {player.id}
            </h2>
          </div>

          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-full bg-secondary border-4 border-primary/50 flex items-center justify-center animate-pulse-glow">
              <span className="font-display text-6xl font-bold text-primary animate-countdown">
                {countdown}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Asegúrate de que solo Jugador {player.id} vea la pantalla
          </p>
        </div>
      </div>
    );
  }

  // Pre-reveal state
  if (!isRevealed) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="game-card text-center space-y-6 w-full">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Turno de
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Jugador {player.id}
            </h2>
          </div>

          <div className="w-24 h-24 mx-auto rounded-full bg-secondary border-2 border-border flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            <p className="text-foreground font-medium">
              ¿Está listo el Jugador {player.id}?
            </p>
            <p className="text-muted-foreground text-sm">
              Solo esta persona debe ver la pantalla
            </p>
          </div>

          <Button
            variant="impostor"
            size="xl"
            className="w-full"
            onClick={startCountdown}
          >
            <Eye className="w-6 h-6" />
            Revelar Mi Rol
          </Button>
        </div>
      </div>
    );
  }

  // Revealed state
  const isImpostor = player.isImpostor;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div
        className={`game-card text-center space-y-6 w-full transition-all duration-500 ${
          isImpostor ? 'glow-red border-primary/50' : 'glow-teal border-accent/50'
        }`}
        style={{ borderWidth: '2px' }}
      >
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Jugador {player.id}
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Tu Rol Es...
          </h2>
        </div>

        <div
          className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center animate-scale-in ${
            isImpostor
              ? 'bg-gradient-to-br from-primary to-red-700'
              : 'bg-gradient-to-br from-accent to-teal-700'
          }`}
        >
          {isImpostor ? (
            <Skull className="w-14 h-14 text-primary-foreground" />
          ) : (
            <User className="w-14 h-14 text-accent-foreground" />
          )}
        </div>

        <div className="space-y-2">
          {isImpostor ? (
            <>
              <h3 className="font-display text-3xl font-bold text-impostor animate-glow">
                ¡IMPOSTOR!
              </h3>
              <p className="text-muted-foreground">
                No conoces la identidad secreta.
                <br />
                ¡Finge que la conoces!
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-sm">Tu identidad es:</p>
              <h3 className="font-display text-2xl font-bold text-safe">
                {player.identity}
              </h3>
            </>
          )}
        </div>

        <div className="pt-4 space-y-3">
          <Button
            variant={isImpostor ? 'impostor' : 'safe'}
            size="xl"
            className="w-full"
            onClick={handleNext}
          >
            {isLastPlayer ? (
              <>
                ¡Comenzar Juego!
              </>
            ) : (
              <>
                <ArrowRight className="w-6 h-6" />
                Siguiente Jugador
              </>
            )}
          </Button>

          {!isLastPlayer && (
            <p className="text-muted-foreground text-xs">
              Pasa el teléfono al siguiente jugador
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
