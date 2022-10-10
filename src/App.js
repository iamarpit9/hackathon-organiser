import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Hackathon from "./pages/Hackathon";
import EditForm from "./pages/EditForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="form" element={<Form />} />
          <Route exact path="/editform/:id" element={<EditForm />} />
          <Route exact path="/hackathon/:id" element={<Hackathon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
