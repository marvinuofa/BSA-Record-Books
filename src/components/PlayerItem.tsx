import type { Player } from "./StatsTable"

interface PlayerItemProps {
    player: Player
    stat: keyof Player
    rank: number
  }
  
  export const PlayerItem = ({ player, stat, rank }: PlayerItemProps) => {
    return (
      <div className="grid grid-cols-[30px_1fr_auto] border-b border-neutral-800 py-2 max-w-5xl items-center">
        
        {/* Rank */}
        <span className="text-neutral-500 text-sm">
          {rank}
        </span>
  
        {/* Name + Team */}
        <div className="flex flex-col">
          <span className="font-medium">{player.name}</span>
          <span className="text-xs text-neutral-400">{player.team}</span>
        </div>
  
        {/* Stat */}
        <span className="text-right">
          {player[stat]}
        </span>
  
      </div>
    )
  }