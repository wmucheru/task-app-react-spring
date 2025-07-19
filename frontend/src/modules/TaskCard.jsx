import { TaskPriority } from "../utils/constants";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTask, setTasks } from "../redux/slices/task";

const TaskCard = ({ data = {}, onTaskSelected }) => {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((state) => state.tasks);
  const { users } = useAppSelector((state) => state.users);

  const { id, title, description, status, priority, assigneeId, creatorId } =
    data;

  const getAssigneeName = (userId) => {
    return users?.filter((u) => u.id === userId)?.[0]?.username || "User";
  };

  const renderPriority = (priority) => {
    let node = <></>;

    switch (priority) {
      case TaskPriority.HIGH:
        node = <span className="text-red-600"></span>;
        break;

      case TaskPriority.MEDIUM:
        node = <span className="text-blue-600"></span>;
        break;

      default:
      case TaskPriority.LOW:
        node = <span className="text-slate-600"></span>;
        break;
    }

    return node;
  };

  const onTaskDeleted = (id) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div
      className="flex flex-col p-4 border border-blue-300 shadow-md 
      bg-white rounded-md"
    >
      <h4 className="m-0 mb-4">{title}</h4>
      <p className="mb-2">
        <span className="text-gray-400">{description || "No description"}</span>
      </p>
      <p>
        <small className="uppercase">{renderPriority(priority)}</small>
      </p>
      <p>Assignee: {getAssigneeName(assigneeId)}</p>
      <br></br>
      <p className="flex gap-2">
        <button
          className="bg-orange-400 text-xs"
          onClick={() => onTaskSelected(data)}
        >
          Edit
        </button>
        <button
          className="bg-white text-red-600 text-xs"
          onClick={() => onTaskDeleted(id)}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default TaskCard;
