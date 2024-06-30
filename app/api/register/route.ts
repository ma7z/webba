import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: '127.0.0.1', 
  user: 'root', 
  password: '', 
  database: 'main_db',
  port: 3306
});

export async function POST(req: NextRequest) {
  try {
    const { nome, email, cpf, telefone, senha } = await req.json();

    const [result] = await db.query(
      'INSERT INTO users (name, mail, license, phone, password) VALUES (?, ?, ?, ?, ?)',
      [nome, email, cpf, telefone, senha]
    );

    return NextResponse.json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao salvar os dados' }, { status: 500 });
  }
}