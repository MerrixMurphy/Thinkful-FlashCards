import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listDecks } from "../utils/api";
import { listCards } from "../utils/api";
import { deleteDeck } from "../utils/api";

// Existing decks are each shown with the number of cards

// If the user clicks "OK", the deck is deleted and the deleted deck is no longer visible on the Home screen.

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  useEffect(() => {
    listCards(1).then(setCards);
  }, []);

  const navigation = (event) => {
    const butVal = event.target.id;
    switch (butVal) {
      case `createDeck`:
        history.push("/decks/new");
        break;
      case `edit`:
        history.push("/decks/:deckId/edit");
        break;
      case `study`:
      default:
        history.push("/decks/:deckId/study");
        break;
    }
  };

  const delThisDeck = (event) => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      console.log(event.target.value);
    }
  };

  return (
    <>
      <button onClick={navigation} id="createDeck">
        Create Deck
      </button>
      {decks.map((deck) => (
        <div>
          <h1>{deck.name}</h1>
          <p>{cards.length} cards</p>
          <p>{deck.description}</p>
          <button onClick={navigation} id="edit">
            Edit
          </button>
          <button onClick={navigation} id="study">
            Study
          </button>
          <button onClick={delThisDeck} value={deck.id}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default Home;
