import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home"
import Landing from "./components/Landing/Landing"
import MintNft from "./components/MintNft/MintNft"
import Tables from "./components/Tables/Tables";
function App() {
 return(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Landing" element={<Landing />} />
      <Route path="/MintNft" element={<MintNft />} />
      <Route path="/Tables" element={<Tables />} />
  </Routes>
</BrowserRouter>
 )
}

export default App;
