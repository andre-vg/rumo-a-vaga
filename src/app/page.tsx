import {
  Clock,
  BookOpen,
  BarChart3,
  Target,
  Brain,
  CheckCircle,
  Zap,
} from "lucide-react";

import { LandingHeader } from "@/components/features/landing/landing-header";
import { HeroSection } from "@/components/features/landing/hero-section";
import { FeaturesSection } from "@/components/features/landing/features-section";
import { HowItWorksSection } from "@/components/features/landing/how-it-works-section";
import { PricingSection } from "@/components/features/landing/pricing-section";
import { CTASection } from "@/components/features/landing/cta-section";
import { Footer } from "@/components/features/landing/footer";

const navItems = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#precos", label: "Preços" },
];

const stats = [
  { value: "10k+", label: "Estudos Registrados" },
  { value: "50k+", label: "Horas de Foco" },
  { value: "1M+", label: "Questões Respondidas" },
  { value: "95%", label: "Usuários Satisfeitos" },
];

const features = [
  {
    icon: Clock,
    title: "Timer Inteligente",
    description:
      "Controle seu tempo de estudo com precisão. Pause, retome e acompanhe cada minuto dedicado aos seus objetivos.",
  },
  {
    icon: BookOpen,
    title: "Organize Matérias",
    description:
      "Crie e gerencie todas as suas matérias em um só lugar. Mantenha seu conteúdo organizado e acessível.",
  },
  {
    icon: BarChart3,
    title: "Estatísticas Detalhadas",
    description:
      "Visualize seu progresso com gráficos e métricas. Saiba exatamente quanto tempo você estudou e onde pode melhorar.",
  },
  {
    icon: Target,
    title: "Acompanhamento de Questões",
    description:
      "Registre questões respondidas e sua taxa de acerto. Identifique seus pontos fortes e fracos.",
  },
  {
    icon: Brain,
    title: "Métodos de Estudo",
    description:
      "Utilize diferentes métodos como revisão, simulado ou estudo teórico. Adapte sua estratégia ao seu objetivo.",
  },
  {
    icon: CheckCircle,
    title: "Histórico Completo",
    description:
      "Acesse todo seu histórico de estudos. Revise o que você já estudou e planeje seus próximos passos.",
  },
];

const steps = [
  {
    step: "01",
    title: "Cadastre suas matérias",
    description:
      "Adicione todas as matérias que você precisa estudar. Organize por disciplinas, tópicos ou áreas de conhecimento.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Inicie seus estudos",
    description:
      "Escolha uma matéria, defina o método de estudo e comece o timer. O sistema cuida do resto.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Acompanhe seu progresso",
    description:
      "Visualize estatísticas detalhadas, identifique padrões e otimize sua rotina de estudos.",
    icon: BarChart3,
  },
];

const plans = [
  {
    name: "Grátis",
    description: "Perfeito para começar",
    price: "R$ 0",
    period: "/mês",
    features: [
      { text: "Matérias ilimitadas" },
      { text: "Timer de estudos" },
      { text: "Histórico básico" },
      { text: "Estatísticas simples" },
    ],
    buttonText: "Começar Grátis",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Para quem leva a sério",
    price: "R$ 19",
    period: "/mês",
    features: [
      { text: "Tudo do plano Grátis" },
      { text: "Estatísticas avançadas" },
      { text: "Exportação de dados" },
      { text: "Metas personalizadas" },
      { text: "Suporte prioritário" },
      { text: "Sem anúncios" },
    ],
    recommended: true,
    buttonText: "Começar Pro",
    buttonVariant: "default" as const,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50">
      <LandingHeader navItems={navItems} />

      <HeroSection
        title="Domine seus estudos com"
        highlightedText="foco e organização"
        description="O sistema completo para quem quer alcançar seus objetivos. Timer inteligente, estatísticas detalhadas e organização de matérias em uma única plataforma."
        stats={stats}
      />

      <FeaturesSection
        title="Tudo que você precisa para"
        highlightedText="conquistar sua vaga"
        description="Ferramentas poderosas e intuitivas para organizar seus estudos e acompanhar seu progresso."
        features={features}
      />

      <HowItWorksSection
        title="Como funciona?"
        description="Comece a estudar de forma organizada em 3 passos simples"
        steps={steps}
      />

      <PricingSection
        title="Preço simples e justo"
        description="Comece gratuitamente e evolua conforme suas necessidades"
        plans={plans}
      />

      <CTASection
        title="Pronto para conquistar sua vaga?"
        description="Junte-se a milhares de estudantes que já organizam seus estudos com o Rumo à Vaga."
        buttonText="Criar Conta Grátis"
      />

      <Footer
        brandName="Rumo à Vaga"
        copyright="© 2025 Rumo à Vaga. Todos os direitos reservados."
      />
    </div>
  );
}
