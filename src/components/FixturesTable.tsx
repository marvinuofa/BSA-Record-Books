import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

interface Fixture {
  id: number;
  sport: string;
  year : number;
  stage: string;
  game_round: number;
  home_team: string;
  away_team: string;
  home_team_score: number;
  away_team_score: number;
  fixture_time: string | null;
  played: boolean;
}

const fetchFixtures = async (
    year: number,
    sport: string,
    stage: string,
    round?: number
  ): Promise<Fixture[]> => {
  
    let query = supabase
      .from("fixtures")
      .select(`
        id,
        sport,
        year,
        stage,
        game_round,
        home_team,
        away_team,
        home_team_score,
        away_team_score,
        fixture_time,
        played
      `)
      .eq("year", year)
      .eq("sport", sport)
      .eq("stage", stage)
      .order("game_round", { ascending: true })
      .order("fixture_time", { ascending: true });
  
    if (round !== undefined) {
      query = query.eq("game_round", round);
    }
  
    const { data, error } = await query;

    if (error) throw new Error(error.message);
  
    return data as Fixture[];
  };

const { data } = await supabase.from("fixtures").select("*");
console.log("all fixtures", data);


export const FixturesTable = () => {
  const [year, setYear] = useState(Number(new Date().getFullYear()));
  const [sport, setSport] = useState("Soccer");
  const [stage, setStage] = useState("Groupstage");
  const [round, setRound] = useState<number | undefined>(undefined);



  const { data: fixtures, isLoading, error } = useQuery({
    queryKey: ["fixtures", year, sport, stage, round],
    queryFn: () => fetchFixtures(year,sport,stage,round)
  });

  if (isLoading) return <div className="py-10 text-center">Loading fixtures...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Error loading fixtures</div>;


  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Fixtures</h1>
  
        <div className="flex flex-wrap gap-4">
          <select
            className="rounded border px-3 py-2"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <option value={2026}>2026</option>
          </select>
  
          <select
            className="rounded border px-3 py-2"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
          </select>
  
          <select
            className="rounded border px-3 py-2"
            value={stage}
            onChange={(e) => {
              setStage(e.target.value);
              setRound(undefined);
            }}
          >
            <option value="Groupstage">Groupstage</option>
            <option value="Playoffs">Playoffs</option>
          </select>
  
          <select
            className="rounded border px-3 py-2"
            value={round ?? ""}
            onChange={(e) =>
              setRound(e.target.value ? Number(e.target.value) : undefined)
            }
          >
            <option value="">All rounds</option>
            <option value="1">Round 1</option>
            <option value="2">Round 2</option>
            <option value="3">Round 3</option>
          </select>
        </div>
      </div>
  
      <div className="mx-auto max-w-3xl">
  {!fixtures || fixtures.length === 0 ? (
    <div className="rounded-[2rem] border border-white bg-black px-4 py-6 text-center text-white shadow-sm">
      No fixtures found for {sport}, {stage}, {year}
      {round !== undefined ? `, Round ${round}` : ""}
    </div>
  ) : round !== undefined ? (
    <div className="overflow-hidden rounded-[2rem] bg-black text-white shadow-sm border border-neutral-800">
      <div className="bg-black px-6 py-2 text-left text-1xl font-bold text-[#ffcc08] border-b border-neutral-800">
        Round {round}
      </div>

      <div>
        {fixtures.map((fixture, index) => (
          <div
            key={fixture.id}
            className={`grid grid-cols-3 items-center gap-2 px-6 py-3 text-1sm ${
              index !== fixtures.length - 1 ? "border-b border-neutral-800" : ""
            }`}
          >
            <div className="text-left font-medium">{fixture.home_team}</div>

            <div className="text-center font-semibold">
              {fixture.played ? (
                `${fixture.home_team_score} - ${fixture.away_team_score}`
              ) : fixture.fixture_time ? (
                new Date(fixture.fixture_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              ) : (
                "TBD"
              )}
            </div>

            <div className="text-right font-medium">{fixture.away_team}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      {[...new Set(fixtures.map((fixture) => fixture.game_round))]
        .sort((a, b) => a - b)
        .map((roundNumber) => {
          const roundFixtures = fixtures.filter(
            (fixture) => fixture.game_round === roundNumber
          );

          return (
            <div
              key={roundNumber}
              className="overflow-hidden rounded-[2rem] bg-black text-white shadow-sm border border-neutral-800"
            >
              <div className="bg-black px-6 py-2 text-left text-1xl font-bold text-[#ffcc08] border-b border-neutral-800">
                Round {roundNumber}
              </div>

              <div>
                {roundFixtures.map((fixture, index) => (
                  <div
                    key={fixture.id}
                    className={`grid grid-cols-3 items-center gap-2 px-6 py-3 text-1sm ${
                      index !== roundFixtures.length - 1
                        ? "border-b border-neutral-800"
                        : ""
                    }`}
                  >
                    <div className="text-left font-medium">
                      {fixture.home_team}
                    </div>

                    <div className="text-center font-semibold">
                      {fixture.played ? (
                        `${fixture.home_team_score} - ${fixture.away_team_score}`
                      ) : fixture.fixture_time ? (
                        new Date(fixture.fixture_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) : (
                        "TBD"
                      )}
                    </div>

                    <div className="text-right font-medium">
                      {fixture.away_team}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  )}
</div>
    </div>
  );

}