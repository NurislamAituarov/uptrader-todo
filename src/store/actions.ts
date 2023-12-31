import { IFormTaskChange, IItemTask, ISubtask } from '../types';
interface IChangeTask {
  taskId: number;
  timeWork: number;
}

interface IAddSubtask {
  idTask: number;
  subtasks: ISubtask[];
}

interface IUpdateTask {
  idTask: number;
  task: IFormTaskChange;
}

export const addNotice = (value: string) => ({ type: 'ADD_NOTICE', payload: value });
export const addTask = (task: IItemTask) => ({ type: 'ADD_TASK', payload: task });
export const setDraggedItemId = (value: string) => ({ type: 'DRAG_ITEM_ID', payload: value });

export const addTaskChange = (taskId: number) => ({ type: 'ADD_TASK_CHANGE', payload: taskId });

export const updateTaskChange = ({ idTask, task }: IUpdateTask) => ({
  type: 'UPDATE_TASK',
  payload: { idTask, task },
});

export const removeTask = (taskId: number) => ({ type: 'REMOVE_TASK', payload: taskId });

export const newMovedTaskItems = (items: Array<IItemTask>) => ({
  type: 'MOVE_TASK',
  payload: items,
});

export const changeTaskTimeWork = ({ taskId, timeWork }: IChangeTask) => ({
  type: 'CHANGE_TASK_TIME_WORK',
  payload: { taskId, timeWork },
});

export const addSubtask = ({ idTask, subtasks }: IAddSubtask) => ({
  type: 'ADD_SUBTASK',
  payload: { idTask, subtasks },
});
