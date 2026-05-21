import api from "../services/api";

export default function TaskList({ tasks, reload }) {
  async function complete(id) {
    await api.patch(`/tasks/${id}`, { completed: true });
    reload();
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="card bg-base-100 my-3 shadow">
          <div className="card-body">
            <h2>{task.title}</h2>
            <p>{task.priority}</p>
            <button onClick={() => complete(task._id)} className="btn btn-success">
              Complete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}