import ITask from "./Model/ITask";

class Helper{
    public static getMaxId = (tasks: ITask[]): number => {
        if (tasks.length === 0) return -1; // first index will be 0
        return Math.max.apply(
          Math,
          tasks.map((x) => x.id)
        );
      };
};


export default Helper;