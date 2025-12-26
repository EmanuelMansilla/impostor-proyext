import { useState, useCallback, useMemo } from 'react';
import { categories, type Category } from '@/data/categories';

export type GamePhase = 'setup' | 'reveal' | 'playing';

export interface Player {
  id: number;
  isImpostor: boolean;
  identity: string;
  revealed: boolean;
}

export interface GameState {
  phase: GamePhase;
  playerCount: number;
  selectedCategory: Category | null;
  players: Player[];
  currentRevealIndex: number;
  selectedIdentity: string;
}

const initialState: GameState = {
  phase: 'setup',
  playerCount: 4,
  selectedCategory: null,
  players: [],
  currentRevealIndex: 0,
  selectedIdentity: '',
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setPlayerCount = useCallback((count: number) => {
    setGameState((prev) => ({ ...prev, playerCount: count }));
  }, []);

  const setSelectedCategory = useCallback((category: Category) => {
    setGameState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const startGame = useCallback(() => {
    const { playerCount, selectedCategory } = gameState;
    
    if (!selectedCategory || playerCount < 2) return;

    // Random identity from category
    const randomIndex = Math.floor(Math.random() * selectedCategory.items.length);
    const selectedIdentity = selectedCategory.items[randomIndex];

    // Random impostor index
    const impostorIndex = Math.floor(Math.random() * playerCount);

    // Create players
    const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      isImpostor: i === impostorIndex,
      identity: i === impostorIndex ? 'IMPOSTOR' : selectedIdentity,
      revealed: false,
    }));

    setGameState((prev) => ({
      ...prev,
      phase: 'reveal',
      players,
      selectedIdentity,
      currentRevealIndex: 0,
    }));
  }, [gameState]);

  const revealCurrentPlayer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player, index) =>
        index === prev.currentRevealIndex
          ? { ...player, revealed: true }
          : player
      ),
    }));
  }, []);

  const nextPlayer = useCallback(() => {
    setGameState((prev) => {
      const nextIndex = prev.currentRevealIndex + 1;
      if (nextIndex >= prev.players.length) {
        return { ...prev, phase: 'playing' };
      }
      return {
        ...prev,
        currentRevealIndex: nextIndex,
        players: prev.players.map((p) => ({ ...p, revealed: false })),
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const currentPlayer = useMemo(() => {
    return gameState.players[gameState.currentRevealIndex] || null;
  }, [gameState.players, gameState.currentRevealIndex]);

  const isLastPlayer = useMemo(() => {
    return gameState.currentRevealIndex === gameState.players.length - 1;
  }, [gameState.currentRevealIndex, gameState.players.length]);

  return {
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
  };
}
