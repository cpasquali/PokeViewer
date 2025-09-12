import "./App.css";
import { Switch, Route } from "wouter";
import { Navbar } from "./components/Navbar/Navbar";
import { MainContent } from "./pages/MainContent/MainContent";
import { PokemonDetails } from "./pages/PokemonDetails/PokemonDetails";
import { AppProviders } from "./components/AppProviders";

function App() {
  return (
    <AppProviders>
      <Navbar />
      <Switch>
        <Route path="/" component={() => <MainContent />} />
        <Route path="/pokemon/:name" component={PokemonDetails} /> *
      </Switch>
    </AppProviders>
  );
}

export default App;
