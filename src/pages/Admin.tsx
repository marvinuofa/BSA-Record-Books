import { useMemo, useState } from "react"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { supabase } from "../supabase-client"
import { EditableTableItem } from "../components/EditableTableItem"

export interface Team {
  id: number
  team: string
  sport: string
  year: number
  wins: number
  losses: number
  draws: number
  total_points: number
  points_for: number
  points_against: number
  point_diff: number
}

export interface Player {
  id: number
  name: string
  team: string
  forty_dash: number | null
  broad_jump: number | null
  accuracy_drill: number | null
  crossbar: number | null
  tds: number | null
  goals: number | null
  assists: number | null
  red_cards: number | null
  yellow_cards: number | null
  player_img: string | null
}

interface Year {
  year: number
}

interface Sport {
  name: string
}

type AdminView = "Teams" | "Players"
type PlayerFormValues = Omit<Player, "id"> & { id?: number }

const emptyPlayer: PlayerFormValues = {
  name: "",
  team: "",
  forty_dash: null,
  broad_jump: null,
  accuracy_drill: null,
  crossbar: null,
  tds: null,
  goals: null,
  assists: null,
  red_cards: null,
  yellow_cards: null,
  player_img: null,
}

const fetchTeams = async (year: number, sport: string): Promise<Team[]> => {
  const { data, error } = await supabase
    .from("standings")
    .select("*")
    .eq("year", year)
    .eq("sport", sport)
    .order("total_points", { ascending: false })

  if (error) throw new Error(error.message)
  return data as Team[]
}

const fetchYears = async (): Promise<Year[]> => {
  const { data, error } = await supabase
    .from("seasons")
    .select("year")
    .order("year", { ascending: false })

  if (error) throw new Error(error.message)
  return data as Year[]
}

const fetchSports = async (): Promise<Sport[]> => {
  const { data, error } = await supabase.from("sports").select("name")

  if (error) throw new Error(error.message)
  return data as Sport[]
}

