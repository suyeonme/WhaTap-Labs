import DataProvider from 'reducer/context';
import Dashboard from 'components/Dashboard/Dashboard';

function App() {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
}

export default App;
