import { useAppSelector } from '../hooks/redux';
import './App.css';
import { Table } from './table/Table';

function App() {
  const notice = useAppSelector((state) => state.state.notice);

  return (
    <div className="wrapper">
      <header className="header">Todo</header>
      {notice && <p id="notice">{notice}</p>}
      <main className="main">
        <Table />
      </main>
    </div>
  );
}

export default App;
