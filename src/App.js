
import Header from './Components/Header';
import './style.scss'
import Body from './Components/Body';
import Footer from './Components/Footer';
import { ContextProvider } from './context';

function App() {
  return (
    <div className="App">
      <ContextProvider >
        <Header />
        <Body />
      </ContextProvider>
      <Footer />
    </div>
  );
}
export default App;
