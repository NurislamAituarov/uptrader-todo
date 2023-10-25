import { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IItemTask } from '@/types';
import { Item } from './item/Item';
import './Table.scss';
import { useAppDispatch } from '../../hooks/redux';
import { newMovedTaskItems } from '../../store/actions';

interface IProps {
  tasks: IItemTask[];
}

interface IColumn {
  id: number;
  title: string;
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
      console.log(col.title, columns.filter((el) => el.title === source.droppableId)[0].title);

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

      destinationColumn &&
        taskToMove &&
        destinationColumn.tasks.splice(destination.index, 0, {
          ...taskToMove,
          group: destinationColumn?.title,
        });

      let newUpdateTasks: any = [];
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
    // name && dispatch(addNotice(`${name} удален!`));
    // dispatch(removeTask(itemId));

    // context?.closePopup();
  };

  return (
    <div className="table">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, columnIndex) => (
          <div key={column.id} className="kanban-column">
            <h2>{column.title}</h2>
            <Droppable droppableId={column.title}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {!!column.tasks.length &&
                    column.tasks.map((task, taskIndex) => {
                      return (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={taskIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="kanban-task">
                              <Item item={task} deleteItem={deleteItem} key={task.id} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};
