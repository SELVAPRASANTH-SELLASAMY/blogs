import './App.css';
import { Editor, Header, Footer } from './components';
function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Editor/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
