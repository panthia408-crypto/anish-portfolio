"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Tool = {
  name: string;
  src: string;
  brand: string;
  label?: string;
  href?: string;
  learning?: boolean;
};

const tools: Tool[] = [
  {
    name: "AutoCAD",
    src: "https://api.iconify.design/simple-icons/autodesk.svg?color=%2394a3b8",
    brand: "#E51050",
    label: "Intermediate",
  },
  {
    name: "AutoCAD MEP",
    src: "https://api.iconify.design/simple-icons/autodesk.svg?color=%2394a3b8",
    brand: "#E51050",
    label: "Learning",
    learning: true,
  },
  {
    name: "SolidWorks",
    src: "https://api.iconify.design/simple-icons/dassaultsystemes.svg?color=%2394a3b8",
    brand: "#E2231A",
    label: "Intermediate",
  },
  {
    name: "ANSYS",
    src: "https://api.iconify.design/simple-icons/ansys.svg?color=%2394a3b8",
    brand: "#FFB71B",
    label: "Intermediate",
  },
  {
    name: "Adobe InDesign",
    src: "https://api.iconify.design/simple-icons/adobeindesign.svg?color=%2394a3b8",
    brand: "#FF3366",
    label: "Magazine project",
    href: "/files/industrial-vision-vol11.pdf",
  },
  {
    name: "Photoshop",
    src: "https://api.iconify.design/simple-icons/adobephotoshop.svg?color=%2394a3b8",
    brand: "#31A8FF",
  },
  {
    name: "DaVinci Resolve",
    src: "https://api.iconify.design/simple-icons/davinciresolve.svg?color=%2394a3b8",
    brand: "#FFFFFF",
  },
  {
    name: "Excel",
    src: "https://api.iconify.design/simple-icons/microsoftexcel.svg?color=%2394a3b8",
    brand: "#217346",
    label: "Advanced, self-assessed",
  },
  {
    name: "PowerPoint",
    src: "https://api.iconify.design/simple-icons/microsoftpowerpoint.svg?color=%2394a3b8",
    brand: "#D24726",
  },
  {
    name: "Word",
    src: "https://api.iconify.design/simple-icons/microsoftword.svg?color=%2394a3b8",
    brand: "#315FA7",
  },
  {
    name: "Next.js",
    src: "https://api.iconify.design/simple-icons/nextdotjs.svg?color=%23ffffff",
    brand: "#FFFFFF",
  },
  {
    name: "Sanity",
    src: "https://api.iconify.design/simple-icons/sanity.svg?color=%23F36458",
    brand: "#F36458",
  },
  {
    name: "GitHub",
    src: "https://api.iconify.design/simple-icons/github.svg?color=%23ffffff",
    brand: "#FFFFFF",
  },
  {
    name: "Vercel",
    src: "https://api.iconify.design/simple-icons/vercel.svg?color=%23ffffff",
    brand: "#FFFFFF",
  },
  {
    name: "Cloudflare",
    src: "https://api.iconify.design/simple-icons/cloudflare.svg?color=%23F38020",
    brand: "#F38020",
  },
  {
    name: "C",
    src: "https://api.iconify.design/simple-icons/c.svg?color=%2300599C",
    brand: "#659AD2",
    label: "Basics",
  },
];

type ToolboxStyle = CSSProperties & {
  "--logo": string;
  "--brand": string;
};

