import { IReducerState } from '../types';

const initial: IReducerState = {
  items: [],
  taskItem: null,
  notice: '',
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
      const filteredItems = state.items.filter((item) => item.id !== action.payload);

      return {
        ...state,
        items: filteredItems.map((item, ind) => {
          return { ...item, number: ind + 1 };
        }),
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

    case 'CHANGE_TASK_DATE_END':
      const now = new Date();
      const UKDate = new Intl.DateTimeFormat('en-UK');
      const formattedTime = now.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });

      const newItems = state.items.map((el) => {
        if (el.id === action.payload.taskId) {
          return {
            ...el,
            dateEnd:
              action.payload.status === 'Done' ? `${UKDate.format(now)} ${formattedTime}` : '',
          };
        }
        return el;
      });
      return { ...state, items: newItems };

    default:
      return state;
  }
}
