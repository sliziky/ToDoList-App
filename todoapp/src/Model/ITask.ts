export default interface ITask {
    
    // id of Task - given automatically 
    id : number;

    // Given task
    task : string;
    
    // Is task done
    done : boolean;
    
    // When was Task created
    timeStamp : Date;
  }