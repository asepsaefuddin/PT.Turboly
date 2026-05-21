import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    nav("/");
  }

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Task Manager</h1>
      </div>

      <button onClick={logout} className="btn btn-error">
        Logout
      </button>
    </div>
  );
}