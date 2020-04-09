import React from "react";
import {
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ITask from "../Model/ITask";

interface ITasksProps {
    tasks : ITask[];
    removeTask : (task : ITask) => void;
    onTaskDoneClick : (task : ITask) => void;
    filter : string;
}

const Tasks = (props : ITasksProps) => {

  const isDone = (item : ITask) : boolean => {
    let index = props.tasks.map(x => x.id).indexOf(item.id);
    return props.tasks[index].done;
  }
  
  const parseDate = (date : string) : string => {
    return date.replace('T', ' ').substring(0, 19);
  }

  return (
    <>
      <ListGroup>
        {props.tasks.map((item: ITask, i: any) => (
          <ListGroupItem className="d-flex justify-content-around" key={i}>
            <span style={{textDecoration: isDone(item) ? "line-through" : ""}}  onClick={() => props.onTaskDoneClick(item)}>{item.task}</span> 
            <span>{parseDate(item.timeStamp)}</span>
            <Button color="danger" onClick={() => props.removeTask(item)}>Remove</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Tasks;
