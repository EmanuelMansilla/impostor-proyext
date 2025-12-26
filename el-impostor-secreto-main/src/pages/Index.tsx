import { useGame } from '@/hooks/useGame';
import { SetupPhase } from '@/components/game/SetupPhase';
import { RoleReveal } from '@/components/game/RoleReveal';
import { GameStart } from '@/components/game/GameStart';

const Index = () => {
  const {
    gameState,
    categories,
    currentPlayer,
    isLastPlayer,
    setPlayerCount,
    setSelectedCategory,
    startGame,
    revealCurrentPlayer,
    nextPlayer,
    resetGame,
  } = useGame();

  return (
    <main className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center py-4">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        {gameState.phase === 'setup' && (
          <SetupPhase
            playerCount={gameState.playerCount}
            selectedCategory={gameState.selectedCategory}
            categories={categories}
            onPlayerCountChange={setPlayerCount}
            onCategorySelect={setSelectedCategory}
            onStartGame={startGame}
          />
        )}

        {gameState.phase === 'reveal' && currentPlayer && (
          <RoleReveal
            player={currentPlayer}
            isRevealed={currentPlayer.revealed}
            isLastPlayer={isLastPlayer}
            onReveal={revealCurrentPlayer}
            onNext={nextPlayer}
          />
        )}

        {gameState.phase === 'playing' && gameState.selectedCategory && (
          <GameStart
            playerCount={gameState.playerCount}
            categoryName={gameState.selectedCategory.name}
            onReset={resetGame}
          />
        )}
      </div>
    </main>
  );
};

export default Index;
