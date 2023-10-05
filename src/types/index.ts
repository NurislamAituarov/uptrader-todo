interface IFile {
  name: string;
  size: number;
  type: string;
}

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
  file?: IFile | null;
  subtasks?: Array<any>;
  comments?: '';
}
export interface ISubtask {
  title: string;
  id: string;
  completed: boolean;
}

export interface IComment {
  value: string;
  id: string;
}
export interface IFormTaskChange {
  id: number;
  title: string;
  description: string;
  priority: string;
  file?: IFile | null;
  subtasks: ISubtask[];
  comments?: '';
  base64Data?: string;
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
