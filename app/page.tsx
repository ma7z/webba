"use client";

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import axios from 'axios';

const RegisterForm = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmaSenha: ''
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [telefoneError, setTelefoneError] = useState<string | null>(null);

  const invalidEmailMessage = "Por favor, insira um email válido!";
  const invalidCpfMessage = "Por favor, insira um CPF válido!";
  const invalidTelefoneMessage = "Por favor, insira um telefone válido!";
  const messageError = "As senhas devem ser iguais!";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'telefone') {
      value = formatTelefone(value);
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatTelefone = (telefone: string): string => {
    telefone = telefone.replace(/\D/g, ''); // Remove tudo que não for dígito

    if (telefone.length <= 10) {
      // Formato (XX) XXXX-XXXX
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else {
      // Formato (XX) XXXXX-XXXX
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    }
    return telefone;
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

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

  const validateTelefone = (telefone: string): boolean => {
    const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return re.test(telefone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (formData.senha !== formData.confirmaSenha) {
      setPasswordError(messageError);
      return;
    }
    setPasswordError(null);

    try {
      const response = await axios.post('/api/register', formData);
      setNotification(response.data.message);
      onRegisterSuccess();
    } catch (error) {
      setNotification('Erro ao salvar os dados');
    }
  };

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

// Componente Home
export default function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-lg">Por favor, conecte-se para continuar.</h1>
      {!showRegisterForm && (
        <form className="flex flex-col w-72 gap-y-4">
          <Input type="email" variant="faded" label="Email" placeholder="Digite seu email" />
          <Input type="password" variant="faded" label="Senha" placeholder="Digite sua senha" />
          <Button type="button" onClick={toggleRegisterForm}>Cadastrar-se</Button>
          <Button type="submit">Entrar</Button>
        </form>
      )}
      {showRegisterForm && <RegisterForm onRegisterSuccess={handleRegisterSuccess} />}
    </section>
  );
}