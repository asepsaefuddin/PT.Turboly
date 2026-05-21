import api from "../services/api"

export default function TaskForm({ reload }) {
  async function submit(e) {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target))

    await api.post("/tasks", data)

    reload()

    e.target.reset()
  }

  return (
    <div className="rounded-3xl bg-base-100 shadow-xl border border-base-300 p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Create Task</h2>
        <p className="text-base-content/60">Add your work and keep everything organized</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="label">Task Title</label>
          <input
            name="title"
            required
            placeholder="Finish dashboard UI..."
            className="input input-bordered w-full h-14 rounded-2xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Priority</label>
            <select
              name="priority"
              className="select select-bordered w-full h-14 rounded-2xl"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              required
              className="input input-bordered w-full h-14 rounded-2xl"
            />
          </div>
        </div>

        <button className="btn btn-primary w-full h-14 rounded-2xl text-base">
          Create Task
        </button>
      </form>
    </div>
  )
}