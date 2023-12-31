import { setDataLocalStorage } from '../lib/localStorage';
import { IReducerState } from '../types';

const initial: IReducerState = {
  items: [],
  taskItem: null,
  notice: '',
  draggedItemId: '',
};

export default function Reducer(state = initial, action: any): IReducerState {
  switch (action.type) {
    case 'ADD_NOTICE':
      return { ...state, notice: action.payload };

    case 'ADD_TASK':
      return { ...state, items: [...state.items, action.payload] };

    case 'ADD_TASK_CHANGE':
      return {
        ...state,
        taskItem: state.items.filter((item) => item.id === action.payload)[0],
      };

    case 'ADD_SUBTASK':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.idTask) {
            return { ...item, subtasks: action.payload.subtasks };
          }

          return item;
        }),
      };

    case 'REMOVE_TASK':
      const filteredItems = state.items
        .filter((item) => item.id !== action.payload)
        .map((item, ind) => {
          return { ...item, number: ind + 1 };
        });
      setDataLocalStorage('tasks', filteredItems);

      return {
        ...state,
        items: filteredItems,
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.idTask) {
            return { ...item, ...action.payload.task };
          }

          return item;
        }),
      };

    case 'MOVE_TASK':
      setDataLocalStorage('tasks', action.payload);

      return { ...state, items: action.payload };

    case 'CHANGE_TASK_TIME_WORK':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.taskId) {
            return { ...item, timeWork: action.payload.timeWork };
          }
          return item;
        }),
      };

    case 'DRAG_ITEM_ID':
      return { ...state, draggedItemId: action.payload };
    default:
      return state;
  }
}
