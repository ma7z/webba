"use client";

import { title } from "@/components/primitives";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function App() {
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <img src="../public/logo.png" alt="Logo" style={{ height: '30px', width: '150px' }} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Cadastrar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Veículos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Motoristas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Parceiros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Notas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Relatórios
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="ml-56 mr-4" justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}