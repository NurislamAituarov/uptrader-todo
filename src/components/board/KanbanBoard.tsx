import { FC, useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { IColumn, IItemTask } from '@/types';
import { useAppDispatch } from '../../hooks/redux';
import { addNotice, newMovedTaskItems, removeTask } from '../../store/actions';
import { Context } from '../../lib/context';
import { getDateEndTask, getNameGroup } from '../../lib/helpers';
import './KanbanBoard.scss';
import { Column } from './column/Column';

interface IProps {
  tasks: IItemTask[];
}

export const KanbanBoard: FC<IProps> = ({ tasks }) => {
  const [columns, setColumns] = useState<IColumn[]>([
    {
      id: 1,
      title: 'Queue',
      tasks: tasks,
    },
    {
      id: 2,
      title: 'Development',
      tasks: tasks,
    },
    {
      id: 3,
      title: 'Done',
      tasks: tasks,
    },
  ]);
  const dispatch = useAppDispatch();
  const context = useContext(Context);

  useEffect(() => {
    setColumns((columns) => {
      return columns.map((column) => {
        return { ...column, tasks: tasks.filter((task) => task.group === column.title) };
      });
    });
  }, [tasks]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Не было перемещения
    const { source, destination, draggableId } = result;
    const updatedColumns = [...columns];
    // Удаление задачи из начальной колонки
    const sourceColumn = updatedColumns.find((col) => {
      return col.title === columns.filter((el) => el.title === source.droppableId)[0].title;
    });

    if (sourceColumn) {
      const taskToMove = sourceColumn.tasks.find((task) => task.id === parseInt(draggableId));
      sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== parseInt(draggableId));
      // Добавление задачи в конечную колонку

      const destinationColumn = updatedColumns.find(
        (col) =>
          col.title === columns.filter((el) => el.title === destination.droppableId)[0].title,
      );

      //устанавливаю статус задачи куда перетащили и устанавливаю дату окончания для каждой задачи.

      if (destinationColumn && taskToMove) {
        dispatch(
          addNotice(
            `${taskToMove.title} перенесен в столбец ${getNameGroup(destinationColumn.title)}!`,
          ),
        );

        destinationColumn.tasks.splice(destination.index, 0, {
          ...taskToMove,
          group: destinationColumn?.title,
          dateEnd: getDateEndTask(destinationColumn?.title || ''),
        });
      }
      console.log();

      //Объединяю все задачи в один массив
      let newUpdateTasks: IItemTask[] = [];
      columns.forEach((column) => {
        newUpdateTasks = [...newUpdateTasks, ...column.tasks];
      });

      dispatch(newMovedTaskItems(newUpdateTasks));
      setColumns(updatedColumns);
    }
  };

  const deleteItem = (itemId: number) => {
    const index = tasks.findIndex((item) => item.id === itemId);
    const name = tasks[index].title;
    name && dispatch(addNotice(`${name} удален!`));
    dispatch(removeTask(itemId));

    context?.closePopup();
  };

  return (
    <div className="kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, columnIndex) => (
          <Column column={column} key={column.id} deleteItem={deleteItem} />
        ))}
      </DragDropContext>
    </div>
  );
};
