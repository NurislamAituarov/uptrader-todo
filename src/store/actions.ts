import { IItemTask } from '../types';
interface IChangeTask {
  taskId: number;
  timeWork: number;
}
interface IChangeTaskDateEnd {
  taskId: number;
  status?: string;
}

export const addNotice = (value: string) => ({ type: 'ADD_NOTICE', payload: value });
export const addTask = (task: IItemTask) => ({ type: 'ADD_TASK', payload: task });
export const removeTask = (taskId: number) => ({ type: 'REMOVE_TASK', payload: taskId });
export const newMovedTaskItems = (items: Array<IItemTask>) => ({
  type: 'MOVE_TASK',
  payload: items,
});
export const changeTaskTimeWork = ({ taskId, timeWork }: IChangeTask) => ({
  type: 'CHANGE_TASK_TIME_WORK',
  payload: { taskId, timeWork },
});

export const changeTaskDateEnd = ({ taskId, status }: IChangeTaskDateEnd) => ({
  type: 'CHANGE_TASK_DATE_END',
  payload: { taskId, status },
});
