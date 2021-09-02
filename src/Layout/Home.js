import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listDecks, listCards, deleteDeck } from "../utils/api";

// Existing decks are each shown with the number of cards

// Fix get deck requests running indefinately

// Delete the proper cards with the deck deletion

function Home({ cards, setCards }) {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);
  // add cards to update if get request is ok
  useEffect(() => {
    listCards(1).then(setCards);
  }, []);

  const navigation = (event) => {
    const butId = event.target.id;
    const butVal = event.target.value;
    switch (butId) {
      case `createDeck`:
        history.push("/decks/new");
        break;
      case `view`:
        history.push(`/decks/${butVal}`);
        break;
      case `study`:
      default:
        history.push(`/decks/${butVal}/study`);
        break;
    }
  };

  const delThisDeck = (event) => {
    if (
      window.confirm(
        "Delete this deck? \n\n You will not be able to recover it."
      )
    ) {
      deleteDeck(event.target.value);
      setDecks([]);
    }
  };

  return (
    <div>
      <button onClick={navigation} id="createDeck">
        Create Deck
      </button>
      {decks.map((deck) => (
        <div>
          <h1>{deck.name}</h1>
          <p>{cards.length} cards</p>
          <p>{deck.description}</p>
          <button onClick={navigation} id="view" value={deck.id}>
            View
          </button>
          <button onClick={navigation} id="study" value={deck.id}>
            Study
          </button>
          <button onClick={delThisDeck} value={deck.id}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
