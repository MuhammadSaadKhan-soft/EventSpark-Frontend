import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
const App = () => (

  <div>
    <Navbar />
    <AppRoutes />
    <Footer />
  </div>

);

export default App;