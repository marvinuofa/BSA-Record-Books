import { useQuery } from "@tanstack/react-query"
import { fetchPlayers, type Player } from "../components/StatsTable"
import { PlayerItem } from "../components/PlayerItem"

const getTopPlayers = (
    players: Player[],
    stat: keyof Player,
  ) => {
    const sorted = [...players].sort((a, b) =>
        (a[stat] as number) - (b[stat] as number)
    
    )

    return sorted
  }

export const Forty = () => {
    const { data: players } = useQuery({
        queryKey: ["players"],
        queryFn: fetchPlayers
      })
    return(
        <div className="max-w-2xl mx-auto px-4 py-8">
        <table className="w-full table-fixed border-collapse shadow-sm">
    
                <thead className="mb-6 text-[#ffcc08] text-sm">
                    <tr>
                        <th>
                                40 Yard leaders
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {players &&
                        getTopPlayers(players, "forty_dash").map((player, index) => (
                        <PlayerItem key={player.id} player={player} stat="forty_dash" rank = {index+ 1} />
                        ))}
                </tbody>
            </table>
        </div>
    
    )
}