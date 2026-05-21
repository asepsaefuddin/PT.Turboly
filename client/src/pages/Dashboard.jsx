import { useEffect, useState } from "react";

import api from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import DueTodayAlert from "../components/DueTodayAlert";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState("createdAt");

  async function load() {
    const res = await api.get(`/tasks?sort=${sort}`);
    setTasks(res.data.data);
  }

  useEffect(() => {
    load();
  }, [sort]);

  return (
    <div className="container mx-auto p-5">
      <DueTodayAlert />

      <select
        className="select"
        onChange={(e) => setSort(e.target.value)}
      >
        <option>createdAt</option>
        <option>priority</option>
        <option>dueDate</option>
        <option>title</option>
      </select>

      <TaskForm reload={load} />

      <TaskList tasks={tasks} reload={load} />
    </div>
  );
}