import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { listDecks, deleteDeck } from "../utils/api";

function Home({ decks, setDecks }) {
  const history = useHistory();

  useEffect(() => {
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
      <button
        className={"bg-secondary text-white"}
        onClick={navigation}
        id="createDeck"
      >
        Create Deck
      </button>
      {decks.map((deck, index) => (
        <div className={"border my-2 col"} key={index}>
          <div className={"d-flex justify-content-between"}>
            <h1>{deck.name}</h1>
            <p>{`${deck.cards.length} cards`}</p>
          </div>
          <p>{deck.description}</p>
          <div className={"mb-2 mx-1 d-flex justify-content-between"}>
            <div>
              <button
                className={"bg-secondary text-white"}
                onClick={navigation}
                id="view"
                value={deck.id}
              >
                View
              </button>
              <button
                className={"bg-primary text-white"}
                onClick={navigation}
                id="study"
                value={deck.id}
              >
                Study
              </button>
            </div>
            <button
              className={"bg-danger text-white"}
              onClick={delThisDeck}
              value={deck.id}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
