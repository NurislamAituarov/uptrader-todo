import { IReducerState } from '../types';

const initial: IReducerState = {
  items: [
    {
      number: 1,
      title: 'item1',
      description:
        'assanis — «осень», готск. 𐌰𐍃𐌰𐌽𐍃 — «жатва», этимологически — «время жатвы»; по толкованию Даля — от «осенять» — затенять: наступление сумрака) — одно из четырёх времён года, между летом и зимой. Осень — переходный сезон, когда заметно уменьшение светового дня, и постепенно понижается температура окружающей среды.',
      dateCreate: '2023-10-10T14:48:00',
      timeWork: 0,
      dateEnd: '',
      priority: 'high',
      attachedFiles: null,
      group: 'Queue',
      id: 1,
      subtasks: [],
      comments: [],
    },
    {
      number: 2,
      title: 'item2',
      description: '',
      dateCreate: '',
      timeWork: 0,
      dateEnd: '',
      priority: 'high',
      attachedFiles: null,
      group: 'Queue',
      id: 2,
      subtasks: [],
      comments: [],
    },
  ],
  notice: '',
};

export default function Reducer(state = initial, action: any): IReducerState {
  switch (action.type) {
    case 'ADD_NOTICE':
      return { ...state, notice: action.payload };

    case 'ADD_TASK':
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_TASK':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

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
