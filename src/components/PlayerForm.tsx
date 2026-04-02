import { useState } from "react"
import type { Team } from "../pages/Admin"

type PlayerFormProps = {
  player: {
    id?: number
    name: string
    team: string
    sport: string
    year: number
    forty_dash: number | null
    broad_jump: number | null
    accuracy_drill: number | null
    crossbar: number | null
    tds: number | null
    goals: number | null
    assists: number | null
    red_cards: number | null
    yellow_cards: number | null
  }
  teams: Team[]
  onCancel: () => void
  onSave: (player: any) => void
}

export const PlayerForm = ({ player, teams, onCancel, onSave }: PlayerFormProps) => {
  const [form, setForm] = useState(player)

  const handleNumberChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value === "" ? null : Number(value),
    }))
  }

  return (
    <div className="rounded border p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {form.id ? "Edit Player" : "Add Player"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="rounded border px-3 py-2"
          placeholder="Player name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="rounded border px-3 py-2"
          value={form.team}
          onChange={(e) => setForm({ ...form, team: e.target.value })}
        >
          <option value="">Select team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.team}>
              {team.team}
            </option>
          ))}
        </select>

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
          placeholder="40 yard"
          value={form.forty_dash ?? ""}
          onChange={(e) => handleNumberChange("forty_dash", e.target.value)}
        />

        <input
          className="rounded border px-3 py-2"
          type="number"
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
          className="rounded bg-[#ffcc08] px-4 py-2 text-black font-semibold"
          onClick={() => onSave(form)}
        >
          Save Player
        </button>

        <button
          className="rounded border px-4 py-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}