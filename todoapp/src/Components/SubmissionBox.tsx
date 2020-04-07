import React, { useState } from "react"
import { InputGroup, Button, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ITask from "../Model/ITask";

interface ISubmissionProps {
    tasks : ITask[];
    addTask : (task : string) => void;
    
}

const SubmissionBox = (props : ISubmissionProps) => {
    const [task, setTask] = useState("");
    const onTaskChange = (e : any) : void => {
        setTask(e.target.value);
    }
    const onClick = (task : string) => {
        props.addTask(task);
        setTask("");
    } 
    return (
        <>
        <InputGroup>
            <Input placeholder="Add new task..." value={task} onChange={onTaskChange}/>
            <Button color="success" type="button" onClick={() => onClick(task)}>Submit</Button>
        </InputGroup>
        </>
    );
}

export default SubmissionBox;