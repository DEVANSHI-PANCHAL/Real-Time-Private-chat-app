
import './App.css';
import   AuthScreen  from './pages/AuthScreen'
import   HomeScreen  from './pages/HomeScreen'
function App() {
  const [loggedin,setloggedIn] = useState(localstorage.getItem('jwt')?true:false)
  return (
    <>
    {loggedin? <HomeScreen setloggedIn={setloggedIn}/> :<AuthScreen setloggedIn={setloggedIn}/>}

    </>
  );
}

export default App;
