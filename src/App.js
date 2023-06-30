import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import MainUI from "./pages/MainUI";
import Chatbot from "./Chatbot";

  
  
  export const App = () => {
  
  
  
    return (
      <>
      <Router>
        <Routes>
            <Route path='/' element={<Chatbot/>} />
            <Route path='/mainui' element={<MainUI/>} />
        </Routes>
      </Router>
      </>
    )
  }
  
  export default App;
  