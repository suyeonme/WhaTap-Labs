import Dashboard from 'src/components/Dashboard/Dashboard';

const HOUR: number = 1000 * 60 * 60;

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Dashboard title="WhaTap Dashboard" />
    </div>
  );
}

export default App;
