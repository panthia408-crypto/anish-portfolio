// SOIES Nepal, 18th Executive Committee (2025-2026)
// Snapshot of the public committee page: https://soiesnepal.org.np/previous-committees/1
// Photos are served from the SOIES Sanity CDN (project bhcqd45q). Do not rename the files below.

export type EventType =
  | "seminar"
  | "workshop"
  | "competition"
  | "conference"
  | "social"
  | "general";

export type SoiesEvent = {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO date, newest first in the array
  description?: string;
  note?: string; // facilitator, winner and similar
  photos: string[]; // file names on the SOIES Sanity CDN
};

export function sanityImg(file: string): string {
  return `/soies/${file}`;
}

/** Intrinsic size from the file name, which ends in "-WIDTHxHEIGHT.ext". */
export function imageSize(file: string): { width: number; height: number } {
  const match = file.match(/-(\d+)x(\d+)\.\w+$/);
  if (!match) throw new Error(`No size in image file name: ${file}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

export const committee = {
  title: "18th Executive Committee",
  years: "2025 to 2026",
  organisation: "Society of Industrial Engineering Students (SOIES Nepal)",
  sourceUrl: "https://soiesnepal.org.np/previous-committees/1",
  groupPhoto: "ce5c800ac9d6f255a5799eee42775443fe8124a9-6000x4000.jpg",
  groupPhotoAlt: "18th Executive Committee of SOIES Nepal",
  // Names only. No personal photos or contact details are included on purpose.
  team: [
    { name: "Anish Panthi", role: "President" },
    { name: "Shilpa Thapa Magar", role: "Vice President" },
    { name: "Sambhav Pandit", role: "Secretary" },
    { name: "Birat Tiwari", role: "Joint Secretary" }, // CHECK SPELLING: the SOIES page shows "Tiwati"
    { name: "Suprava Pyakurel", role: "Executive Member" },
    { name: "Lakshya Mishra", role: "Executive Member" },
    { name: "Simran Rana", role: "Executive Member" },
    { name: "Bhumi Kumari Kurmi", role: "Executive Member" },
  ],
};

export const events: SoiesEvent[] = [
  {
    id: "ie-scope-and-opportunities",
    title: "Industrial Engineering: Scope and Opportunities",
    type: "seminar",
    date: "2026-08-20",
    description: "Online seminar connecting alumni and experts.",
    photos: [
      "3a0a1b9f3f26cb66df103101d8a44c17025acc9a-1919x1079.png",
      "89ae05b05965365daddeffa74fb044d4c8b934c0-1861x1002.png",
      "17bc8868cda949f4dee61ed785ffe11190974c59-1916x997.png",
    ],
  },
  {
    id: "industrial-vision-vol11-launch",
    title: "Industrial Vision Volume 11.0 Launch Event",
    type: "general",
    date: "2026-08-14",
    description: "Systemic Excellence: Designing Agile Industries.",
    photos: [
      "e636c359c240969e68d4da9dfc5dc41fd04d1e60-6000x4000.jpg",
      "a13c1d7f02242baac477b017acd3dd88bf0f0e42-6000x4000.jpg",
      "ce5c800ac9d6f255a5799eee42775443fe8124a9-6000x4000.jpg",
    ],
  },
  {
    id: "higher-education-fair",
    title: "12th Nepal Higher Education Fair",
    type: "social",
    date: "2026-07-19",
    description:
      "One of the most important messages we shared was that quality education and promising opportunities exist within Nepal as well. With the right dedication and guidance, students can build successful careers while contributing to the growth of our own nation.",
    photos: [
      "4ced84088d4ecab23d853984b574b83de2481543-2048x1536.jpg",
      "c353759373a048ac37288cf6ec6e2b846718c1dd-1080x1160.jpg",
      "1b6352056fa6e18b280a444475385338e94472bd-1536x2048.jpg",
    ],
  },
  {
    id: "nepal-to-germany-webinar",
    title: "Interactive Webinar: From Nepal to Germany",
    type: "seminar",
    date: "2026-06-20",
    description:
      "An interactive webinar, \"From Nepal to Germany: A Journey in Industrial Engineering\", featuring Er. Ganesh Rana, who shared his experiences, lessons learned, and insights from his professional journey. Designed for students seeking clarity, direction, and a broader perspective on engineering careers.",
    photos: ["4a85f9feb3c297ebc4bcc9d875952e3a7a33a494-526x526.png"],
  },
  {
    id: "npc-proposal-submission",
    title: "Proposal Submission to the National Planning Commission",
    type: "social",
    date: "2026-06-02",
    description:
      "The Executive Committee of SOIES Nepal formally submitted a research partnership proposal to the National Planning Commission (NPC), Singha Durbar. The proposal outlined a framework for student-led industrial baseline research under the IECIRD initiative, positioning the Department of Industrial Engineering, Thapathali Campus as an academic partner aligned with Nepal's 16th Periodic Plan priorities.",
    photos: [
      "e5f7f6377407baeafd2a8cb9d5a489cdb355d0cd-2048x1536.jpg",
      "ea98439ef518f8ac744f536c2454c93f49f8a2cf-1536x2048.jpg",
      "a9582b510576ccee358c887c9695beaa6c135646-2048x1536.jpg",
    ],
  },
  {
    id: "article-writing-workshop",
    title: "Article Writing Workshop",
    type: "workshop",
    date: "2026-05-13",
    description:
      "The Research and Article Writing Workshop trained interns in techniques for writing articles.",
    note: "Facilitator: Srasta Shrestha",
    photos: [
      "528776a2aa1326e2405aa9085455a343d305c8ba-1300x910.png",
      "3eceffc1da1413843588cfa98b9d34a346dd7d52-1821x902.png",
      "0377672565929928c8f8e0de509b06a4c49b5049-1858x903.png",
    ],
  },
  {
    id: "job-fair-nebico-mou",
    title: "Job Fair: MOU with Nebico Limited",
    type: "general",
    date: "2026-02-06",
    description:
      "SOIES Nepal moderated the MOU between Nebico Limited and the Department of Industrial Engineering.",
    photos: [
      "f4ca6874eb7575ad1d5802db6e7956ee045aadfc-2252x4000.jpg",
      "9503a66beec78c19ff0c1fca185b6848be49a4f9-900x1600.jpg",
      "4e2a2f26097015a577a7f01bc2dd63934b217627-2252x4000.jpg",
    ],
  },
  {
    id: "mechtrix-2082",
    title: "MechTRIX 2082",
    type: "social",
    date: "2026-02-04",
    description:
      "An engineering exhibition of industrial, mechanical, aerospace and automobile engineering.",
    photos: [
      "27a346b38bd0c992c0a8fd4b090f3a777868f082-2048x1365.jpg",
      "1e0b578778adebedc0fca4396fb9fd292079702b-5184x3456.jpg",
      "bff31df7941dee9f853c77303247d5984667e065-5184x3456.jpg",
    ],
  },
  {
    id: "ansys-certificate-distribution",
    title: "ANSYS Certificate Distribution",
    type: "workshop",
    date: "2026-02-01",
    photos: [
      "166cd5ac58e8d61bc8649769c1b5a356694dfd28-3000x4000.jpg",
      "56c93d7025f87fdd6109a2fe51ff9a874d5812a7-3000x4000.jpg",
      "846771606ea5825c43f22be3d546a12531d36aa4-3000x4000.jpg",
    ],
  },
  {
    id: "project-demonstration-yatharth",
    title: "Project Demonstration: Main Event Yatharth",
    type: "competition",
    date: "2026-01-28",
    photos: [
      "2631f83a73902a156003948950a4fac3b1bfd09c-3936x2624.jpg",
      "68dd86bbdafe0e5df2ac5a278af4880381820890-1200x1600.jpg",
      "27fb42b1029b1091fe96b7dbbfe1f34593ab9a7c-6000x4000.jpg",
    ],
  },
  {
    id: "beyond-machines",
    title: "Beyond Machines",
    type: "general",
    date: "2026-01-28",
    photos: [
      "abb4a12c463724e7adcf6d67093e363f1f1674db-1600x1200.jpg",
      "300dbc8fbf29b9a7260ad71614ae2893151b9697-1200x1600.jpg",
      "49547f8841c8c54240f9b6ef5f2ce1a6e95b1691-1200x1600.jpg",
    ],
  },
  {
    id: "debate-competition",
    title: "Debate Competition",
    type: "competition",
    date: "2026-01-24",
    note: "Winner: Prashuna Thapa",
    photos: [
      "7f027f12dc462d366e0576272e0ff46e67376530-2016x1512.jpg",
      "bbc9924bc0f36e886af97c19d3bd3487b4077577-1512x1890.jpg",
      "191fbc53d852fd5610787d4a5c8656ce9c862d3d-1512x1890.jpg",
    ],
  },
  {
    id: "ergo-reignite-2",
    title: "Ergo Reignite Design Competition 2.0",
    type: "competition",
    date: "2026-01-20",
    photos: [
      "55f0abeeb1e5c78d8ac9f9d5aff5b61b29627e1f-1600x1200.jpg",
      "b8d311e64dbe370fea9574166c773250e33c0008-2048x1536.jpg",
      "be1f57b970746f35c799499491c3e7212a81732d-2048x1536.jpg",
    ],
  },
  {
    id: "math-physics-olympiad-2082",
    title: "National Level Math & Physics Olympiad 2082",
    type: "competition",
    date: "2026-01-16",
    photos: [
      "dbaeaaa6836625ee9c6d1fe3c2b4b43ce632e83f-1200x1200.jpg",
      "08054d7d203886827f4f837bd06fa6cf11c5203f-1536x2048.jpg",
      "7996b96fd85928af09783af163a8cabc22f9f644-1200x1200.jpg",
    ],
  },
  {
    id: "ansys-workshop",
    title: "ANSYS Workshop",
    type: "workshop",
    date: "2025-12-31", // CHECK: older SOIES text says this ran Jan 21 to Feb 9, 2026
    note: "Facilitator: Er. Shristi Pandey",
    photos: [
      "ee06f958f9b3f573871e308624d63a44bd7b986f-12000x9000.jpg",
      "d73bc84ffcd0eaa6ee7f6219e5d17540deb99003-2000x1500.jpg",
      "70b5b2e719ec7ff0059130ba8f81b2cbbc7dc221-590x443.jpg",
    ],
  },
  {
    id: "ie-talk",
    title: "IE Talk",
    type: "seminar",
    date: "2025-12-31",
    description:
      "Students learned from our alumnus Mr. Pravin Thapa.",
    photos: [
      "24ab21e851483e3769809d0cf16abd783dff676d-1600x1200.jpg",
      "f21ec8763c90f22da68f8c5e93b8b931842b87c9-3000x4000.jpg",
      "e7bb93116ecaa7ae88b5a0a1f803e6a56fc9fe5a-2364x4000.jpg",
    ],
  },
  {
    id: "entrepreneurship-financial-markets-workshop",
    title: "Engineering Entrepreneurship and Financial Markets Workshop",
    type: "workshop",
    date: "2025-12-09",
    description:
      "A brief workshop introducing engineers to startup fundamentals and the basics of financial markets for better innovation and investment understanding.",
    note: "Facilitator: Sajilo Broker",
    photos: [
      "f286d5c0e0700f5c5dcc46bdb4cb4928de8f4e28-1280x963.jpg",
      "bc2d06ae02e59305bcc595f16b95e52eac6568ad-1280x963.jpg",
      "9eda653bf9bfecb646003ae1db3ba7b0b092de48-1280x963.jpg",
    ],
  },
  {
    id: "orientation-batch-2082",
    title: "Orientation Batch 2082",
    type: "seminar",
    date: "2025-12-01",
    description:
      "A welcoming session introducing new students of the 2082 batch to SOIES Nepal, campus resources, academic expectations, and opportunities for growth.",
    photos: [
      "d6a1aba2ba0c66ea26fa5e91b5d53db301d8991b-1280x963.jpg",
      "28926df70534eaba67c79f58cee27ebf930d77d2-1280x963.jpg",
      "901e567afd904e3034e9c3af9796d56b5bf17e0a-1280x963.jpg",
    ],
  },
  {
    id: "research-paper-writing-workshop",
    title: "Research Paper Writing Workshop",
    type: "workshop",
    date: "2025-10-12",
    description:
      "A practical workshop on the essentials of writing effective research papers: topic selection, structure, formatting, citations, and publishing basics.",
    note: "Facilitator: Prof. Dr. Raj Kumar Chaulagain",
    photos: [
      "381a4c7a1559cbfadb5bea4dc9cbbc72a7ca9a9e-1080x1080.jpg",
      "b7e8d539937b24c7b493dd1c77481411273db400-1280x963.jpg",
      "ff566a09772231a02b51fbcbe5c1c3e8082090ed-1080x838.png",
    ],
  },
  {
    id: "online-orientation-ie",
    title: "Online Orientation Program about IE",
    type: "conference",
    date: "2025-09-01",
    description:
      "An introductory overview of Industrial Engineering, helping students understand its scope, applications, and career pathways.",
    photos: [
      "aebd7f3676defe99a59dd29eb28a4eb98da44c71-1542x913.png",
      "24dd673f759eb5962a776817eadc7c5d1cb64d7d-1435x931.png",
      "01bc61fced803a039f045da59463f4a66dd24f16-1471x918.png",
    ],
  },
];
