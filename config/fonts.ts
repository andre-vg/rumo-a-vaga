import {
  Fira_Code as FontMono,
  Lexend as FontBody,
  Changa_One as FontSans,
  Spinnaker as FontSub,
} from "next/font/google";

export const fontHeading = FontSans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

export const fontSub = FontSub({
  subsets: ["latin"],
  variable: "--font-sub",
  weight: "400",
});

export const fontBody = FontBody({
  subsets: ["latin"],
  variable: "--font-body",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
