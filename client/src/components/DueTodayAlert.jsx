import { useEffect, useState } from "react";
import api from "../services/api";

export default function DueTodayAlert() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/tasks/today").then((res) => setCount(res.data.count));
  }, []);

  if (count === 0) return null;

  return (
    <div className="alert alert-warning">
      You have {count} tasks today
    </div>
  );
}