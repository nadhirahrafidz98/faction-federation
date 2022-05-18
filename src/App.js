import { Faction } from './Faction';
import { Trading } from './Trading';
// import { Backend } from './Backend';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/rivia20" element={ <Faction name="Rivia" id="1"/>}/>
        <Route path="/althea9" element={ <Faction name="Althea" id="2"/>}/>
        <Route path="/sudaria24" element={ <Faction name="Sudaria" id="3"/>}/>
        <Route path="/redania2" element={ <Faction name="Redania" id="4"/>}/>
        <Route path="/aeri14" element={ <Faction name="Aeri" id="5"/>}/>
        <Route path="/trade" element={ <Trading/>}/>
        {/* <Route path="/backend" element={ <Backend/>}/> */}
      </Routes>
  </Router>
  );
}
export default App;




