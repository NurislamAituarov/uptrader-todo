import { MouseEvent, useEffect, useState } from 'react';
import style from './Select.module.scss';

interface IProps {
  priority: string;
  setForm: any;
  container: HTMLDivElement | null;
  priorityListItems: string[];
}

export function SelectCustom({ priority, setForm, container, priorityListItems }: IProps) {
  const [dropdownLists, setDropdownLists] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [container]);

  function handleClick(e: any) {
    const target = e.target as HTMLElement;
    if (container && container.contains(target)) {
      setDropdownLists(false);
    }
  }

  function selectPriorityListItem(value: string) {
    setForm((state: any) => {
      return {
        ...state,
        priority: value,
      };
    });

    setDropdownLists(false);
  }

  function onActivatePriority(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    setDropdownLists((value) => !value);
  }

  return (
    <>
      <label className={style.label}>
        <p>Приоритет задачи:</p>
        <span onClick={(e) => onActivatePriority(e)} className={style['priority-active']}>
          {priority ? priority : '-'}
        </span>
      </label>
      {dropdownLists && (
        <div className={style['dropdown-priority']}>
          {priorityListItems.map((value, i) => {
            return (
              <div
                key={i}
                onClick={() => selectPriorityListItem(value)}
                className={style['priority-list']}>
                {value}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
