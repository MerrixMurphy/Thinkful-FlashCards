import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "../Deck/CreateDeck";
import EditDeck from "../Deck/EditDeck";
import Study from "./Study";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";

function Layout() {
  const [currentDeck, setCurrentDeck] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
