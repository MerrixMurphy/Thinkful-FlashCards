import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createCard, updateCard, readCard } from "../utils/api";

function CardForm({ currentDeck, currentCard, setCurrentCard }) {
  const history = useNavigate();
  const params = useParams();

  // Create constants of the current url params.
  const currentDeckParam = params.deckId;
  const currentCardParam = params.cardId;

  // State used to track the updated card information.
  const [cardUpdate, setCardUpdate] = useState({});

  // Submit handler for Form.
  const submitHandler = (event) => {
    event.preventDefault();

    // If we are editing the card, set the cardUpdate state to include an object with an id and deckId.
    if (currentCard) {
      cardUpdate.id = Number(currentCardParam);
      cardUpdate.deckId = Number(currentDeck.id);
    }

    // If we are editing a card. update said card with cardUpdate object, or else create a new card with the information.
    if (currentCard) {
      updateCard(cardUpdate);
    } else {
      createCard(currentDeckParam, cardUpdate);
    }

    // Finally if we are editing, take us to the deck with the card in it, or else update the values of the input elements to be blank.
    if (currentCard) {
      history(`/decks/${currentDeckParam}`);
    } else {
      const cardFront = document.getElementById("cardFront");
      const cardBack = document.getElementById("cardBack");
      cardFront.value = "";
      cardBack.value = "";
    }
  };

  // Change handler to update the input elements with the current front and back of the cardUpdate state.
  const onChangeHandler = () => {
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    setCardUpdate({ front: cardFront.value, back: cardBack.value });
  };

  // A useEffect to check if there are current card params and if so, pull up the current card and set the input values appropriately.
  useEffect(() => {
    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    if (currentCardParam) {
      readCard(currentCardParam).then((response) => {
        setCurrentCard(response);
        cardFront.value = response.front;
        cardBack.value = response.back;
        setCardUpdate({ front: response.front, back: response.back });
      });
    }
  }, [setCardUpdate, currentCardParam, setCurrentCard]);

  return (
    <form onSubmit={submitHandler}>
      <div className={"col-1"}>
        <label htmlFor="cardFront">Front</label>
        <textarea
          required
          id="cardFront"
          name="cardFront"
          placeholder="Front side of card"
          onChange={onChangeHandler}
          type="text"
        ></textarea>
        <label htmlFor="cardBack">Back</label>
        <textarea
          required
          id="cardBack"
          name="cardBack"
          placeholder="Back side of card"
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <button
        className={"bg-secondary text-white btn btn-outline-light"}
        type="button"
        onClick={() => history(`/decks/${params.deckId}`)}
      >
        {currentCard ? "Cancel" : "Done"}
      </button>
      <button
        className={"bg-primary text-white btn btn-outline-light"}
        type="submit"
      >
        {" "}
        {currentCard ? "Submit" : "Save"}
      </button>
    </form>
  );
}

export default CardForm;
