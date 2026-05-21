import { useEffect, useState } from "react"
import api from "../services/api"

export default function TaskForm({ reload, editingTask, cancelEdit }) {
  const [form, setForm] = useState({
    title: "",
    priority: "low",
    dueDate: ""
  })

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        priority: editingTask.priority || "low",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ""
      })
    }
  }, [editingTask])

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function submit(e) {
    e.preventDefault()

    if (editingTask) {
      await api.patch(`/tasks/${editingTask._id}`, form)
      if (typeof cancelEdit === "function") cancelEdit()
    } else {
      await api.post("/tasks", form)
    }

    setForm({
      title: "",
      priority: "low",
      dueDate: ""
    })

    if (typeof reload === "function") reload()
  }

  return (
    <div className="rounded-3xl bg-base-100 shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6">
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={submit} className="space-y-5">
        <input
          name="title"
          value={form.title}
          onChange={change}
          placeholder="Task title"
          required
          className="input input-bordered w-full h-14 rounded-2xl"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <select
            name="priority"
            value={form.priority}
            onChange={change}
            className="select select-bordered rounded-2xl w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={change}
            required
            className="input input-bordered rounded-2xl w-full"
          />
        </div>

        <div className="flex gap-3">
          <button className="btn btn-primary flex-1 rounded-2xl">
            {editingTask ? "Update" : "Create"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn btn-outline rounded-2xl"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}