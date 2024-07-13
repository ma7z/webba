"use client"; // Indica que o código é executado no cliente (navegador), necessário para o uso do Next.js com componentes React que dependem de hooks ou estados.

import * as React from "react"; // Importa todas as exportações de React, essencial para utilizar JSX e hooks como useState e useEffect.
import { NextUIProvider } from "@nextui-org/system"; // Importa o NextUIProvider, que fornece o tema e configurações de UI para a aplicação.
import { useRouter } from "next/navigation"; // Importa o hook useRouter, usado para navegação no Next.js.
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Importa o ThemeProvider de next-themes para gerenciar temas (dark/light) na aplicação.
import { ThemeProviderProps } from "next-themes/dist/types"; // Importa os tipos de propriedades do ThemeProvider.

export interface ProvidersProps { // Define uma interface para as propriedades que o componente Providers irá receber.
  children: React.ReactNode; // children representa os componentes filhos que serão renderizados dentro do Providers.
  themeProps?: ThemeProviderProps; // themeProps é opcional e representa as propriedades que serão passadas para o ThemeProvider.
}

export function Providers({ children, themeProps }: ProvidersProps) { // Define o componente Providers, que recebe children e themeProps como props.
  const router = useRouter(); // Obtém o objeto router para navegação.

  return (
    // NextUIProvider encapsula os componentes filhos, fornecendo o contexto de UI e a função de navegação.
    <NextUIProvider navigate={router.push}>
      {/* NextThemesProvider encapsula os componentes filhos, fornecendo o contexto de temas. */}
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}