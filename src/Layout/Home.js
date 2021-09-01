import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listDecks, listCards, deleteDeck } from "../utils/api";

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
    const butId = event.target.id;
    const butVal = event.target.value;
    switch (butId) {
      case `createDeck`:
        history.push("/decks/new");
        break;
      case `edit`:
        history.push(`/decks/${butVal}/edit`);
        break;
      case `study`:
      default:
        history.push(`/decks/${butVal}/study`);
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
          <button onClick={navigation} id="edit" value={deck.id}>
            Edit
          </button>
          <button onClick={navigation} id="study" value={deck.id}>
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
