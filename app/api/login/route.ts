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
    const { email, senha } = await req.json();

    const [rows]: any[] = await db.query(
      'SELECT * FROM users WHERE mail = ? AND password = ?',
      [email, senha]
    );

    if (rows.length > 0) {
      return NextResponse.json({ message: 'Login bem-sucedido!' });
    } else {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao processar o login' }, { status: 500 });
  }
}