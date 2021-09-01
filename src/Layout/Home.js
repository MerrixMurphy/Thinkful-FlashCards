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
  const [delDeck, setDelDeck] = useState(null);

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  function listDeckCards(deckId) {
    // listCards(deckId).then(setCards);
    // return cards.length;
  }

  const navigation = (event) => {
    const butVal = event.target.value;
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

  const deleteDeck = (event) => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      setDelDeck(event.target.value);
    }
  };
  //   useEffect(() => {
  //     deleteDeck(delDeck);
  //   }, [deleteDeck]);

  return (
    <>
      <button onClick={navigation} value="createDeck">
        Create Deck
      </button>
      {decks.map((deck) => (
        <div>
          <h1>{deck.name}</h1>
          <p>{listDeckCards(deck.id)} cards</p>
          <p>{deck.description}</p>
          <button onClick={navigation} value="edit">
            Edit
          </button>
          <button onClick={navigation} value="study">
            Study
          </button>
          <button onClick={deleteDeck} value={deck.id}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default Home;
