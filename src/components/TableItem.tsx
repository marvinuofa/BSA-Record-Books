import type { Team } from "./Table"

interface Props {
  team: Team
}

export const TableItem = ({ team }: Props) => {
    return (
      <tr className="border-b">
        <td className="px-4 py-3 font-medium">{team.team}</td>
        <td className="px-3 py-3">{team.wins}</td>
        <td className="px-3 py-3">{team.losses}</td>
        <td className="px-3 py-3">{team.draws}</td>
        <td className="px-3 py-3">{team.points_for}</td>
        <td className="px-3 py-3">{team.points_against}</td>
        <td className="px-3 py-3">{team.point_diff}</td>
        <td className="px-3 py-3 font-bold">{team.total_points}</td>
      </tr>
    )
  }