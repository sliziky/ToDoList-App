import React, { useState } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ITask from "../Model/ITask";

interface ITasksProps {
    tasks : ITask[];
    removeTask : (task : ITask) => void;
}

const Tasks = (props : ITasksProps) => {

  const [needToRender, setNeedToRender] = useState(false);

  const onTaskClick = (item : ITask) : void => {
    let index = props.tasks.map(x => x.id).indexOf(item.id);
    props.tasks[index].done = !props.tasks[index].done;
    setNeedToRender(!needToRender);
    console.log("Task done: ",props.tasks[index].done);
  }

  const isDone = (item : ITask) : boolean => {
    let index = props.tasks.map(x => x.id).indexOf(item.id);
    return props.tasks[index].done;
  }

  return (
    <>
      <ListGroup>
        {props.tasks.map((item: ITask, i: any) => (
          <ListGroupItem className="d-flex justify-content-between" key={i}>
            <span style={{textDecoration: isDone(item) ? "line-through" : ""}} onClick={() => onTaskClick(item)}>{item.task}</span>
            <Button color="danger" onClick={() => props.removeTask(item)}>Remove</Button>
            </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Tasks;
