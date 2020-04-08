import React from "react";
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
    onTaskDoneClick : (task : ITask) => void;
}

const Tasks = (props : ITasksProps) => {

  const isDone = (item : ITask) : boolean => {
    let index = props.tasks.map(x => x.id).indexOf(item.id);
    return props.tasks[index].done;
  }

  return (
    <>
      <ListGroup>
        {props.tasks.map((item: ITask, i: any) => (
          <ListGroupItem className="d-flex justify-content-between" key={i}>
            <span style={{textDecoration: isDone(item) ? "line-through" : ""}} onClick={() => props.onTaskDoneClick(item)}>{item.task}</span>
            <Button color="danger" onClick={() => props.removeTask(item)}>Remove</Button>
            </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Tasks;
