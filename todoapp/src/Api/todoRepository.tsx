import axios from "axios";
import ITask from "../Model/ITask";

class TodoRepository {
    getAll = async () : Promise<ITask[]> => {
        const { data } = await axios.get<ITask[]>('https://localhost:44310/api/todolist');
        console.log("[TodoRepo GetAll:]" , data);
        return data;
    }
}

export default TodoRepository;