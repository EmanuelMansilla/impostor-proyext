import { Button } from '@/components/ui/button';
import { type Category } from '@/data/categories';
import { Users, Play, Minus, Plus } from 'lucide-react';

interface SetupPhaseProps {
  playerCount: number;
  selectedCategory: Category | null;
  categories: Category[];
  onPlayerCountChange: (count: number) => void;
  onCategorySelect: (category: Category) => void;
  onStartGame: () => void;
}

export function SetupPhase({
  playerCount,
  selectedCategory,
  categories,
  onPlayerCountChange,
  onCategorySelect,
  onStartGame,
}: SetupPhaseProps) {
  const canStart = playerCount >= 2 && selectedCategory !== null;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wider">
          <span className="text-impostor">EL</span>{' '}
          <span className="text-foreground">IMPOSTOR</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          ¿Quién es el impostor entre ustedes?
        </p>
      </div>

      {/* Player Count */}
      <div className="game-card space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Users className="w-5 h-5" />
          <span className="font-medium">Número de Jugadores</span>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPlayerCountChange(Math.max(2, playerCount - 1))}
            disabled={playerCount <= 2}
          >
            <Minus className="w-5 h-5" />
          </Button>
          
          <div className="w-20 h-16 flex items-center justify-center rounded-xl bg-secondary border border-border">
            <span className="font-display text-3xl font-bold text-foreground">
              {playerCount}
            </span>
          </div>
          
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPlayerCountChange(Math.min(10, playerCount + 1))}
            disabled={playerCount >= 10}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          Mínimo 2, máximo 10 jugadores
        </p>
      </div>

      {/* Category Selection */}
      <div className="game-card space-y-4">
        <span className="font-medium text-muted-foreground">
          Selecciona una Categoría
        </span>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${
                  selectedCategory?.id === category.id
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                    : 'border-border bg-secondary/50 hover:border-primary/50 hover:bg-secondary'
                }
              `}
            >
              <span className="text-2xl block mb-1">{category.emoji}</span>
              <span className="text-sm font-medium text-foreground leading-tight block">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <Button
        variant="impostor"
        size="xl"
        className="w-full"
        disabled={!canStart}
        onClick={onStartGame}
      >
        <Play className="w-6 h-6" />
        Iniciar Juego
      </Button>

      {!canStart && (
        <p className="text-center text-sm text-muted-foreground">
          Selecciona una categoría para comenzar
        </p>
      )}
    </div>
  );
}
