import "./App.css"
import { Switch, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verified from "./pages/Verified";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import axios from "axios";
import {API_URL} from "./Helpers/ApiUrl";
import { useDispatch } from "react-redux";
import Upload from "./pages/Upload";

function App() {
  const dispatch = useDispatch();

  const keepLogin = async () => {
    let token = localStorage.getItem("token-access");
    const res = await axios.get(`${API_URL}/auth/keep/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({type: "LOGIN", payload: res.data});
  };

  useEffect(() => {
    keepLogin();
  }, []);
  

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home2} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/verified" exact component={Verified} />
        <Route path="/upload" exact component={Upload} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  )
};

export default App;