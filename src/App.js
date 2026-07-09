import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AIMatchmaker from './components/AIMatchmaker/AIMatchmaker';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <AppRoutes />
      <AIMatchmaker />
    </div>
  );
}

export default App;