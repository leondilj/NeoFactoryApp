import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (fakeAuth.login(email, senha)) {
      localStorage.setItem("user", "logged");
      navigate("/dashboard");
    } else {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xs">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
