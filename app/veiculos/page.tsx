"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function AboutPage() {
  return (
  <Navbar isBordered isBlurred={false}>
    <NavbarBrand>
      <img src="../public/logo.png" alt="Logo" style={{ height: '30px', width: '150px' }} />
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-8" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/main">
          Home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/cadastrar">
          Cadastrar
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Veículos
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/motoristas">
          Motoristas
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/parceiros">
          Parceiros
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/notas">
          Notas
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/relatorios">
          Relatórios
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent className="ml-56 mr-4" justify="end">
      <NavbarItem>
        <Button as={Link} color="primary" href="/" variant="flat">
          Sair
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  );
}

