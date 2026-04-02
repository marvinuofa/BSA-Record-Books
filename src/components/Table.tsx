import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client"
import { TableItem } from "./TableItem"

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
  
  interface Year {
    year: number
  }
  
  interface Sport {
    name: string
  }

const fetchTeams = async (
    year: number,
    sport: string
  ): Promise<Team[]> => {
  
    const { data, error } = await supabase
      .from("standings")
      .select("*")
      .eq("year", year)
      .eq("sport", sport)
      .order("total_points", { ascending: false })
  
    if (error) throw new Error(error.message)
    console.log(data)
  
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
  
    const { data, error } = await supabase
      .from("sports")
      .select("name")

    if (error) throw new Error(error.message)
  
    return data as Sport[]
  }

  export const Table = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [sport, setSport] = useState("Soccer")
  
    const { data: teams, isLoading, error } = useQuery({
      queryKey: ["teams", year, sport],
      queryFn: () => fetchTeams(year, sport)
    })
  
    const { data: years } = useQuery({
      queryKey: ["years"],
      queryFn: fetchYears
    })
  
    const { data: sports } = useQuery({
      queryKey: ["sports"],
      queryFn: fetchSports
    })
  
    if (isLoading) return <div className="text-center py-10">Loading standings...</div>
    if (error) return <div className="text-center py-10 text-red-500">Error loading standings</div>
  
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Filters */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold ">Leaderboard</h1>

          <div className="flex gap-4">
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
          </div>
        </div>
  
        {/* Table */}
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
                </tr>
                </thead>
  
            <tbody>
              {teams?.map((team) => (
                <TableItem key={team.id} team={team} />
              ))}
            </tbody>
  
          </table>
        </div>
  
      </div>
    )
  }