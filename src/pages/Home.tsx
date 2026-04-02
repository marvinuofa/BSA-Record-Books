const announcements = [
  {
    title: "Team Sign-Up",
    content: "Create a team with friends or sign up as a free-agent. Each team can have a maximum of 10 players and minimum of 7.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScn9NDLzYcxjugFWKLWRcJm5fRrf61fwhd5i2mbfL42yuvdYA/viewform?usp=dialog",
    linkLabel: "Sign up here",
  },
  {
    title: "Referee Sign-Up",
    content: "We are looking for 4 referees. Candidates must to have knowledge on Football/Soccer or be willing to learn.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScw-jPSNb9plhyZtCvecacnWXvTZ8ltvcpoHVllNryXy6C91Q/viewform?usp=dialog",
    linkLabel: "Sign up here",
  },
  {
    title: "Case Competition",
    content: "A chance to contribute academically if you’re not as into sports through our case competition.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfMZc1syzjCce9E6ORu-kQx7r4skgwDNmSHIf8fjZLSMk7INQ/viewform",
    linkLabel: "Sign up here",
  },
];

const combineEvents = [
  { title: "Laser-Timed 40-Yard Dash", subtitle: "Fastest Athlete" },
  { title: "Standing Broad Jump", subtitle: "Most Explosive Athlete" },
  { title: "QB Accuracy Challenge", subtitle: "Best Arm" },
  { title: "Crossbar Challenge", subtitle: "Accurate Legs" },
];

const teamInfo = [
  "Teams must complete registration before the deadline.",
  "Players should arrive early for check-in and warm-up.",
  "Schedules and bracket updates will be posted in the announcement section.",
  "All participants are expected to compete respectfully and follow event staff directions.",
];

const tournamentStructure = [
  "Both sports use a group stage followed by knockout rounds.",
  "Teams earn points in group play to determine standings.",
  "Top teams advance to the playoff bracket.",
  "Final match winners are crowned event champions.",
];

const flagFootballRules = [
  "7v7 format",
  "Group stage + knockout rounds",
  "Timed games",
  "Flag pulls replace tackles",
  "Roster and possession rules can be added once finalized",
];

const soccerRules = [
  "7v7 format",
  "Group stage + knockout rounds",
  "Timed games",
  "Standard small-sided soccer rules apply",
  "Teams will share a point if games are tied at end of regulation",
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-black text-white shadow-sm border border-neutral-800">
      <div className="border-b border-neutral-800 px-6 py-3 text-left text-xl font-bold text-[#ffcc08]">
        {title}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export const Home = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
  {/*     <section className="rounded-[2rem]  px-4 py-4">
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-neutral-700 bg-neutral-950 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-[#ffcc08] hover:text-[#ffcc08]"
            >
              {item.label}
            </a>
          ))}
        </div>
     </section> */}
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-black text-white shadow-sm border border-neutral-800">
          <div className="px-6 py-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#ffcc08]">
              UABSA Record Books
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">
              Football vs Soccer
            </h1>
      
            <p className="mx-auto mt-1 max-w-3xl text-sm leading-7 text-neutral-300 md:text-base">
              <span className="font-semibold text-white">
                Who has the better athlete ?
              </span>
            </p>
          </div>
        </section>

        <Section title="Announcements">
          <div className="grid gap-4 md:grid-cols-3">
            {announcements.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-5"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {item.content}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block font-semibold text-[#ffcc08] hover:underline"
                  >
                    {item.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Phase 1: The Combine Challenges">
            <p className="m-2 text-sm leading-7 text-neutral-300">
             Each drill produces a <span className="font-semibold text-white">Male Champion</span> and a{" "}
              <span className="font-semibold text-white">Female Champion</span>. Each winner
              receives a <span className="font-semibold text-[#ffcc08]">$25 prize</span>.
            </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {combineEvents.map((event) => (
              <div
                key={event.title}
                className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-5"
              >
                <h3 className="text-m font-semibold text-white">{event.title}</h3>
              </div>
            ))}
          </div>

      
        </Section>

        <Section title="Phase 2: 7v7 Championships">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="text-l font-bold">Flag Football Tournament</h3>
              <p className="mt-2 font-semibold  text-sm text-[#ffcc08]">$250 Prize</p>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="text-l font-bold">Soccer Tournament</h3>
              <p className="mt-2 font-semibold text-sm text-[#ffcc08]">$250 Prize</p>
            </div>
          </div>
        </Section>

        <Section title="Information to Teams">
          <InfoList items={teamInfo} />
        </Section>

        <Section title="Tournament Structure">
          <InfoList items={tournamentStructure} />

          <div className="mt-6 rounded-[1.5rem] border border-neutral-800 bg-neutral-950 p-5">
            <h3 className="text-lg font-semibold text-white">Game Timing</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              Two halves, 10 minute an half, running clock, short halftime, and knockout games going. 
            </p>
          </div>
        </Section>

        <Section title="Rules">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#ffcc08]">
                Flag Football Rules
              </h3>
              <InfoList items={flagFootballRules} />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#ffcc08]">
                Soccer Rules
              </h3>
              <InfoList items={soccerRules} />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};