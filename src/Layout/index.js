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
import Deck from "../Deck/Deck";

//style everything

function Layout() {
  const [currentDeck, setCurrentDeck] = useState([]);
  const [cards, setCards] = useState([]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home cards={cards} setCards={setCards} />
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
            <Study
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
              cards={cards}
              setCards={setCards}
            />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