export default function Toolbox() {
  const [openTool, setOpenTool] = useState<string | null>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const popRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const openedAtRef = useRef<number | null>(null);
  const openToolRef = useRef<string | null>(null);
  const magnetFrames = useRef(new Map<HTMLButtonElement, number>());

  const setOpenToolWithPosition = (toolName: string | null) => {
    openToolRef.current = toolName;
    openedAtRef.current = toolName ? window.scrollY : null;
    setOpenTool(toolName);
  };

  const supportsMagnetEffect = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(max-width: 767px)").matches
    );
  };

  useEffect(() => {
    if (!supportsMagnetEffect()) {
      return;
    }

    const activeMagnetFrames = magnetFrames.current;
    const handlePointerDown = (event: PointerEvent) => {
      const currentTool = openToolRef.current;
      if (!currentTool) {
        return;
      }

      const target = event.target as Node;
      const button = buttonRefs.current[currentTool];
      const popover = popRefs.current[currentTool];
      if (!button?.contains(target) && !popover?.contains(target)) {
        setOpenToolWithPosition(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const currentTool = openToolRef.current;
        setOpenToolWithPosition(null);
        if (currentTool) {
          buttonRefs.current[currentTool]?.focus();
        }
      }
    };

    const handleScroll = () => {
      if (
        openedAtRef.current !== null &&
        Math.abs(window.scrollY - openedAtRef.current) > 40
      ) {
        setOpenToolWithPosition(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      activeMagnetFrames.forEach((frame) => {
        window.cancelAnimationFrame(frame);
      });
      activeMagnetFrames.clear();
    };
  }, []);

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (
      event.pointerType === "touch" ||
      !supportsMagnetEffect()
    ) {
      return;
    }

    const button = event.currentTarget;
    const logo = button.querySelector<HTMLElement>(".toolbox-logo");
    if (!logo) {
      return;
    }

    const rect = logo.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(offsetX, offsetY) > 70) {
      const previousFrame = magnetFrames.current.get(button);
      if (previousFrame !== undefined) {
        window.cancelAnimationFrame(previousFrame);
      }
      const frame = window.requestAnimationFrame(() => {
        button.style.setProperty("--mx", "0px");
        button.style.setProperty("--my", "0px");
        button.classList.remove("toolbox-magnet-active");
        magnetFrames.current.delete(button);
      });
      magnetFrames.current.set(button, frame);
      return;
    }

    const previousFrame = magnetFrames.current.get(button);
    if (previousFrame !== undefined) {
      window.cancelAnimationFrame(previousFrame);
    }
    const frame = window.requestAnimationFrame(() => {
      button.style.setProperty(
        "--mx",
        `${Math.max(-8, Math.min(8, offsetX * 0.25))}px`,
      );
      button.style.setProperty(
        "--my",
        `${Math.max(-8, Math.min(8, offsetY * 0.25))}px`,
      );
      button.classList.add("toolbox-magnet-active");
      magnetFrames.current.delete(button);
    });
    magnetFrames.current.set(button, frame);
  };

  const handlePointerLeave = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    const button = event.currentTarget;
    const previousFrame = magnetFrames.current.get(button);
    if (previousFrame !== undefined) {
      window.cancelAnimationFrame(previousFrame);
    }
    const frame = window.requestAnimationFrame(() => {
      button.style.setProperty("--mx", "0px");
      button.style.setProperty("--my", "0px");
      button.classList.remove("toolbox-magnet-active");
      magnetFrames.current.delete(button);
    });
    magnetFrames.current.set(button, frame);
  };

  return (
    <div className="toolbox-cluster" ref={clusterRef}>
      {tools.map((tool) => (
        <div
          className={`toolbox-cell${openTool === tool.name ? " toolbox-open" : ""}`}
          key={tool.name}
        >
          <button
            type="button"
            className={`toolbox-item${tool.learning ? " toolbox-learning" : ""}`}
            ref={(button) => {
              buttonRefs.current[tool.name] = button;
            }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={() => {
              if (!tool.label) {
                return;
              }
              setOpenToolWithPosition(
                openToolRef.current === tool.name ? null : tool.name,
              );
            }}
            {...(tool.label
              ? {
                  "aria-expanded": openTool === tool.name,
                  "aria-controls": `toolbox-pop-${tool.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`,
                }
              : {})}
          >
            <span
              className="toolbox-logo"
              role="img"
              aria-label={`${tool.name} logo`}
              style={
                {
                  "--logo": `url(${tool.src})`,
                  "--brand": tool.brand,
                } as ToolboxStyle
              }
            />
            <span className="toolbox-name">{tool.name}</span>
          </button>
          {openTool === tool.name && tool.label && (
            <span
              className="toolbox-pop"
              role="status"
              id={`toolbox-pop-${tool.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`}
              ref={(popover) => {
                popRefs.current[tool.name] = popover;
              }}
            >
              {tool.label}
              {tool.href && (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the magazine
                </a>
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
