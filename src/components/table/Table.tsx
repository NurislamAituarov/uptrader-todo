import { useEffect, useState } from 'react';
import { Column } from './column/Column';
import './Table.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNotice, addTask } from '../../store/actions';

export function Table() {
  const itemsList = useAppSelector((state) => state.state.items);
  const [items, setItems] = useState(itemsList);
  // const [notice, setNotice] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setItems(itemsList);
  }, [itemsList]);

  const groups = ['Queue', 'Development', 'Done'];

  const addTodo = (name: any) => {
    setItems([
      ...items,
      {
        number: 6,
        name,
        description: '',
        dateCreate: '',
        timeWork: '',
        dateEnd: '',
        priority: '',
        attachedFiles: '',
        group: 'Queue',
        id: 6,
        subtasks: [],
        comments: [],
      },
    ]);
    // setNotice(`${name} is added!`);
    dispatch(addNotice(`${name} is added!`));
    dispatch(
      addTask({
        number: 6,
        name,
        description: '',
        dateCreate: '',
        timeWork: '',
        dateEnd: '',
        priority: '',
        attachedFiles: '',
        group: 'Queue',
        id: 6,
        subtasks: [],
        comments: [],
      }),
    );
  };

  const moveGroup = (itemId: any, groupToMove: any) => {
    const index = items.findIndex((item) => item.id === itemId);
    const itemToMove = items[index];
    itemToMove.group = groupToMove;
    setItems([...items.slice(0, index), itemToMove, ...items.slice(index + 1)]);
    // setNotice(`${itemToMove.name} is moved to ${itemToMove.group}!`);
    dispatch(addNotice(`${itemToMove.name} is moved to ${itemToMove.group}!`));
  };

  const DeleteItem = (itemId: any) => {
    const index = items.findIndex((item) => item.id === itemId);
    const name = items[index].name;
    setItems(items.filter((item) => item.id !== itemId));
    // setNotice(`${name} is deleted!`);
    dispatch(addNotice(`${name} is deleted!`));
  };

  const mainList = groups.map((group) => {
    const groupItems = items.filter((item) => item.group === group);
    return (
      <Column
        group={group}
        groupItems={groupItems}
        moveGroup={moveGroup}
        items={items}
        key={group}
      />
    );
  });

  return <div className="table__content">{mainList}</div>;
}