const fetchPlayers = async (teamFilter: string): Promise<Player[]> => {
  let query = supabase
    .from("players")
    .select("*")
    .order("name", { ascending: true })

  if (teamFilter !== "All") {
    query = query.eq("team", teamFilter)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data as Player[]
}

const upsertPlayer = async (player: PlayerFormValues) => {
  const payload = {
    ...(player.id ? { id: player.id } : {}),
    name: player.name,
    team: player.team,
    forty_dash: player.forty_dash,
    broad_jump: player.broad_jump,
    accuracy_drill: player.accuracy_drill,
    crossbar: player.crossbar,
    tds: player.tds,
    goals: player.goals,
    assists: player.assists,
    red_cards: player.red_cards,
    yellow_cards: player.yellow_cards,
    player_img: player.player_img,
  }

  const { error } = await supabase.from("players").upsert(payload)

  if (error) throw new Error(error.message)
}

const removePlayer = async (id: number) => {
  const { error } = await supabase.from("players").delete().eq("id", id)

  if (error) throw new Error(error.message)
}

type PlayerFormProps = {
  player: PlayerFormValues
  teamOptions: string[]
  onCancel: () => void
  onSave: (player: PlayerFormValues) => void
  isSaving: boolean
}

const PlayerForm = ({
  player,
  teamOptions,
  onCancel,
  onSave,
  isSaving,
}: PlayerFormProps) => {
  const [form, setForm] = useState<PlayerFormValues>(player)

  const handleNumberChange = (
    field: keyof PlayerFormValues,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value === "" ? null : Number(value),
    }))
  }

  return (
    <div className="mb-6 rounded border border-neutral-800 p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        {form.id ? "Edit Player" : "Add Player"}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          className="rounded border px-3 py-2"
          placeholder="Player name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />

        <select
          className="rounded border px-3 py-2"
          value={form.team}
          onChange={(e) => setForm((prev) => ({ ...prev, team: e.target.value }))}
        >
          <option value="">Select team</option>
          {teamOptions.map((teamName) => (
            <option key={teamName} value={teamName}>
              {teamName}
            </option>
          ))}
        </select>

        <input
          className="rounded border px-3 py-2"
          placeholder="Image URL"
          value={form.player_img ?? ""}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              player_img: e.target.value === "" ? null : e.target.value,
            }))
          }
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          step="0.01"
          placeholder="40 yard dash"
          value={form.forty_dash ?? ""}
          onChange={(e) => handleNumberChange("forty_dash", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          step="0.01"
          placeholder="Broad jump"
          value={form.broad_jump ?? ""}
          onChange={(e) => handleNumberChange("broad_jump", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Accuracy drill"
          value={form.accuracy_drill ?? ""}
          onChange={(e) => handleNumberChange("accuracy_drill", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Crossbar"
          value={form.crossbar ?? ""}
          onChange={(e) => handleNumberChange("crossbar", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="TDs"
          value={form.tds ?? ""}
          onChange={(e) => handleNumberChange("tds", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Goals"
          value={form.goals ?? ""}
          onChange={(e) => handleNumberChange("goals", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Assists"
          value={form.assists ?? ""}
          onChange={(e) => handleNumberChange("assists", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Yellow cards"
          value={form.yellow_cards ?? ""}
          onChange={(e) => handleNumberChange("yellow_cards", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Red cards"
          value={form.red_cards ?? ""}
          onChange={(e) => handleNumberChange("red_cards", e.target.value)}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          className="rounded bg-[#ffcc08] px-4 py-2 font-semibold text-black disabled:opacity-60"
          onClick={() => onSave(form)}
          disabled={isSaving || !form.name.trim() || !form.team.trim()}
        >
          {isSaving ? "Saving..." : "Save Player"}
        </button>

        <button
          className="rounded border px-4 py-2"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export const Admin = () => {
  const queryClient = useQueryClient()

  const [view, setView] = useState<AdminView>("Teams")
  const [year, setYear] = useState(new Date().getFullYear())
  const [sport, setSport] = useState("Soccer")
  const [teamFilter, setTeamFilter] = useState("All")
  const [editingPlayer, setEditingPlayer] = useState<PlayerFormValues | null>(null)

  const {
    data: teams,
    isLoading: teamsLoading,
    error: teamsError,
  } = useQuery({
    queryKey: ["teams", year, sport],
    queryFn: () => fetchTeams(year, sport),
  })

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: fetchYears,
  })

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: fetchSports,
  })

  const {
    data: players,
    isLoading: playersLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players", teamFilter],
    queryFn: () => fetchPlayers(teamFilter),
    enabled: view === "Players",
  })

  const savePlayerMutation = useMutation({
    mutationFn: upsertPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] })
      setEditingPlayer(null)
    },
  })

  const deletePlayerMutation = useMutation({
    mutationFn: removePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] })
    },
  })

  const playerTeamOptions = useMemo(() => {
    const fromTeams = (teams ?? []).map((team) => team.team)
    const fromPlayers = (players ?? []).map((player) => player.team)

    return [...new Set([...fromTeams, ...fromPlayers])].sort((a, b) =>
      a.localeCompare(b)
    )
  }, [teams, players])

  if (view === "Teams" && teamsLoading) {
    return <div className="py-10 text-center">Loading standings...</div>
  }

  if (view === "Teams" && teamsError) {
    return (
      <div className="py-10 text-center text-red-500">
        Error loading standings
      </div>
    )
  }

  if (view === "Players" && playersLoading) {
    return <div className="py-10 text-center">Loading players...</div>
  }

  if (view === "Players" && playersError) {
    return (
      <div className="py-10 text-center text-red-500">
        Error loading players
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Admin</h1>

        <div className="flex flex-wrap gap-4">
          <select
            className="rounded border px-3 py-2"
            value={view}
            onChange={(e) => {
              const nextView = e.target.value as AdminView
              setView(nextView)
              setEditingPlayer(null)
            }}
          >
            <option value="Teams">Teams</option>
            <option value="Players">Players</option>
          </select>

          <select
            className="rounded border px-3 py-2"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years?.map((y) => (
              <option key={y.year} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>

          <select
            className="rounded border px-3 py-2"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            {sports?.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {view === "Players" && (
            <select
              className="rounded border px-3 py-2"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="All">All Teams</option>
              {playerTeamOptions.map((teamName) => (
                <option key={teamName} value={teamName}>
                  {teamName}
                </option>
              ))}
            </select>
          )}

          {view === "Players" && (
            <button
              className="rounded bg-[#ffcc08] px-4 py-2 font-semibold text-black"
              onClick={() => setEditingPlayer({ ...emptyPlayer })}
            >
              Add Player
            </button>
          )}
        </div>
      </div>

      {view === "Teams" ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead className="bg-[#ffcc08] text-left text-black">
              <tr>
                <th className="px-4 py-3">Team</th>
                <th className="px-3 py-3">W</th>
                <th className="px-3 py-3">L</th>
                <th className="px-3 py-3">D</th>
                <th className="px-3 py-3">PF</th>
                <th className="px-3 py-3">PA</th>
                <th className="px-3 py-3">Diff</th>
                <th className="px-3 py-3 font-semibold">Pts</th>
                <th className="px-3 py-3">Change</th>
              </tr>
            </thead>

            <tbody>
              {teams?.map((team) => (
                <EditableTableItem key={team.id} team={team} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          {editingPlayer && (
            <PlayerForm
              player={editingPlayer}
              teamOptions={playerTeamOptions}
              onCancel={() => setEditingPlayer(null)}
              onSave={(player) => savePlayerMutation.mutate(player)}
              isSaving={savePlayerMutation.isPending}
            />
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-sm">
              <thead className="bg-[#ffcc08] text-left text-black">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">40</th>
                  <th className="px-4 py-3">Broad</th>
                  <th className="px-4 py-3">Accuracy</th>
                  <th className="px-4 py-3">Crossbar</th>
                  <th className="px-4 py-3">TDs</th>
                  <th className="px-4 py-3">Goals</th>
                  <th className="px-4 py-3">Assists</th>
                  <th className="px-4 py-3">YC</th>
                  <th className="px-4 py-3">RC</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {players?.map((player) => (
                  <tr key={player.id} className="border-b border-neutral-800">
                    <td className="px-4 py-3">{player.name}</td>
                    <td className="px-4 py-3">{player.team}</td>
                    <td className="px-4 py-3">{player.forty_dash ?? "-"}</td>
                    <td className="px-4 py-3">{player.broad_jump ?? "-"}</td>
                    <td className="px-4 py-3">{player.accuracy_drill ?? "-"}</td>
                    <td className="px-4 py-3">{player.crossbar ?? "-"}</td>
                    <td className="px-4 py-3">{player.tds ?? "-"}</td>
                    <td className="px-4 py-3">{player.goals ?? "-"}</td>
                    <td className="px-4 py-3">{player.assists ?? "-"}</td>
                    <td className="px-4 py-3">{player.yellow_cards ?? "-"}</td>
                    <td className="px-4 py-3">{player.red_cards ?? "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="rounded border px-3 py-1"
                          onClick={() => setEditingPlayer({ ...player })}
                        >
                          Edit
                        </button>

                        <button
                          className="rounded border px-3 py-1 text-red-500"
                          onClick={() => deletePlayerMutation.mutate(player.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {players?.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-4 py-6 text-center text-neutral-400">
                      No players found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}