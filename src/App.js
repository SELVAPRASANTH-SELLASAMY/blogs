import { useRef } from 'react';
import './App.css';
import { Editor, Header, Footer, Popup } from './components';
function App() {
  const popup = useRef();
  return (
    <>
      <Header/>
      <main>
        <Editor popup={popup}/>
      </main>
      <Footer/>
      <Popup ref={popup}/>
    </>
  );
}
export default App;