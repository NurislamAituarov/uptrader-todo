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

export function downloadFile(files: any, setForm: any) {
  const reader = new FileReader();

  reader.onload = (event: any) => {
    const file = {
      base64Data: event.target.result,
      name: files?.name || '',
      type: files?.type || '',
      size: files?.size || 0,
      id: new Date().getTime(),
    };
    setForm((data: any) => {
      return { ...data, files: [...data.files, file] };
    });
  };
  reader.readAsDataURL(files);
}

export function getDateEndTask(status: string) {
  const now = new Date();
  const UKDate = new Intl.DateTimeFormat('en-UK');
  const formattedTime = now.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });

  const dateEnd = status === 'Done' ? `${UKDate.format(now)} ${formattedTime}` : '';

  return dateEnd;
}

export function getTimeWorkDate(timeWorkItem: number, timeWork: number) {
  const hours = new String(Math.floor((timeWork + timeWorkItem) / 60 / 60));
  const minutes = new String(Math.floor((timeWork + timeWorkItem) / 60) - +hours * 60);
  const seconds = new String((timeWork + timeWorkItem) % 60);

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}
