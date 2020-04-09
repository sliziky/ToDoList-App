
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import ITask from "../Model/ITask";
import { API_URL } from "../Api/constants";

class ApiHandler {

  public postTaskAPI = (task : ITask) : void => {
    let data = JSON.stringify({
      id : task.id,
      task : task.task,
      done : task.done,
      timeStamp : task.timeStamp
    });
    this.postDataToApi(data);
  }

  public deleteTaskAPI = (task: ITask) : void => {
    axios.delete(API_URL + "/" + task.id, {
      data: { id: task.id },
    });
  };

  public postDataToApi = (data : string) : void => {
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
};

export default ApiHandler;