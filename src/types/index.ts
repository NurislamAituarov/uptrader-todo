export interface IFile {
  name: string;
  size: number;
  type: string;
  base64Data?: string;
  id: number;
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
  files?: IFile[];
  subtasks?: ISubtask[];
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
  files?: IFile[];
  subtasks: ISubtask[];
  comments?: '';
}

export interface IReducerState {
  items: Array<IItemTask>;
  taskItem: IItemTask | null;
  notice: string;
  draggedItemId: string | null;
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

export interface IColumn {
  id: number;
  title: string;
  tasks: IItemTask[];
}
