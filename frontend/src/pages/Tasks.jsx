import React, { useEffect, useState } from "react";

import PageAdmin from "../components/PageAdmin";

import Modal from "../components/Modal";

import TaskForm from "../modules/TaskForm";
import TaskCard from "../modules/TaskCard";

import { TaskStatus } from "../utils/constants";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTasks } from "../redux/slices/task";
import { fetchUsers } from "../redux/slices/user";
import StatusMessage from "../components/StatusMessage";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const { tasks, taskStatus } = useAppSelector((state) => state.tasks);

  const [activeTask, setActiveTask] = useState({});

  /**
   *
   * Load tasks
   *
   */
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, []);

  const getTasksByStatus = (status) => {
    return tasks?.filter((t) => t.status === status);
  };

  console.log(tasks[0]);

  return (
    <PageAdmin title="Tasks">
      <div className="flex flex-col w-full gap-4">
        <div className="block">
          <Modal
            title="New Task"
            buttonText={"New Task"}
            isOpen={activeTask?.id !== undefined}
          >
            <TaskForm data={activeTask} />
          </Modal>
        </div>

        <StatusMessage status={taskStatus} />

        {!taskStatus?.loading && tasks?.length === 0 && (
          <div className="block p-4 text-center bg-blue-50 text-blue-500">
            No tasks found
          </div>
        )}

        {tasks?.length > 0 && (
          <div className="flex gap-16 w-full">
            {[
              { label: "TODO", status: TaskStatus.TODO },
              { label: "IN PROGRESS", status: TaskStatus.IN_PROGRESS },
              { label: "COMPLETED", status: TaskStatus.COMPLETED },
            ].map((obj, index) => {
              return (
                <div key={index} className="flex flex-col gap-4 grow">
                  <h4 className="mb-2">{obj?.label}</h4>
                  {getTasksByStatus(obj.status).map((t, index) => (
                    <TaskCard
                      key={index}
                      data={t}
                      onTaskSelected={(data) => {
                        setActiveTask(data);
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageAdmin>
  );
};

export default Tasks;
