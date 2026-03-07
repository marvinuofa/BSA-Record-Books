import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../supabase-client"
import { TableItem } from "./TableItem"
import { PlayerItem } from "./PlayerItem"
import { Link } from "react-router"

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

  export const StatsTable = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [sport, setSport] = useState("Soccer")
    const [statCategory, setStatCategory] = useState("Players")
    const [competition, setCompetition] = useState("Combine")
  
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
            <h1 className="text-2xl font-bold ">Stats</h1>

            {/* Year */}
            <div className="flex gap-4">
            <select
                className="border rounded px-3 py-2"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            >
                {years?.map((y) => (
                <option key={y.year} value={y.year}>
                    {y.year}
                </option>
                ))}
            </select>

            {/* Competition */}
            <select
                className="border rounded px-3 py-2"
                value={competition}
                onChange={(e) => {
                const value = e.target.value
                setCompetition(value)

                if (value === "Combine") {
                    setStatCategory("Players")
                }
                }}
            >
                <option value="Combine">Combine</option>
                <option value="Tournament">Tournament</option>
            </select>

            {/* Category */}
            <select
                className="border rounded px-3 py-2"
                value={statCategory}
                onChange={(e) => setStatCategory(e.target.value)}
            >
                <option value="Players">Players</option>

                {competition === "Tournament" && (
                <option value="Team">Team</option>
                )}
            </select>

            {/* Sport (Tournament only) */}
            {competition === "Tournament" && (
                <select
                className="border rounded px-3 py-2"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                >
                {sports?.map((s) => (
                    <option key={s.name} value={s.name}>
                    {s.name}
                    </option>
                ))}
                </select>
            )}
            </div>
        </div>
  
        {/* Table */}

        {/*Combine Stats for all players */}
        {(competition === "Combine")? 
        <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse shadow-sm">
  
            <thead className="text-[#ffcc08] text-sm">
                <tr>
                    <Link to="/" className="flex items-center">
                        40 Yard
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>

            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center ">
                        Broad Jump
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>
            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center">
                        Accuracy Drill
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>
            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center">
                        CrossBar Challenge
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>

            </table>
            </div> 
            
            :(statCategory === "Players" )? (sport === "Soccer")? // {/*Toutnament stats for players who play soccer*/}

            <div className="overflow-x-auto">
             <table className="w-full table-fixed border-collapse shadow-sm">
  
            <thead className="text-[#ffcc08] text-sm">
                <tr>
                    <Link to="/" className="flex items-center">
                        Goals
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>

            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center ">
                        Assists
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>

            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center ">
                        Red Cards
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>
            <thead className="text-[#ffcc08] text-sm">
                <tr>
                <Link to="/" className="flex items-center">
                        Yellow 
                        <svg
                            width="16"
                            height="11"
                            viewBox="-19.04 0 75.804 75.804"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g transform="translate(-831.568 -384.448)">
                            <path
                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                fill="#ffcc08"
                            />
                            </g>
                        </svg>
                    </Link>
                </tr>
            </thead>

            <tbody>
                {teams?.map((team) => (
                <PlayerItem />
                ))}
            </tbody>
            </table>
            </div> :  // {/*Toutnament stats for players who play Football*/}
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse shadow-sm">
    
                <thead className="text-[#ffcc08] text-sm">
                    <tr>
                        <Link to="/" className="flex items-center">
                            TDs
                            <svg
                                width="16"
                                height="11"
                                viewBox="-19.04 0 75.804 75.804"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="translate(-831.568 -384.448)">
                                <path
                                    d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                    fill="#ffcc08"
                                />
                                </g>
                            </svg>
                        </Link>
                    </tr>
                </thead>

                <tbody>
                    {teams?.map((team) => (
                    <PlayerItem />
                    ))}
                </tbody>
                </table>
            </div>:  // {/*Toutnament stats for players who play soccer/football*/}

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
        }
       
      </div>
    )
  }