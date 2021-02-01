import Dashboard from './containers/Dashboard/Dashboard';

const HOUR = 1000 * 60 * 60;

/*
  (1) How to fetch multiple data at once with setInterval(setTimeout)?
  - Promise.all
  - Custom Hooks (useFetch / useMultipleFetch)
  - Axios / create

  (2) State Management

  (3) How to avoid too many request 
*/

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Dashboard title="WhaTap Dashboard" />
    </div>
  );
}

export default App;
