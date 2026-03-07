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

  export const FixturesTable = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [sport, setSport] = useState("Soccer")
    const [tournamentStage, setTournamentStage] = useState("Groupstage")
  
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
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Filters */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold ">Fixtures</h1>

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
            <select
                className="rounded border px-3 py-2"
                value={tournamentStage}
                onChange={(e) => setTournamentStage(e.target.value)}
                >
                <option value="Groupstage">Groupstage</option>
                <option value="Playoffs">Playoffs</option>
            </select>
          </div>

        </div>
  
        {/* Table */}
        {(tournamentStage === "Groupstage")?(
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-sm">
            <thead className="bg-[#ffcc08] text-center text-black">
                <tr>
                    <th className="px-4 py-2">Groupstage</th>
                </tr>
            </thead>

            <tbody>
                Add fixtures
            </tbody>
  
          </table>
        </div>):
        (
            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-sm">
                
                <thead className="bg-[#ffcc08] text-center text-black">
                    <tr>
                        <th className="px-4 py-2">Playoffs</th>
                    </tr>
                    </thead>

                <tbody>
                    Add fixtures
                </tbody>

                </table>
            </div>)
        }
  
      </div>
    )
  }