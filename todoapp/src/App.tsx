import React, {useState, useEffect} from 'react';
import './App.css';
import { Container,  Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import SubmissionBox from "./Components/SubmissionBox";
import Tasks from "./Components/Tasks";
import TodoRepository from './Api/todoRepository';

import ITask from "./Model/ITask";

const App = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (task : string) => {
    if (task === "") return;
    var newTask : ITask = {id : getMaxId(tasks) + 1, task: task, timeStamp: new Date(), done : false};
    axios.post(
      'https://localhost:44310/api/todolist',
      { 
        id : newTask.id, 
        task : newTask.task, 
        done: newTask.done, 
        timeStamp:newTask.timeStamp
      },
      { headers: { 'Content-Type': 'application/json' } }).then(response => { 
        console.log(response)
      })
      .catch(error => {
          console.log(error.response)
      });
    
    setTasks([...tasks, newTask]);
  }

  const getMaxId = (tasks : ITask[]) => {
    return Math.max.apply(Math, tasks.map(x => x.id));
  }

  const removeTask = (task : ITask) => {
    setTasks(tasks.filter(item => item.task !== task.task));
    axios.delete('https://localhost:44310/api/todolist/' + task.id, {
      data : {id : task.id}
    }
    );
  }

  useEffect(() => {
    const fetchData = async() => {
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
          <SubmissionBox tasks={tasks} addTask={addTask}/>
          <Tasks tasks={tasks} removeTask={removeTask}/>
        </Col>
      </Container>
    </div>
  );
}

export default App;
