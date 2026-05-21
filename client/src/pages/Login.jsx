import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

export default function Login() {
  const nav = useNavigate()

  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()

    try {
      setLoading(true)

      const data = Object.fromEntries(new FormData(e.target))

      const res = await api.post("/auth/login", data)

      localStorage.setItem("token", res.data.token)

      nav("/dashboard")
    } catch {
      alert("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center px-20 text-white">
          <div className="max-w-xl">
            <div className="badge badge-primary mb-8 p-4">Task Manager</div>

            <h1 className="text-6xl font-black leading-tight">
              Stay
              Productive.
              Manage
              Everything.
            </h1>

            <p className="mt-8 text-lg opacity-80 leading-8">
              Organize tasks,
              track deadlines,
              and focus on what matters.
              Built for speed,
              clarity,
              and productivity.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-5">
              <div className="bg-white/10 rounded-3xl p-5 backdrop-blur">
                <h2 className="text-3xl font-bold">10×</h2>
                <p>Faster</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-5 backdrop-blur">
                <h2 className="text-3xl font-bold">24h</h2>
                <p>Track</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-5 backdrop-blur">
                <h2 className="text-3xl font-bold">∞</h2>
                <p>Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-[40px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-10">
            <div className="text-center mb-10">
              <h1 className="text-white text-4xl font-black">Welcome Back</h1>
              <p className="text-white/60 mt-2">Login to continue</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="text-white">Email</label>

                <input
                  required
                  name="email"
                  type="email"
                  placeholder="hello@gmail.com"
                  className="input w-full mt-2 h-14 rounded-2xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-white">Password</label>

                <input
                  required
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input w-full mt-2 h-14 rounded-2xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <button
                disabled={loading}
                className="btn btn-primary w-full h-14 rounded-2xl mt-4"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider text-white/40">OR</div>

            <p className="text-center text-white/70">
              Don't have account?{" "}
              <Link to="/register" className="text-primary font-semibold">
                Register
              </Link>
            </p>

            <div className="divider text-white/40">Secure Access</div>

            <p className="text-center text-white/50 text-sm">Task Manager Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
}