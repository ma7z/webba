"use client";

// Importa os hooks useState de React e os componentes Button e Input de NextUI.
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP.
import { useRouter } from 'next/navigation'; // Importa o hook useRouter do Next.js para navegação programática.

// Define o componente RegisterForm que recebe a função onRegisterSuccess como uma prop.
const RegisterForm = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  // Define o estado formData com campos de nome, email, cpf, telefone, senha e confirmaSenha.
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmaSenha: ''
  });

  // Define estados para mensagens de erro e notificações.
  const [notification, setNotification] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [telefoneError, setTelefoneError] = useState<string | null>(null);

  // Define mensagens de erro padrão.
  const invalidEmailMessage = "Por favor, insira um email válido!";
  const invalidCpfMessage = "Por favor, insira um CPF válido!";
  const invalidTelefoneMessage = "Por favor, insira um telefone válido!";
  const messageError = "As senhas devem ser iguais!";

  // Função para lidar com mudanças nos campos do formulário.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Formata o campo de telefone se ele for alterado.
    if (name === 'telefone') {
      value = formatTelefone(value);
    }

    // Atualiza o estado formData com o novo valor.
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para formatar o número de telefone.
  const formatTelefone = (telefone: string): string => {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for dígito.

    if (telefone.length <= 10) {
      // Formato (XX) XXXX-XXXX.
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else {
      // Formato (XX) XXXXX-XXXX.
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    }
    return telefone;
  };

  // Função para validar email.
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Função para validar CPF.
  const validateCpf = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;

    if (digit1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    if (digit2 !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  // Função para validar o número de telefone.
  const validateTelefone = (telefone: string): boolean => {
    const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return re.test(telefone);
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida email, CPF e telefone, e define as mensagens de erro se inválidos.
    if (!validateEmail(formData.email)) {
      setEmailError(invalidEmailMessage);
      return;
    }
    setEmailError(null);

    if (!validateCpf(formData.cpf)) {
      setCpfError(invalidCpfMessage);
      return;
    }
    setCpfError(null);

    if (!validateTelefone(formData.telefone)) {
      setTelefoneError(invalidTelefoneMessage);
      return;
    }
    setTelefoneError(null);

    // Verifica se as senhas coincidem.
    if (formData.senha !== formData.confirmaSenha) {
      setPasswordError(messageError);
      return;
    }
    setPasswordError(null);

    try {
      // Faz a requisição POST para a rota de registro.
      const response = await axios.post('/api/register', formData);
      setNotification(response.data.message);
      onRegisterSuccess();
    } catch (error) {
      setNotification('Erro ao salvar os dados');
    }
  };

  // Retorna o formulário de registro.
  return (
    <form className="flex flex-col w-72 gap-y-4" onSubmit={handleSubmit}>
      <Input name="nome" type="text" label="Nome" placeholder="Digite seu nome" onChange={handleChange} />
      <Input name="email" type="email" label="Email" placeholder="Digite seu email" onChange={handleChange} />
      {emailError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{emailError}</p>}
      <Input name="cpf" type="text" label="CPF" placeholder="Digite seu cpf" onChange={handleChange} />
      {cpfError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{cpfError}</p>}
      <Input name="telefone" type="text" label="Telefone" placeholder="Digite seu telefone" onChange={handleChange} />
      {telefoneError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{telefoneError}</p>}
      <Input name="senha" type="password" label="Senha" placeholder="Digite sua senha" onChange={handleChange} />
      <Input name="confirmaSenha" type="password" label="Confirme sua senha" placeholder="Confirme sua senha" onChange={handleChange} />
      {passwordError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{passwordError}</p>}
      <Button type="submit">Salvar</Button>
      <Button type="button" onClick={onRegisterSuccess}>Voltar</Button>
      {notification && <p>{notification}</p>}
    </form>
  );
};

// Componente Home, que contém o formulário de login e uma opção para alternar para o formulário de registro.
export default function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  // Função para lidar com mudanças nos campos de login.
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Função para lidar com o envio do formulário de login.
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', loginData);
      setLoginError(null);
      // Redireciona para a nova página após login bem-sucedido.
      router.push('/main');
    } catch (error) {
      setLoginError('Dados inválidos!');
    }
  };

  // Função para alternar a exibição do formulário de registro.
  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  // Função para lidar com o sucesso no registro.
  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
  };

  // Retorna a interface de login e registro.
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-lg">Por favor, conecte-se para continuar.</h1>
      {!showRegisterForm && (
        <form className="flex flex-col w-72 gap-y-4" onSubmit={handleLoginSubmit}>
          <Input name="email" type="email" variant="faded" label="Email" placeholder="Digite seu email" onChange={handleLoginChange} />
          {loginError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{loginError}</p>}
          <Input name="senha" type="password" variant="faded" label="Senha" placeholder="Digite sua senha" onChange={handleLoginChange} />
          {loginError && <p className="text-red-500 text-xs -mt-4 -mb-4 text-center">{loginError}</p>}
          <Button type="button" onClick={toggleRegisterForm}>Cadastrar-se</Button>
          <Button type="submit">Entrar</Button>
        </form>
      )}
      {showRegisterForm && <RegisterForm onRegisterSuccess={handleRegisterSuccess} />}
    </section>
  );
}