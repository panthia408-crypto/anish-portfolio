// Journey timeline, certificates and roles. Moved out of app/journey/page.tsx unchanged.

export type Milestone = { year: string; title: string; place: string; text: string };
export type Credential = { title: string; detail: string };

export const milestones: Milestone[] = [
  { year: "2020", title: "SEE, Secondary Education", place: "Shree Kalika Nepal Rastriya Secondary School", text: "Completed the School Leaving Examination, building the foundational academic base before entering higher studies." },
  { year: "2020 to 2022", title: "+2 Science", place: "Omega College, Kumarpati", text: "Studied the Physical Science stream. Developed an interest in engineering, physics and problem-solving that led to choosing Industrial Engineering." },
  { year: "2022", title: "Joined Thapathali Campus, IOE", place: "B.E. Industrial Engineering, Tribhuvan University", text: "Began the journey in Industrial Engineering at the Institute of Engineering and started engaging with student communities from the first semester." },
  { year: "2023", title: "Graphic Designer, GAP Thapathali", place: "Regional student club (Gulmi, Arghakhanchi, Palpa)", text: "Contributed to event posters, social media content and visual branding for the club." },
  { year: "2023", title: "Joint Secretary, SOIES Nepal", place: "Society of Industrial Engineering Students", text: "Coordinated conferences, the Industrial Estate Research Program and Microsoft training, and was part of the Yathartha tech fest." },
  { year: "Early 2024", title: "President, GAP Thapathali", place: "Regional student club", text: "Led the \"home far from home\" initiative, connecting students from western Nepal studying at Thapathali Campus. Later stepped down to take on the SOIES presidency." },
  { year: "2025", title: "Industrial Vision Vol. 10 and the turbine research", place: "Thapathali Campus, IOE", text: "Principal Correspondent for the tenth issue of the magazine. In the sixth semester I joined my teacher's omnidirectional wind turbine research, handling the 3D design. It is now my final year project." },
  { year: "2025 to 2026", title: "President, SOIES Nepal", place: "18th Executive Committee", text: "Led 20 events: Yathartha 3.0, the National Math and Physics Olympiad, Ergo Reignite 2.0, a job fair and MOU with Nebico Limited, workshops, alumni talks, and a research partnership proposal to the National Planning Commission." },
  { year: "August 2026", title: "Industrial Vision Vol. 11", place: "Coordinator and designer", text: "Learned InDesign and designed the whole issue, print ready, with the team. Launched on 14 August 2026." },
  { year: "Now", title: "8th Semester", place: "Thapathali Campus, IOE", text: "My presidency is complete. I'm working on the wind turbine as my final year project, learning AutoCAD MEP, and looking for an HVAC and MEP internship." },
];

export const certificates: Credential[] = [
  { title: "SolidWorks 3D Modeling", detail: "7-day workshop and 6-month lab course, Thapathali Campus" },
  { title: "ANSYS Simulation Training", detail: "10-day workshop, organised and attended, SOIES Nepal" },
  { title: "Complete Microsoft Office Package", detail: "7-day training course" },
  { title: "Engineering Entrepreneurship and Financial Markets Workshop", detail: "3-day workshop on share market literacy, co-organised with Broker 90 and Sajilo Broker" },
];

export const roles: Credential[] = [
  { title: "President, SOIES Nepal", detail: "18th Executive Committee, 2025 to 2026" },
  { title: "Coordinator, Industrial Vision Vol. 11", detail: "Designed the magazine and prepared the print-ready files, 2026" },
  { title: "Principal Correspondent, Industrial Vision Vol. 10", detail: "SOIES Nepal" },
  { title: "Coordinator, Yathartha 3.0", detail: "Thapathali Campus engineering fest, 2026" },
  { title: "Organiser, Yathartha 2.0", detail: "Thapathali Campus engineering fest" },
  { title: "Joint Secretary, SOIES Nepal", detail: "Society of Industrial Engineering Students, Nepal" },
  { title: "President, GAP Thapathali", detail: "Regional student club, Gulmi, Arghakhanchi, Palpa" },
];

export const alsoOrganised = "Also organised: Industrial Estate Research Program, national quiz competition, Math and Physics Olympiad, Ergo Reignite design competition, talk shows and alumni meets.";
