const initial = {
  items: [
    { name: 'item1', group: 'Queue', id: 1 },
    { name: 'item2', group: 'Queue', id: 2 },
    { name: 'item3', group: 'Queue', id: 3 },
    { name: 'item4', group: 'Development', id: 4 },
    { name: 'item5', group: 'Done', id: 5 },
  ],
  notice: '',
};

export default function Reducer(state = initial, action: any) {
  switch (action.type) {
    case 'ADD_NOTICE':
      return { ...state, notice: action.payload };

    default:
      return state;
  }
}
