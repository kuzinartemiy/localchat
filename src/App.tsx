import { useEffect } from 'react';
import './App.css';
import { Auth } from './components/auth/auth';
import { Chat } from './components/chat/chat';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLoggedIn } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sessionLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn') as string);
    dispatch(setLoggedIn(Boolean(sessionLoggedIn)));
  }, []);

  const loggedIn = useAppSelector((store) => store.auth.loggedIn);

  return (
    <div className="App">
      {loggedIn ? <Chat /> : <Auth />}
    </div>
  );
}

export default App;
