import api from "../services/api"

export default function TaskList({ tasks, reload }) {
  async function toggleComplete(task) {
    await api.patch(`/tasks/${task._id}`, {
      completed: !task.completed,
    })

    reload()
  }

  function priorityColor(priority) {
    if (priority === "high") return "badge-error"
    if (priority === "medium") return "badge-warning"
    return "badge-success"
  }

  return (
    <div className="grid gap-5">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`group rounded-3xl shadow-lg border transition duration-300 hover:scale-[1.01] hover:shadow-2xl p-6 ${
            task.completed ? "bg-red-50 border-red-300" : "bg-base-100 border-base-300"
          }`}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2
                  className={`text-2xl font-bold ${task.completed ? "line-through text-red-500" : ""}`}
                >
                  {task.title}
                </h2>

                <div className={`badge ${priorityColor(task.priority)}`}>{task.priority}</div>
              </div>

              <div className="text-sm text-base-content/60 space-y-1">
                <p>
                  Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>

                <p>
                  Status:{" "}
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleComplete(task)}
              className={`btn rounded-2xl min-w-36 ${task.completed ? "btn-error" : "btn-success"}`}
            >
              {task.completed ? "Incomplete" : "Complete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}