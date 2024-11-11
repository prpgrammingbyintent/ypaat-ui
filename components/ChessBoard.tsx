import { useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

interface ChessBoardProps {
  fen: string;
  onMove?: (from: string, to: string) => void;
  viewOnly?: boolean;
}

export default function ChessBoard({ fen, onMove, viewOnly = false }: ChessBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const chessRef = useRef(new Chess(fen));
  const groundRef = useRef<any>(null);

  useEffect(() => {
    if (!boardRef.current) return;

    const config = {
      fen,
      movable: {
        free: false,
        events: {
          after: (from: string, to: string) => {
            onMove?.(from, to);
          },
        },
        color: 'white',
        dests: new Map(),
      },
      draggable: {
        enabled: !viewOnly,
      },
    };

    if (!viewOnly) {
      const dests = new Map();
      chessRef.current.moves({ verbose: true }).forEach((m: any) => {
        if (!dests.has(m.from)) dests.set(m.from, []);
        dests.get(m.from).push(m.to);
      });
      config.movable.dests = dests;
    }

    groundRef.current = Chessground(boardRef.current, config);

    return () => {
      if (groundRef.current) {
        groundRef.current.destroy();
      }
    };
  }, [fen, onMove, viewOnly]);

  return <div ref={boardRef} className="w-[400px] h-[400px]" />;
}