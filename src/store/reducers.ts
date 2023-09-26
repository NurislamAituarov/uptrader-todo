const initial = {
  items: [
    {
      number: 1,
      name: 'item1',
      description:
        'assanis — «осень», готск. 𐌰𐍃𐌰𐌽𐍃 — «жатва», этимологически — «время жатвы»; по толкованию Даля — от «осенять» — затенять: наступление сумрака) — одно из четырёх времён года, между летом и зимой. Осень — переходный сезон, когда заметно уменьшение светового дня, и постепенно понижается температура окружающей среды.',
      dateCreate: '2023-10-10T14:48:00',
      timeWork: '',
      dateEnd: '',
      priority: 'high',
      attachedFiles: '',
      group: 'Queue',
      id: 1,
      subtasks: [],
      comments: [],
    },
    {
      number: 2,
      name: 'item2',
      description: '',
      dateCreate: '',
      timeWork: '',
      dateEnd: '',
      priority: 'high',
      attachedFiles: '',
      group: 'Queue',
      id: 2,
      subtasks: [],
      comments: [],
    },
    {
      number: 3,
      name: 'item3',
      description: '',
      dateCreate: '',
      timeWork: '',
      dateEnd: '',
      priority: 'medium',
      attachedFiles: '',
      group: 'Queue',
      id: 3,
      subtasks: [],
      comments: [],
    },
    {
      number: 4,
      name: 'item4',
      description: '',
      dateCreate: '',
      timeWork: '',
      dateEnd: '',
      priority: 'low',
      attachedFiles: '',
      group: 'Development',
      id: 4,
      subtasks: [],
      comments: [],
    },
    {
      number: 5,
      name: 'item5',
      description: '',
      dateCreate: '',
      timeWork: '',
      dateEnd: '',
      priority: 'low',
      attachedFiles: '',
      group: 'Done',
      id: 5,
      subtasks: [],
      comments: [],
    },
  ],
  notice: '',
};

export default function Reducer(state = initial, action: any) {
  switch (action.type) {
    case 'ADD_NOTICE':
      return { ...state, notice: action.payload };

    case 'ADD_TASK':
      return { ...state, items: [...state.items, action.payload] };

    default:
      return state;
  }
}
