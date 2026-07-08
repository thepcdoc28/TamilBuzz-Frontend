import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AIMatchmaker from './components/AIMatchmaker/AIMatchmaker';

function App() {
  return (
    <div className="app">
      <AppRoutes />
      <AIMatchmaker />
    </div>
  );
}

export default App;