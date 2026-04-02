import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../supabase-client"
import type { Team } from "../pages/Admin"

interface Props {
  team: Team
}

const updateTeam = async (team: Team) => {
  const { error } = await supabase
    .from("team_seasons")
    .update({
      wins: team.wins,
      losses: team.losses,
      draws: team.draws,
      points_for: team.points_for,
      points_against: team.points_against,
    })
    .eq("id", team.id)

  if (error) throw new Error(error.message)
  return team
}

export const EditableTableItem = ({ team }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Team>(team)

  const queryClient = useQueryClient()

  useEffect(() => {
    setFormData(team)
  }, [team])

  const mutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      setIsEditing(false)
    },
  })

  const handleChange = (field: keyof Team, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof prev[field] === "number" ? Number(value) : value,
    }))
  }

  const handleSave = () => {
    mutation.mutate(formData)
  }

  const handleCancel = () => {
    setFormData(team)
    setIsEditing(false)
  }

  return (
    <tr className="border-b">
      <td className="px-4 py-3">{team.team}</td>

      {isEditing ? (
        <>
          <td className="px-3 py-3">
            <input
              type="number"
              value={formData.wins}
              onChange={(e) => handleChange("wins", e.target.value)}
              className="w-16 rounded border px-2 py-1"
            />
          </td>
          <td className="px-3 py-3">
            <input
              type="number"
              value={formData.losses}
              onChange={(e) => handleChange("losses", e.target.value)}
              className="w-16 rounded border px-2 py-1"
            />
          </td>
          <td className="px-3 py-3">
            <input
              type="number"
              value={formData.draws}
              onChange={(e) => handleChange("draws", e.target.value)}
              className="w-16 rounded border px-2 py-1"
            />
          </td>
          <td className="px-3 py-3">
            <input
              type="number"
              value={formData.points_for}
              onChange={(e) => handleChange("points_for", e.target.value)}
              className="w-16 rounded border px-2 py-1"
            />
          </td>
          <td className="px-3 py-3">
            <input
              type="number"
              value={formData.points_against}
              onChange={(e) => handleChange("points_against", e.target.value)}
              className="w-16 rounded border px-2 py-1"
            />
          </td>
          <td className="px-3 py-3">
            {formData.points_for - formData.points_against}
          </td>
          <td className="px-3 py-3">
            {formData.wins * 3 + formData.draws}
          </td>

          <td className="px-3 py-3 flex gap-2">
            <button
              onClick={handleSave}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="rounded bg-gray-500 px-3 py-1 text-white"
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-3 py-3">{team.wins}</td>
          <td className="px-3 py-3">{team.losses}</td>
          <td className="px-3 py-3">{team.draws}</td>
          <td className="px-3 py-3">{team.points_for}</td>
          <td className="px-3 py-3">{team.points_against}</td>
          <td className="px-3 py-3">{team.point_diff}</td>
          <td className="px-3 py-3">{team.total_points}</td>

          <td className="px-3 py-3">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-blue-600 px-3 py-1 text-white"
            >
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  )
}