import { Create } from './components/create';
import { Edit } from './components/Edit';
import './App.css';

function App() {
  return (
    <>
      <h1>Driver registry</h1>
      <div>
        <Create />
        <Edit />
      </div>
    </>
  );
}

export default App;
