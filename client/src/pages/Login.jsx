import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <div className="hero min-h-screen">
      <div className="card w-96 bg-base-100 shadow">
        <form onSubmit={submit} className="card-body">
          <h1 className="text-3xl">Login</h1>

          <input name="email" placeholder="email" className="input input-bordered" />

          <input type="password" name="password" className="input input-bordered" />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}