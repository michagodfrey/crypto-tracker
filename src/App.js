import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import NotFound from "./pages/NotFound";

function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/coins">
         <Route path=":id" element={<CoinPage />} />
       </Route>
       <Route path="/signup" element={<SignUp />} />
       <Route path="/reset" element={<PasswordReset />} />
       <Route path="*" element={<NotFound />} />
     </Routes>
   </BrowserRouter>
 );
}

export default App;
