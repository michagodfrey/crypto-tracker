import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";

function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/coins/:id" element={<CoinPage />} />
     </Routes>
   </BrowserRouter>
 );
}

export default App;
