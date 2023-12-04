import { Create } from './components/Create';
import { DisplayAndEdit } from './components/DisplayAndEdit';
import { Header } from './components/Header'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <DisplayAndEdit />
      <Create />
    </>
  );
}

export default App;
