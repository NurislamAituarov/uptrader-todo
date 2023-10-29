import { MouseEvent, useEffect, useState } from 'react';
import style from './Select.module.scss';

interface IProps {
  priority: string;
  setForm: any;
  container: HTMLDivElement | null;
}

export function SelectCustom({ priority, setForm, container }: IProps) {
  const [dropdownPriority, setDropdownPriority] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [container]);

  function handleClick(e: any) {
    const target = e.target as HTMLElement;
    if (container && container.contains(target)) {
      setDropdownPriority(false);
    }
  }

  function selectPriorityListItem(value: string) {
    setForm((state: any) => {
      return {
        ...state,
        priority: value,
      };
    });

    setDropdownPriority(false);
  }

  function onActivatePriority(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    setDropdownPriority((value) => !value);
  }
  return (
    <>
      <label>
        Приоритет задачи:
        <span onClick={(e) => onActivatePriority(e)} className={style['priority-active']}>
          {priority ? priority : '-'}
        </span>
      </label>
      {dropdownPriority && (
        <div className={style['dropdown-priority']}>
          {['high', 'medium', 'low'].map((value, i) => {
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
