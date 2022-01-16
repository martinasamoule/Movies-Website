import Register from "./Componets/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Componets/Login/Login";
import Navbar from "./Componets/navbar/navbar";
import Movies from "./Componets/Movies/Movies";
import MoviePage from "./Componets/Movies/MoviePage";
import Favorite from "./Componets/Favorite/Favorite";
import Icon from "./Componets/Movies/Icon";
import {useState} from 'react'
import { LanguageProvider } from "./contexts/languageContext";

function App() {
  const [lang, setLang] = useState("en");
  return (
    <>
      <Router>
      <LanguageProvider value={{lang,setLang}}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Movies} />
          <Route path="/Favorite" exact component={Favorite} />
          <Route path="/Icon/:id" exact component={Icon}/>
          <Route path="/Register" exact component={Register} />
          <Route path="/Login" exact component={Login} />
          <Route path="/moviePage/:id" exact component={MoviePage}/>
        </Switch>
        </LanguageProvider>
      </Router>
    </>
  );
}

export default App;
