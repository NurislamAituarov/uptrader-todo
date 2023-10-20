import React, { useEffect, useRef, useState } from 'react';
import './Board.scss';

import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import { IItemTask } from '@/types';
import Item from './item/Item';
import { getNameGroup } from '../../lib/helpers';
import { useAppDispatch } from '../../hooks/redux';
import { setDataLocalStorage } from '../../lib/localStorage';

interface IProps {
  tasks: IItemTask[];
}
const statuses = ['Queue', 'Development', 'Done'];

const KanbanBoard: React.FC<IProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [tasks]);

  function renderListTitle(status: string) {
    return (
      <h3 className="list-title" key={status}>
        {getNameGroup(status)}
      </h3>
    );
  }

  function handleTouchEnd(e: any) {
    console.log(e);
    const groupLists = document.querySelectorAll('.list');

    setTimeout(() => {
      let groupList = '';

      groupLists.forEach((group) => {
        if (group.contains(e.itemElement)) {
          groupList = group.id;
        }
      });

      const newItemsMoved = tasks.map((task) => {
        if (task.id === +e.itemElement.id) {
          return { ...task, group: groupList };
        }
        return task;
      });
      setDataLocalStorage('tasks', newItemsMoved);
    }, 0);
  }

  // Move task

  return (
    <ScrollView
      direction="horizontal"
      showScrollbar="always"
      className="scrollable-board table__content">
      {statuses.map((status) => (
        <div key={status} className="list" id={status}>
          {renderListTitle(status)}
          <ScrollView direction="vertical" showScrollbar="always" className="scrollable-list">
            <Sortable group="tasksGroup" moveItemOnDrop={true} onDragEnd={handleTouchEnd}>
              {tasks
                .filter((task) => task.group === status)
                .map((task) => (
                  <Item item={task} key={task.id} />
                ))}
            </Sortable>
          </ScrollView>
        </div>
      ))}
    </ScrollView>
  );
};

export default KanbanBoard;
