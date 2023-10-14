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
