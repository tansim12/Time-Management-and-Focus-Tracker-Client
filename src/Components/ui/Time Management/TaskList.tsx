import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Input, Button } from "@nextui-org/react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Card className="p-4 bg-gray-800 text-white">
      <h3 className="text-2xl font-semibold mb-4 text-purple-400">
        Cosmic Tasks
      </h3>
      <div className="flex mb-4">
        <Input
          placeholder="Add a new cosmic task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mr-2"
        />
        <Button auto onClick={addTask} color="secondary">
          Add
        </Button>
      </div>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mb-2"
          >
            {/* <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>
              {task.text}
            </span> */}
            {/* <Button
              auto
              color="error"
              size="sm"
              onClick={() => removeTask(task.id)}
              className="ml-auto"
            >
              Delete
            </Button> */}
          </motion.div>
        ))}
      </AnimatePresence>
    </Card>
  );
};

export default TaskList;
