import { useContext, useEffect, useRef } from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';

import { Item } from './item/Item';
import { IItemTask } from '@/types';
import { getDateEndTask, getNameGroup } from '../../lib/helpers';
import { useAppDispatch } from '../../hooks/redux';
import { setDataLocalStorage } from '../../lib/localStorage';
import { addNotice, changeTaskDateEnd, newMovedTaskItems, removeTask } from '../../store/actions';
import { Context } from '../../lib/context';
import './Board.scss';

interface IProps {
  tasks: IItemTask[];
}
const statuses = ['Queue', 'Development', 'Done'];

const KanbanBoard = ({ tasks }: IProps) => {
  const refLists = useRef<Record<string, HTMLDivElement>>({});
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const items = useRef<IItemTask[]>([]);

  useEffect(() => {
    if (!items.current.length || items.current.length !== tasks.length) {
      items.current = tasks;
    }
  }, [tasks]);

  useEffect(() => {
    if (items.current.length) {
      setDataLocalStorage('tasks', items.current);
    }
  }, [items.current]);

  function renderListTitle(status: string) {
    return (
      <h3 className="list-title" key={status}>
        {getNameGroup(status)}
      </h3>
    );
  }

  const deleteItem = (itemId: number) => {
    const index = items.current.findIndex((item) => item.id === itemId);
    const name = items.current[index].title;
    name && dispatch(addNotice(`${name} удален!`));
    dispatch(removeTask(itemId));

    context?.closePopup();
  };

  // Move task
  function handleTouchEnd(e: any) {
    const taskElement = e.itemElement;
    const groupLists = refLists.current;

    setTimeout(() => {
      let groupStatus = '';

      for (let key in groupLists) {
        if (groupLists[key].contains(taskElement)) {
          groupStatus = groupLists[key].id;
        }
      }

      let newItemMoved: IItemTask | any = {};
      tasks.forEach((task) => {
        if (task.id === +taskElement.id) {
          dispatch(addNotice(`${task.title} перенесен в столбец ${getNameGroup(groupStatus)}!`));

          if (groupStatus === 'Done') {
            dispatch(changeTaskDateEnd({ taskId: task.id, status: 'Done' }));
          } else {
            dispatch(changeTaskDateEnd({ taskId: task.id }));
          }
          newItemMoved = { ...task, group: groupStatus, dateEnd: getDateEndTask(groupStatus) };
        }
      });

      items.current = items.current.map((task) => {
        if (task.id === +taskElement.id) {
          return newItemMoved;
        }
        return task;
      });

      // dispatch(newMovedTaskItems(items.current));
    }, 0);
  }

  return (
    <ScrollView
      direction="horizontal"
      showScrollbar="always"
      className="scrollable-board table__content">
      {statuses.map((status) => (
        <div
          key={status}
          className="list"
          id={status}
          ref={(el) => el && (refLists.current[status] = el)}>
          {renderListTitle(status)}
          <ScrollView direction="vertical" showScrollbar="always" className="scrollable-list">
            <Sortable
              group="tasksGroup"
              moveItemOnDrop={true}
              onDragEnd={(dragResult) => handleTouchEnd(dragResult)}>
              {tasks
                .filter((task) => task.group === status)
                .map((task) => (
                  <Item item={task} deleteItem={deleteItem} key={task.id} />
                ))}
            </Sortable>
          </ScrollView>
        </div>
      ))}
    </ScrollView>
  );
};

export default KanbanBoard;
