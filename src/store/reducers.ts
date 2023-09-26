const initial = {
  items: [
    {
      number: 1,
      title: 'item1',
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
      title: 'item2',
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
