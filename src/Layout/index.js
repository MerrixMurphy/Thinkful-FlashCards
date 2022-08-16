import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "../Deck/CreateDeck";
import EditDeck from "../Deck/EditDeck";
import Study from "./Study";
import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";
import Deck from "../Deck/Deck";

function Layout() {
  // states to track current card and deck.
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);
  // states to track card and deck lists
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home decks={decks} setDecks={setDecks} />}
      />
      <Route exact path="/decks/new" element={<CreateDeck />} />
      <Route
        exact
        path="/decks/:deckId/edit"
        element={
          <EditDeck currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
        }
      />
      <Route
        exact
        path="/decks/:deckId/study"
        element={
          <Study
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            cards={cards}
            setCards={setCards}
          />
        }
      />
      <Route
        exact
        path="/decks/:deckId"
        element={
          <Deck
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            cards={cards}
            setCards={setCards}
            setDecks={setDecks}
          />
        }
      />
      <Route
        exact
        path="/decks/:deckId/cards/new"
        element={
          <AddCard currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
        }
      />
      <Route
        exact
        path="/decks/:deckId/cards/:cardId/edit"
        element={
          <EditCard
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        }
      />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default Layout;
