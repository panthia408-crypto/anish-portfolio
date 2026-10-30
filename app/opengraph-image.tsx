import { ImageResponse } from "next/og";

// Social card for every page: the drawing-sheet palette, a blueprint grid and the name. No photo needed.

export const alt = "Anish Panthi, Industrial Engineering student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f4f1ea";
const ink = "#16150f";
const graphite = "#5b584f";
const grid = "rgba(22, 21, 15, 0.07)";
const accent = "#c8371d";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: paper,
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          color: ink,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: graphite, textTransform: "uppercase" }}>
          Industrial Engineering · Thapathali Campus, IOE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, lineHeight: 1, letterSpacing: -3 }}>Anish Panthi</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, lineHeight: 1.3, maxWidth: 900, color: ink }}>
            Wind turbine research, SOIES Nepal, and Industrial Vision Vol. 11, designed cover to print.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: graphite }}>
          <div style={{ width: 14, height: 14, background: accent, marginRight: 16 }} />
          anishpanthi.com.np
        </div>
      </div>
    ),
    size,
  );
}
