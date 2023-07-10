import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Header from './Component/Header';
import CreatePost from './Component/CreatePost';
import ReadPost from './Component/ReadPost';
import Edit from './Component/Edit';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/all" element={<ReadPost />} />
        <Route path="/:id" element={<Edit />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
