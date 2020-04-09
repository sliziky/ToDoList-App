import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SubmissionBox from "./Components/SubmissionBox";
import Tasks from "./Components/Tasks";
import TodoRepository from "./Api/todoRepository";
import DropDownMenu from "./Components/DropDownMenu";
import ITask from "./Model/ITask";
import { API_URL } from "./Api/constants";

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [filter, setFilter] = useState<string>("All");

  const setNewFilter = (newFilter : string) : void => {
    setFilter(newFilter);
  }
  const addTask = (task: string) : void => {
    if (task === "") return;

    let newTask: ITask = {
      id: getMaxId(tasks) + 1,
      task: task,
      timeStamp: new Date().toJSON(),
      done: false,
    };

    sendTaskToApi(newTask);
    setTasks([...tasks, newTask]);
  };

  const sendTaskToApi = (task : ITask) : void => {
    let data = JSON.stringify({
      id : task.id,
      task : task.task,
      done : task.done,
      timeStamp : task.timeStamp
    });
    postDataToApi(data);
  }

  const getMaxId = (tasks: ITask[]): number => {
    if (tasks.length === 0) return -1; // first index will be 0
    return Math.max.apply(
      Math,
      tasks.map((x) => x.id)
    );
  };

  const onTaskDoneClick = (task : ITask) : void => {
    let cloned : ITask[] = JSON.parse(JSON.stringify(tasks));
    let taskIndex : number = cloned.map(x => x.id).indexOf(task.id);
    cloned[taskIndex].done = !cloned[taskIndex].done;
    setTasks(cloned);
    sendTaskToApi(cloned[taskIndex]);
  }

  const removeTask = (task: ITask) : void => {
    setTasks(tasks.filter((item) => item.id !== task.id));
    axios.delete(API_URL + "/" + task.id, {
      data: { id: task.id },
    });
  };

  const postDataToApi = (data : string) : void => {
    axios
    .post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

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
          <Tasks tasks={filteredTasks()} filter={filter} removeTask={removeTask} onTaskDoneClick={onTaskDoneClick} />
        </Col>
      </Container>
    </div>
  );
};

export default App;
