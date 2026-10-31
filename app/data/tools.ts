// Tools, grouped by what they were used for. Levels are the ones already on the site; see TODO_CONTENT.md section 7.

export type Tool = { name: string; note?: string };
export type ToolGroup = { title: string; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  {
    title: "Design and simulation",
    tools: [
      { name: "SolidWorks", note: "intermediate" },
      { name: "ANSYS", note: "intermediate" },
      { name: "AutoCAD", note: "intermediate" },
      { name: "AutoCAD MEP", note: "learning" },
    ],
  },
  {
    title: "Publishing and media",
    tools: [
      { name: "Adobe InDesign", note: "used for Vol. 11" },
      { name: "Photoshop" },
      { name: "DaVinci Resolve" },
    ],
  },
  {
    title: "Office",
    tools: [{ name: "Excel", note: "advanced, self-assessed" }, { name: "PowerPoint" }, { name: "Word" }],
  },
  {
    title: "Web and code",
    tools: [
      { name: "Next.js" },
      { name: "Sanity" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Cloudflare" },
      { name: "C", note: "basics" },
    ],
  },
];
