export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Rumo a vaga!",
  description: "A ferramenta que vai te ajudar a conquistar a vaga dos seus sonhos!",
  navItems: [
    {
      label: "Página Inicial",
      href: "/dashboard",
    },
    // {
    //   label: "Estudos",
    //   href: "/estudos",
    // },
    {
      label: "Estatísticas",	
      href: "/estatisticas",
    },
  ],
  navMenuItems: [
    {
      label: "Página Inicial",
      href: "/dashboard",
    },
    {
      label: "Estudos",
      href: "/estudos",
    },
    {
      label: "Estatísticas",	
      href: "/estatisticas",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
