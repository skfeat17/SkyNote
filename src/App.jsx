import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Home from './routes/Home';
import Notes from './routes/Notes';
import View from './routes/View';
import Edit from './routes/Edit';
import CreateNote from './routes/CreateNote';
import SignUp from './routes/SignUp';
import LogIn from './routes/LogIn';
import { Profile } from './routes/Profile';
import Layout from './components/Layout'; // ✅ AppBar + BottomTab wrapper

// ✅ App now receives location AFTER being wrapped in BrowserRouter
function AppRoutes() {
  const location = useLocation();

  const hideLayoutRoutes = ['/', '/login', '/signup'];
  const isLayoutHidden = hideLayoutRoutes.includes(location.pathname);

  return (
    <Routes>
      {/* Routes WITHOUT Layout */}
      {isLayoutHidden && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}

      {/* Routes WITH Layout */}
      {!isLayoutHidden && (
        <Route element={<Layout />}>
          <Route path="/home" element={<Notes />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/view" element={<View />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      )}
    </Routes>
  );
}

// ✅ BrowserRouter wraps AppRoutes, NOT App directly using useLocation
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
