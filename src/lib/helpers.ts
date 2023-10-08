export function getNameGroup(group: string) {
  switch (group) {
    case 'Development':
      return 'Разработка';
    case 'Done':
      return 'Выполнен';
    default:
      return 'Очередь';
  }
}
