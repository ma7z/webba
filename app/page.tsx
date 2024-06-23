import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Switch } from "@nextui-org/switch";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-lg">Por favor, conecte-se para continuar.</h1>
      <form action="" className="flex flex-col w-1/3 gap-y-4">
        <Input
          type="email"
          variant="faded"
          label="Email"
          placeholder="Digite seu email"
        />
        <Input
          type="password"
          variant="faded"
          label="Senha"
          placeholder="Digite sua senha"
        />
        <Switch defaultSelected aria-label="Automatic updates" />
        <Checkbox size="sm" defaultSelected>
          Confirme os termos para prosseguir
        </Checkbox>
        <Button type="submit">Entrar</Button>
      </form>
    </section>
  );
}
