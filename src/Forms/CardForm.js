import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, updateCard, readCard } from "../utils/api";

function CardForm({ currentDeck, currentCard, setCurrentCard }) {
  const history = useHistory();
  const params = useParams();
  const [cardUpdate] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    if (!currentCard) {
      cardUpdate.id = params.cardId;
      cardUpdate.deckId = currentDeck.id;
    }

    !currentCard
      ? updateCard(cardUpdate)
      : createCard(currentDeck.id, cardUpdate);

    if (currentCard) {
      history.push(`/decks/${params.deckId}`);
    } else {
      const cardFront = document.getElementById("cardFront").value;
      const cardBack = document.getElementById("cardBack").value;
      cardFront = "";
      cardBack = "";
    }
  };

  const onChangeHandler = () => {
    const cardFront = document.getElementById("cardFront").value;
    const cardBack = document.getElementById("cardBack").value;
    cardUpdate.front = cardFront;
    cardUpdate.back = cardBack;
  };

  useEffect(() => {
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");

    if (currentCard) {
      readCard(params.cardId)
        .then(setCurrentCard)
        .then(() => (cardFront.value = currentCard.front))
        .then(() => (cardBack.value = currentCard.back));
    }
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <label for="cardFront">Front</label>
      <textarea
        required
        id="cardFront"
        name="cardFront"
        placeholder="Front side of card"
        onChange={onChangeHandler}
        type="text"
      ></textarea>
      <label for="cardBack">Back</label>
      <textarea
        required
        id="cardBack"
        name="cardBack"
        placeholder="Back side of card"
        onChange={onChangeHandler}
      ></textarea>
      <button onClick={() => history.push(`/decks/${params.deckId}`)}>
        {currentCard ? "Cancel" : "Done"}
      </button>
      <button type="submit"> {currentCard ? "Submit" : "Save"}</button>
    </form>
  );
}

export default CardForm;
