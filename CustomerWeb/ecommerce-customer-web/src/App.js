import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <BrowserRouter>
     <AuthProvider> 
      <AppContent />
       </AuthProvider> 
    </BrowserRouter>
  );
}

export default App;
