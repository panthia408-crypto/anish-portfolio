import { beltItems } from "../../data/work";
import Section from "../ui/Section";
import WorkBelt from "./WorkBelt";

export default function Work() {
  return (
    <Section
      id="work"
      number="01"
      label="Work"
      title="Things I made or led"
      className="section--belt"
      bleed={<WorkBelt items={beltItems} />}
    />
  );
}
