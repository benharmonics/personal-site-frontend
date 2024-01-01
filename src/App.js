import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Blogs from './components/blog/Blogs';
import Admin from './components/Admin';
import Chat from './components/Chat';
import Activities from './components/activities/ActivitiesPage';
import GameOfLifePage from './components/activities/GameOfLife';
import SnakePage from './components/activities/Snake';

export default function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="admin" element={<Admin />} />
            <Route path="chat" element={<Chat />} />
            <Route path="activities" >
              <Route index={true} element={<Activities />} />
              <Route path="game-of-life" element={<GameOfLifePage />} />
              <Route path="snake" element={<SnakePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
