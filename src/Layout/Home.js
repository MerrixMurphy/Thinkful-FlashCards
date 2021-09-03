import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { listDecks, listCards, deleteDeck } from "../utils/api";

// Fix sync issues throughout

//style everything

//pass tests

//The Edit Card and Create Card screens share the same form component.

//The useEffect() hooks have the appropriate dependencies listed in the dependency array.

function Home({ cards, setCards, decks, setDecks }) {
  const history = useHistory();

  useEffect(() => {
    // add async above
    // let decks = await listDecks();
    // decks = decks.map(async (deck) => {
    //   const cards = await listCards(deck.id);
    //   deck.count = cards.length;
    //   return d eck;
    // });
    // Promise.all(decks).then(setDecks);
    listDecks().then(setDecks);
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
      deleteDeck(event.target.value).then(() => listDecks().then(setDecks));
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
          <p>{deck.count} cards</p>
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
