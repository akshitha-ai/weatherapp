import './App.css';
import Currentweather from './components/currentweather/curweather.js';
import Search from './components/search/Search'
function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
  }
  return (
    <div className='app'>
      <Search onSearchChange={handleOnSearchChange} />
      <Currentweather/>
    </div>
  );
}

export default App;
