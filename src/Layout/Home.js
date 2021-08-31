import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listDecks } from "../utils/api";
import { listCards } from "../utils/api";
// Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
// Clicking the “Delete” button shows a warning message before deleting the deck.

// Delete Deck prompt
// When the user clicks the "Delete" button, a warning message is shown and the user can click "OK" or "Cancel". If the user clicks "OK", the deck is deleted and the deleted deck is no longer visible on the Home screen.

// You can use window.confirm() to create the modal dialog shown in the screenshot below.
function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  let cardId = null;

  useEffect(() => {
    listDecks().then(setDecks);
  }, []);

  useEffect(() => {
    listCards().then(setCards);
  }, []);

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

  return (
    <>
      <button onClick={navigation} value="createDeck">
        Create Deck
      </button>
      {decks.map((deck) => (
        <div>
          <h1>{deck.name}</h1>
          <p> cards</p>
          <p>{deck.description}</p>
          <button onClick={navigation} value="edit">
            Edit
          </button>
          <button onClick={navigation} value="study">
            Study
          </button>
          <button>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Home;
