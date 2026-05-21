import api from "../services/api";

export default function TaskForm({ reload }) {
  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/tasks", data);
    reload();
    e.target.reset();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        name="title"
        placeholder="Task"
        className="input input-bordered w-full"
      />

      <select name="priority" className="select w-full">
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>

      <input type="date" name="dueDate" className="input w-full" />

      <button className="btn btn-primary">Add</button>
    </form>
  );
}