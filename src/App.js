import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
// import Home from "./Home";
import Chatbot from "./Chatbot";

  
  
  export const App = () => {
  
  
  
    return (
      <>
      <Router>
        <Routes>
            <Route path='/' element={<Chatbot/>} />
            {/* <Route path='/testing' element={<Home/>} /> */}
        </Routes>
      </Router>
      </>
    )
  }
  
  export default App;
  