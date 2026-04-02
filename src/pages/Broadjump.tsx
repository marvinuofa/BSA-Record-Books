import { useQuery } from "@tanstack/react-query"
import { fetchPlayers, type Player } from "../components/StatsTable"
import { PlayerItem } from "../components/PlayerItem"

const getTopPlayers = (
    players: Player[],
    stat: keyof Player,
  ) => {
    const sorted = [...players].sort((a, b) =>
        (b[stat] as number) - (a[stat] as number)
    
    )

    return sorted
  }

export const Broadjump = () => {
    const { data: players } = useQuery({
        queryKey: ["players"],
        queryFn: fetchPlayers
      })
    return(
        <div className="max-w-2xl mx-auto px-4 py-8">
            <table className="w-full table-fixed border-collapse shadow-sm">
        
                <thead className="text-[#ffcc08] text-sm">
                        <tr>
                            <th>
                                    Broad-Jump Leaders
                            </th>
                        </tr>
                    </thead>

                <tbody>
                    {players &&
                        getTopPlayers(players, "broad_jump").map((player, index) => (
                        <PlayerItem key={player.id} player={player} stat= "broad_jump" rank = {index+ 1}/>
                        ))}
                </tbody>
            </table>
        </div>
    
    )
}