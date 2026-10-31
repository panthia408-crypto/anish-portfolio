// Final year project. Facts come from the bio, the journey timeline and projects.ts.
// Any [PLACEHOLDER: ...] left here is listed in TODO_CONTENT.md.

export const research = {
  title: "Changing the center of an omnidirectional wind turbine",
  summary: "My final year project, supervised by Asst. Prof. Suman Acharya. It is in design and simulation now, and the turbine is due to be fabricated and documented by 15 Mangsir.",
  specs: [
    { term: "My role", value: "3D design" },
    { term: "Supervisor", value: "Asst. Prof. Suman Acharya" },
    { term: "Since", value: "6th semester, 2025" },
    { term: "Status", value: "Design and simulation, final year project" },
    { term: "Measuring", value: "Torque, and so power generation" },
    { term: "Method", value: "CAD design and simulation, then fabrication" },
    { term: "Tools", value: "SolidWorks, ANSYS CFD" },
    { term: "Due", value: "Fabricated and documented by 15 Mangsir" },
  ],
  blocks: [
    {
      title: "The question",
      body: [
        "What happens to an omnidirectional wind turbine's torque, and so the power it generates, when the vent at its center changes in area and ratio?",
        "The original design is patented, so we're studying something new. As far as we know, nobody has tested it before.",
      ],
    },
    {
      title: "What I do",
      body: [
        "I handle the design side of the project: the 3D model shown here and the vent variants we simulate.",
      ],
    },
    {
      title: "Where it stands",
      body: [
        "It started in my sixth semester and is now my final year project. Design and simulation are under way, and the turbine is due to be fabricated and documented by 15 Mangsir.",
      ],
    },
  ],
  figure: {
    src: "/images/turbine-cad.png",
    alt: "CAD model of the omnidirectional wind turbine: a rounded rotor of curved blades around a lattice-framed center, mounted on a mast",
    width: 950,
    height: 583,
    caption: "CAD model of the turbine, design and simulation stage",
  },
};
