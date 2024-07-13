"use client"; // Esta linha indica que o código é executado no lado do cliente.

import { useEffect } from "react"; // Importa o hook useEffect da biblioteca React.

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Define um componente funcional chamado Error que recebe um objeto com duas propriedades: error (do tipo Error) e reset (uma função sem retorno).
  
  useEffect(() => {
    // useEffect é um hook que executa um efeito colateral, neste caso, quando o componente é montado ou quando a variável 'error' muda.

    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error); // Loga o erro no console para fins de depuração.
  }, [error]); // O efeito colateral será executado toda vez que o valor de 'error' mudar.

  return (
    <div>
      {/* Renderiza um elemento <div> */}
      <h2>Something went wrong!</h2>
      {/* Renderiza um título com a mensagem "Something went wrong!" */}
      <button
        onClick={
          // Define um evento onClick para o botão.
          // Attempt to recover by trying to re-render the segment
          () => reset() // Quando o botão é clicado, a função reset é chamada para tentar recuperar e re-renderizar o componente.
        }
      >
        Try again
        {/* Texto exibido no botão */}
      </button>
    </div>
  );
}