import { Faction } from './Faction';
import { Trading } from './Trading';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/imora20" element={ <Faction name="Imora" id="1"/>}/>
        <Route path="/darien9" element={ <Faction name="Darien" id="2"/>}/>
        <Route path="/shangra24" element={ <Faction name="Shangra" id="3"/>}/>
        <Route path="/delos2" element={ <Faction name="Delos" id="4"/>}/>
        <Route path="/elysia14" element={ <Faction name="Elysia" id="5"/>}/>
        <Route path="/factious0" element={ <Faction name="The Factious" id="6"/>}/>
        <Route path="/trade" element={ <Trading/>}/>
      </Routes>
  </Router>
  );
}
export default App;




