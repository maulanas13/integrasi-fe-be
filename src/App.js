import "./App.css"
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verified from "./pages/Verified";
import NotFound from "./pages/NotFound";

function App() {
  

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/verified" exact component={Verified} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  )
};

export default App;