export type ProjectGroup = "Publication" | "Research" | "Leadership" | "Events" | "Web";
export type ProjectLink = { label: string; href: string; external?: boolean };
export type Project = {
  id: string;
  title: string;
  group: ProjectGroup;
  role: string;
  status: string;
  period?: string;
  summary: string;
  tags: string[];
  links?: ProjectLink[];
};

export const projectGroups: ("All" | ProjectGroup)[] = ["All", "Publication", "Research", "Leadership", "Events", "Web"];

export const projects: Project[] = [
  {
    id: "industrial-vision-11",
    title: "Industrial Vision Vol. 11",
    group: "Publication",
    role: "Coordinator and designer",
    status: "Published",
    period: "2026",
    summary: "The annual Industrial Engineering magazine of SOIES Nepal. I coordinated the team and learned InDesign to design the whole issue and prepare the print-ready files. Theme: Systemic Excellence, Designing Agile Industries.",
    tags: ["Editorial design", "InDesign", "Team coordination"],
    links: [
      { label: "Read my pieces", href: "/blog" },
      { label: "Magazine PDF", href: "/files/industrial-vision-vol11.pdf", external: true },
    ],
  },
  {
    id: "wind-turbine-fyp",
    title: "Omnidirectional Wind Turbine",
    group: "Research",
    role: "3D design",
    status: "In progress",
    period: "Final year project",
    summary: "Studying how changes in the geometry and proportions of the central area of an omnidirectional wind turbine affect performance. Supervised by Asst. Prof. Suman Acharya.",
    tags: ["Research", "Renewable energy", "3D design"],
  },
  {
    id: "yathartha-3",
    title: "Yathartha 3.0, Engineering Fest",
    group: "Events",
    role: "Coordinator",
    status: "Completed",
    period: "January 2026",
    summary: "The Thapathali Campus engineering fest. SOIES Nepal organised the pre- and post-fest programs: quiz, debate, math and physics olympiad, flash fiction, the Ergo Reignite design competition, a project demonstration and Beyond Machines.",
    tags: ["Engineering fest", "Competitions", "Event coordination"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "npc-proposal",
    title: "Research Partnership Proposal to the National Planning Commission",
    group: "Leadership",
    role: "President, SOIES Nepal",
    status: "Submitted",
    period: "June 2026",
    summary: "The executive committee submitted a research partnership proposal to the National Planning Commission at Singha Durbar. It outlines student-led industrial baseline research under the IECIRD initiative, with the Department of Industrial Engineering, Thapathali Campus as academic partner.",
    tags: ["Policy", "Research partnership", "Industry and academia"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "nebico-mou",
    title: "MOU with Nebico Limited and Job Fair",
    group: "Leadership",
    role: "President, SOIES Nepal",
    status: "Completed",
    period: "February 2026",
    summary: "SOIES Nepal contacted, researched and coordinated an MOU between the Department of Industrial Engineering and Nebico Limited, signed on 6 February 2026 as part of the job fair programme.",
    tags: ["Industry partnership", "Job fair"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "mechtrix-2082",
    title: "MechTRIX 2082",
    group: "Events",
    role: "Organising team, SOIES Nepal",
    status: "Completed",
    period: "February 2026",
    summary: "A national-level engineering exhibition covering industrial, mechanical, aerospace and automobile engineering. SOIES Nepal supported and coordinated the event and showcased student projects.",
    tags: ["Exhibition", "Student projects"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "workshop-series",
    title: "Workshop Series",
    group: "Events",
    role: "President, SOIES Nepal",
    status: "Completed",
    period: "2025-2026",
    summary: "Four hands-on workshops for students: research paper writing, engineering entrepreneurship and financial markets, ANSYS simulation, and article writing.",
    tags: ["Workshops", "Skill building"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "alumni-career-sessions",
    title: "Alumni and Career Sessions",
    group: "Events",
    role: "President, SOIES Nepal",
    status: "Completed",
    period: "2025-2026",
    summary: "Talks and orientations that connected students with alumni and experts: IE Talk, the webinar From Nepal to Germany, the seminar Industrial Engineering: Scope and Opportunities, and orientation programs for the new batch.",
    tags: ["Alumni", "Career guidance"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    id: "higher-education-fair",
    title: "12th Nepal Higher Education Fair",
    group: "Events",
    role: "SOIES Nepal",
    status: "Completed",
    period: "July 2026",
    summary: "SOIES Nepal took part in the fair and shared the message that quality education and promising opportunities exist within Nepal as well.",
    tags: ["Outreach", "Education"],
    links: [{ label: "Full record", href: "/soies" }],
  },
  {
    // CHECK: confirm the year, and whether to add a theme or the title of my piece
    id: "industrial-vision-10",
    title: "Industrial Vision Vol. 10",
    group: "Publication",
    role: "Principal Correspondent",
    status: "Published",
    summary: "Principal Correspondent for the tenth issue of SOIES Nepal's annual Industrial Engineering magazine.",
    tags: ["Writing", "Magazine"],
  },
  {
    // CHECK: confirm this is the second edition of the fest, and add the year
    id: "yathartha-2",
    title: "Yathartha 2.0, Engineering Fest",
    group: "Events",
    role: "Organiser",
    status: "Completed",
    summary: "Part of the organising team for the second edition of the Thapathali Campus engineering fest.",
    tags: ["Engineering fest"],
  },
  {
    id: "soies-website",
    title: "SOIES Nepal Website",
    group: "Web",
    role: "Builder",
    status: "Live",
    summary: "The official website of SOIES Nepal, with events, committees and resources. Built with AI-assisted coding on Next.js and Sanity.",
    tags: ["Next.js", "Sanity", "AI-assisted coding"],
    links: [{ label: "Visit the site", href: "https://soiesnepal.org.np", external: true }],
  },
  {
    id: "engineers-library",
    title: "The Engineer's Library",
    group: "Web",
    role: "Creator",
    status: "Live",
    summary: "An open-access digital library for IOE Industrial Engineering, with semester-wise notes, textbooks and industrial resources.",
    tags: ["Education", "Open access"],
    links: [{ label: "Open the library", href: "/library" }],
  },
  {
    id: "this-portfolio",
    title: "This Portfolio",
    group: "Web",
    role: "Designer and builder",
    status: "In progress",
    summary: "A personal site built with AI-assisted coding on Next.js and Sanity. My part is the structure, the design decisions and how the pieces connect.",
    tags: ["Next.js", "Sanity", "AI-assisted coding"],
  },
];
