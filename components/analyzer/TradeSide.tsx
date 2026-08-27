import React from "react";
import { Player } from "@/lib/trade/types";
import { PlayerSearch } from "./PlayerSearch";
import { SelectedPlayer } from "./SelectedPlayer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface TradeSideProps {
  title: string;
  themeColor: "blue" | "amber";
  selectedPlayers: Player[];
  availablePlayers: Player[];
  scoring: "roto" | "points";
  onAddPlayer: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

export function TradeSide({
  title,
  themeColor,
  selectedPlayers,
  availablePlayers,
  scoring,
  onAddPlayer,
  onRemovePlayer,
}: TradeSideProps) {
  const isBlue = themeColor === "blue";
  
  return (
    <Card className={`border-t-4 h-full flex flex-col shadow-md ${isBlue ? "border-t-primary-blue" : "border-t-amber"}`}>
      <CardHeader className="bg-white border-b-0 pb-4">
        <CardTitle className={isBlue ? "text-primary-blue" : "text-amber"}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow flex flex-col pt-0">
        <div className="z-20">
          <PlayerSearch 
            availablePlayers={availablePlayers} 
            onSelect={onAddPlayer} 
            placeholder="Search to add player..."
          />
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-3">
            {selectedPlayers.length === 0 && (
              <li className="flex h-[120px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-muted-text italic">
                No players selected
              </li>
            )}
            {selectedPlayers.map((player) => (
              <li key={player.id} className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                <SelectedPlayer 
                  player={player} 
                  scoring={scoring} 
                  onRemove={() => onRemovePlayer(player.id)} 
                />
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
