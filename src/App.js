import './App.scss';
import './max600.scss';
import Search from './Components/Search';
import ServerFiles from './Components/ServerFiles';
import { SocketProvider } from './Components/SocketContext';

function App() {
  return (
    <>
      <SocketProvider>
        <Search />
        <ServerFiles />
      </SocketProvider>
    </>
  );
}

export default App;
