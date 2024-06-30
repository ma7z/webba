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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData); // Certifique-se de que a URL esteja correta
      setNotification(response.data.message);
      onRegisterSuccess(); // Chama a função de sucesso
    } catch (error) {
      setNotification('Erro ao salvar os dados');
    }
  };

  return (
    <form className="flex flex-col w-72 gap-y-4" onSubmit={handleSubmit}>
      <Input name="nome" type="text" label="Nome" placeholder="Digite seu nome" onChange={handleChange} />
      <Input name="email" type="email" label="Email" placeholder="Digite seu email" onChange={handleChange} />
      <Input name="cpf" type="text" label="CPF" placeholder="Digite seu cpf" onChange={handleChange} />
      <Input name="telefone" type="text" label="Telefone" placeholder="Digite seu telefone" onChange={handleChange} />
      <Input name="senha" type="password" label="Senha" placeholder="Digite sua senha" onChange={handleChange} />
      <Input name="confirmaSenha" type="password" label="Confirme sua senha" placeholder="Confirme sua senha" onChange={handleChange} />
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