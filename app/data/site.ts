// Facts shared across pages. Anything not confirmed yet is a [PLACEHOLDER: ...] (see TODO_CONTENT.md).

export const site = {
  name: "Anish Panthi",
  url: "https://anishpanthi.com.np",
  campus: "Thapathali Campus, IOE",
  city: "Kathmandu",
  degree: "B.E. Industrial Engineering",
  email: "panthia408@gmail.com",
  status: "Final year project, learning AutoCAD MEP, looking for an HVAC or MEP internship.",
  availability: "available from 15 Mangsir (early December) for 3 to 5 months",
  cv: { href: "/files/Anish-Panthi-CV.pdf", size: "290 KB" },
  magazinePdf: { href: "/files/industrial-vision-vol11.pdf", size: "23 MB" },
  formEndpoint: "https://formspree.io/f/mvzbkowo",
};

export type SocialLink = { label: string; href: string; primary: boolean };

// Primary links appear in Contact. All of them appear in the footer.
export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anish-panthi-057326281/", primary: true },
  { label: "GitHub", href: "https://github.com/panthia408-crypto", primary: true },
  { label: "X", href: "https://x.com/AnishPanthi6", primary: false },
  { label: "Facebook", href: "https://www.facebook.com/anish.panthi.549", primary: false },
  { label: "Instagram", href: "https://www.instagram.com/anish.panthi/?hl=en", primary: false },
];
