export const Item = ({ item }: any) => {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('id', e.target.id);
  };

  return (
    <li key={item.id} id={item.id} draggable onDragStart={handleDragStart}>
      {item.name}
    </li>
  );
};
