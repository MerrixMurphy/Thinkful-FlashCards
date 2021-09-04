import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, updateCard, readCard } from "../utils/api";

function CardForm({ currentDeck, currentCard, setCurrentCard }) {
  const history = useHistory();
  const params = useParams();
  const currentDeckParam = params.deckId;
  const currentCardParam = params.cardId;
  const [cardUpdate] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    if (currentCard) {
      cardUpdate.id = currentCardParam;
      cardUpdate.deckId = currentDeck.id;
    }

    if (currentCard) {
      updateCard(cardUpdate);
    } else {
      createCard(currentDeckParam, cardUpdate);
    }

    if (currentCard) {
      history.push(`/decks/${currentDeckParam}`);
    } else {
      const cardFront = document.getElementById("cardFront");
      const cardBack = document.getElementById("cardBack");
      cardFront.value = "";
      cardBack.value = "";
    }
  };

  const onChangeHandler = () => {
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    cardUpdate.front = cardFront.value;
    cardUpdate.back = cardBack.value;
  };

  useEffect(() => {
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    if (currentCardParam) {
      readCard(currentCardParam).then(
        (response) => (
          setCurrentCard,
          (cardFront.value = response.front),
          (cardBack.value = response.back),
          (cardUpdate.front = response.front),
          (cardUpdate.back = response.back)
        )
      );
    }
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <div className={"col-1"}>
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
      </div>
      <button
        className={"bg-secondary text-white"}
        onClick={() => history.push(`/decks/${params.deckId}`)}
      >
        {currentCard ? "Cancel" : "Done"}
      </button>
      <button className={"bg-primary text-white"} type="submit">
        {" "}
        {currentCard ? "Submit" : "Save"}
      </button>
    </form>
  );
}

export default CardForm;
