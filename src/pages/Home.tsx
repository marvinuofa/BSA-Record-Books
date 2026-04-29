const announcements = [
  {
    title: "Schedule & Attendance",
    content: "Teams must be on the correct pitch at the scheduled time. Arriving more than 3 min late will result in a forfeit and a 3–0/21-0 win for the opposing team. All participants must sign the waiver before competing.",
    link: "https://bsa-record-books-3.onrender.com/fixtures",
    linkLabel: "Fixtures",
  },
  {
    title: "Waivers",
    content: "All participants must complete the waiver before competing. Players who have not signed the waiver will not be allowed to participate.",
    link: "https://waiver.smartwaiver.com/e/YgMJ334nuZsTsQQ3gzJjpG/",
    linkLabel: "Sign Waiver",
  },
  {
    title: "Dress Code",
    content: "For soccer players, please bring a black and a white shirt so we can easily distinguish between the two teams.",
  },

];

const combineEvents = [
  { title: "Laser-Timed 40-Yard Dash", subtitle: "Fastest Athlete" },
  { title: "Standing Broad Jump", subtitle: "Most Explosive Athlete" },
  { title: "QB Accuracy Challenge", subtitle: "Best Arm" },
  { title: "Crossbar Challenge", subtitle: "Accurate Legs" },
];

const teamInfo = [
  "All player have to sign the waiver before bing allowed to particpate.",
  "Players should arrive early for check-in and warm-up.",
  "Schedules and bracket updates will be posted in the announcement section.",
  "All participants are expected to compete respectfully and follow event staff directions.",
];


const flagFootballRules = [
  "7v7 format",
  "Group stage + 1 final game between top 2 teams ",
  "20 minute games (team can decide to have a break within 20 mins)",
  "Please pull flages do not tackle",
  "We will be playing Official flag football rules",
];

const soccerRules = [
  "7v7 format",
  "Group stage + knockout rounds(penaly kick to settle ties)",
  "10 minute games",
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

        <Section title="The Combine Challenges">
            <p className="m-2 text-sm leading-7 text-neutral-300">
             Each drill produces a <span className="font-semibold text-white">Male Champion</span> and a{" "}
              <span className="font-semibold text-white">Female Champion</span>. Each winner
              receives a <span className="font-semibold text-[#ffcc08]">$20 prize</span>.
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

        <Section title="7v7 Championships">
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