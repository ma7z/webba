import "@/styles/globals.css"; // Importa o arquivo global de estilos CSS
import { Metadata, Viewport } from "next"; // Importa os tipos Metadata e Viewport do Next.js
import { Link } from "@nextui-org/link"; // Importa o componente Link do NextUI
import clsx from "clsx"; // Importa a função clsx para unir classes CSS condicionalmente
import { Providers } from "./providers";// Importa o componente Providers
import { siteConfig } from "@/config/site"; // Importa as configurações do site
import { fontSans } from "@/config/fonts"; // Importa a configuração das fontes
import { Navbar } from "@/components/navbar"; // Importa o componente Navbar
// Define as meta informações do site, incluindo título, descrição e ícone
export const metadata: Metadata = {
  title: {
    // Título padrão do site
    default: siteConfig.name,
    // Template de título para páginas específicas
    template: `%s - ${siteConfig.name}`,
  },
  // Descrição do site
  description: siteConfig.description,
  // Ícone do site (favicon)
  icons: {
    icon: "/favicon.ico",
  },
};
// Define as configurações de viewport, incluindo cores para diferentes esquemas de cor
export const viewport: Viewport = {
  themeColor: [
    // Cor do tema para o esquema de cor claro
    { media: "(prefers-color-scheme: light)", color: "white" },
    // Cor do tema para o esquema de cor escuro
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
// Componente RootLayout que define a estrutura principal da página
export default function RootLayout({
  // Propriedade children que representa os elementos filhos do componente
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Define o elemento HTML principal com supressão de avisos de hidratação e linguagem inglesa
    <html suppressHydrationWarning lang="en">
      {/* Define o elemento head */}
      <head />
      {/* Define o corpo da página com classes CSS utilizando clsx para unir classes condicionalmente */}
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased", // Classes CSS
          fontSans.variable, // Fonte sans-serif configurada
        )}
      >
        {/* Provedor de temas, definindo o tema padrão como "escuro" */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* Contêiner principal da página, ocupando a altura total da tela */}
          <div className="relative flex flex-col h-screen">
            {/* Elemento principal, centrado e com preenchimento horizontal */}
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
              {/* Renderiza os elementos filhos passados para o RootLayout */}
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}