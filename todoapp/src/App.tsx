import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmissionBox from "./Components/SubmissionBox";
import Tasks from "./Components/Tasks";
import TodoRepository from "./Api/todoRepository";
import DropDownMenu from "./Components/DropDownMenu";
import ITask from "./Model/ITask";
import ApiHandler from "./Api/ApiHandler";
import Helper from "./Helpers";

const App = () => {
  const apiHandler = new ApiHandler();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [filter, setFilter] = useState<string>("All");

  const setNewFilter = (newFilter : string) : void => { setFilter(newFilter); }

  const addTask = (task: string) : void => {
    if (task === "") return;

    let newTask: ITask = {
      id: Helper.getMaxId(tasks) + 1,
      task: task,
      timeStamp: new Date().toJSON(),
      done: false,
    };
    
    apiHandler.postTaskAPI(newTask);
    setTasks([...tasks, newTask]);
  };

  const onTaskDoneClick = (task : ITask) : void => {
    let cloned : ITask[] = JSON.parse(JSON.stringify(tasks));
    let taskIndex : number = cloned.map(x => x.id).indexOf(task.id);
    cloned[taskIndex].done = !cloned[taskIndex].done;
    setTasks(cloned);
    apiHandler.postTaskAPI(cloned[taskIndex]);
  }

  const removeTask = (task: ITask) : void => {
    setTasks(tasks.filter((item) => item.id !== task.id));
    apiHandler.deleteTaskAPI(task);
  };


  const getActiveTasks = () : ITask[] => {
    return tasks.filter(x => !x.done);
  }

  const getCompletedTasks = () : ITask[] => {
    return tasks.filter(x => x.done);
  }

  const filteredTasks = () : ITask[] => {
    if (filter === "Active") {
      return getActiveTasks();
    }
    if (filter === "Completed") {
      return getCompletedTasks();
    }
    return tasks;
  }


  useEffect(() => {
    const fetchData = async () => {
      const repo = new TodoRepository();
      const loadedItems = await repo.getAll();
      setTasks(loadedItems);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Col sm="5" md={{ size: 8, offset: 3 }}>
          <SubmissionBox tasks={tasks} addTask={addTask} />
          <DropDownMenu filter={filter} setFilter={setNewFilter}/>
          <Tasks tasks={filteredTasks()} removeTask={removeTask} onTaskDoneClick={onTaskDoneClick} />
        </Col>
      </Container>
    </div>
  );
};

export default App;
