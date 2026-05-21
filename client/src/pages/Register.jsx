// ...existing code...
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Register() {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()

    try {
      setLoading(true)

      const data = Object.fromEntries(new FormData(e.target))

      await api.post("/auth/register", data)

      nav("/")
    } catch (err) {
      alert(err.response?.data?.error || "Register failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-black
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-lg
          bg-white/10
          backdrop-blur-xl
          rounded-[40px]
          border
          border-white/10
          shadow-2xl
          p-10
        "
      >
        <div className="text-center">
          <h1 className="text-white text-5xl font-black">Create Account</h1>
          <p className="text-white/60 mt-3 mb-10">Start managing tasks smarter</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-white">Email</label>
            <input
              required
              name="email"
              type="email"
              placeholder="hello@gmail.com"
              className="
                input
                w-full
                mt-2
                h-14
                rounded-2xl
                bg-white/5
                text-white
              "
            >
            </input>
          </div>

          <div>
            <label className="text-white">Password</label>
            <input
              required
              name="password"
              type="password"
              placeholder="••••••••"
              className="
                input
                w-full
                mt-2
                h-14
                rounded-2xl
                bg-white/5
                text-white
              "
            >
            </input>
          </div>

          <button
            disabled={loading}
            className="
              btn
              btn-primary
              w-full
              h-14
              rounded-2xl
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="divider text-white/40">OR</div>

        <p className="text-center text-white/70">
          Already have account?{" "}
          <Link to="/" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
