import api from "../services/api"

export default function TaskList({ tasks = [], reload, setEditingTask }) {
  async function toggle(task) {
    try {
      await api.patch(`/tasks/${task._id}`, { completed: !task.completed })
      if (typeof reload === "function") reload()
    } catch {
      alert("Update failed")
    }
  }

  async function remove(id) {
    try {
      const ok = window.confirm("Delete task?")
      if (!ok) return
      await api.delete(`/tasks/${id}`)
      if (typeof reload === "function") reload()
    } catch {
      alert("Delete failed")
    }
  }

  function priorityClass(priority) {
    if (priority === "high") return "bg-red-100 text-red-800"
    if (priority === "medium") return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div className="grid gap-5">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`group flex items-center justify-between gap-6 p-6 rounded-2xl border transition-shadow duration-200 ${
            task.completed ? "bg-base-200 border-base-300 shadow-sm" : "bg-white border-base-200 shadow"
          }`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <h3 className={`text-xl font-semibold truncate ${task.completed ? "line-through text-base-content/60" : "text-base-content"}`}>
                {task.title}
              </h3>

              <span className={`ml-2 inline-block text-sm font-medium px-3 py-1 rounded-full ${priorityClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            <div className="mt-2 text-sm text-base-content/60 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span>
                Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
              </span>

              <span className="hidden sm:inline">•</span>

              <span>
                Status: <strong>{task.completed ? "Completed" : "Pending"}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => toggle(task)}
              className={`btn btn-sm rounded-2xl ${task.completed ? "btn-ghost btn-error" : "btn-success"}`}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
              onClick={() => setEditingTask(task)}
              className="btn btn-sm btn-outline btn-warning rounded-2xl"
            >
              Edit
            </button>

            <button
              onClick={() => remove(task._id)}
              className="btn btn-sm btn-outline btn-error rounded-2xl"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}