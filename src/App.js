import Dashboard from './containers/Dashboard/Dashboard';

const HOUR = 1000 * 60 * 60;

/*
  (1) How to fetch multiple data at once with setInterval?
    - Promise.all() -> Cause too many request (http 429 error)
  (2) State Management
  (3) How to handle setInterval when initial Loading
*/

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Dashboard title="WhaTap Dashboard" />
    </div>
  );
}

export default App;
