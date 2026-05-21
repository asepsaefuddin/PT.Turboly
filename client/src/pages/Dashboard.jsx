import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import DueTodayAlert from "../components/DueTodayAlert"
import api from "../services/api"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [sort, setSort] = useState("createdAt")
  const [editingTask, setEditingTask] = useState(null)

  async function load() {
    try {
      const res = await api.get(`/tasks?sort=${sort}`)
      setTasks(res.data.data || res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    load()
  }, [sort])

  function cancelEdit() {
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black">My Tasks</h1>
            <p className="text-base-content/60 mt-2">Manage everything in one place</p>
          </div>

          <select
            className="select rounded-2xl"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>

        <DueTodayAlert />

        <TaskForm reload={load} editingTask={editingTask} cancelEdit={cancelEdit} />

        <TaskList tasks={tasks} reload={load} setEditingTask={setEditingTask} />
      </div>
    </div>
  )
}