const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(table|checkbox|form|spacer|button|input|select|radio|switch|alert|modal|tooltip|popover|tabs|menu|navbar|pagination|progress|slider|spinner|toast|typography|card|avatar|badge|chip|divider|list|tag|breadcrumb|dialog|drawer|stepper|table).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        sub: ["var(--font-sub)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue",green,"pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#9b62ea",
              50: "#f9f6fe",
              100: "#f1eafd",
              200: "#e5d8fc",
              300: "#d2baf8",
              400: "#b68df3",
              500: "#9b62ea",
              600: "#8849dd",
              700: "#6f30c0",
              800: "#5f2c9d",
              900: "#4e247f",
              950: "#320e5d",
            },
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: {
              DEFAULT: "#9b62ea",
              50: "#f9f6fe",
              100: "#f1eafd",
              200: "#e5d8fc",
              300: "#d2baf8",
              400: "#b68df3",
              500: "#9b62ea",
              600: "#8849dd",
              700: "#6f30c0",
              800: "#5f2c9d",
              900: "#4e247f",
              950: "#320e5d",
            },
          }, // dark theme colors
        }, // ... custom themes
      },
    }),
    require("tailwindcss-animate"),
  ],
};
