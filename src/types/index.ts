export interface IItemTask {
  number: number;
  title: string;
  description: string;
  dateCreate: string;
  timeWork?: number;
  dateEnd?: string;
  priority?: string;
  attachedFiles?: any;
  group: string;
  id: number;
  subtasks?: Array<any>;
  comments?: Array<any>;
}

export interface IFormTaskChange {
  id: number;
  title: string;
  description: string;
  priority: string;
  file: null;
  subtasks: ISubtask[];
}

export interface IReducerState {
  items: Array<IItemTask>;
  taskItem: IItemTask;
  notice: string;
}

interface IActionNotice {
  type: string;
  payload: string;
}

interface IActionTask {
  type: string;
  payload: IItemTask;
}
interface IActionRemove {
  type: string;
  payload: number;
}

interface IActionMoveTask {
  type: string;
  payload: Array<IItemTask>;
}

export type TActions = IActionNotice | IActionTask | IActionRemove | IActionMoveTask;

export interface ISubtask {
  title: string;
  id: string;
  completed: boolean;
}
