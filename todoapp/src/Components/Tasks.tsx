import React from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {ITask} from "../App";

interface ITasksProp {
    tasks : ITask[];
    removeTask : (task : ITask) => void;
}

const Tasks = (props : ITasksProp) => {
  return (
    <>
      <ListGroup>
        {props.tasks.map((item: ITask, i: any) => (
          <ListGroupItem className="d-flex justify-content-between" key={i}>{item.task}<Button color="danger" onClick={() => props.removeTask(item)}>Remove</Button></ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Tasks;
