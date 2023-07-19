import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function App() {
  // State variables to manage input, error message, and distributed cards
  const [people, setPeople] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [distributedCards, setDistributedCards] = useState([]);

  // Function to validate if input is empty, invalid number, zero or negative
  const validateInput = (input) => {
    if (!input || isNaN(input) || parseInt(input) <= 0) {
      return false;
    }
    return true;
  };

  // Function to distribute cards to people
  const distributeCards = (peopleCount) => {
    // Hardcode the list of cards
    const cards = [
      'S-A', 'S-2', 'S-3', 'S-4', 'S-5', 'S-6', 'S-7', 'S-8', 'S-9', 'S-X', 'S-J', 'S-Q', 'S-K',
      'H-A', 'H-2', 'H-3', 'H-4', 'H-5', 'H-6', 'H-7', 'H-8', 'H-9', 'H-X', 'H-J', 'H-Q', 'H-K',
      'D-A', 'D-2', 'D-3', 'D-4', 'D-5', 'D-6', 'D-7', 'D-8', 'D-9', 'D-X', 'D-J', 'D-Q', 'D-K',
      'C-A', 'C-2', 'C-3', 'C-4', 'C-5', 'C-6', 'C-7', 'C-8', 'C-9', 'C-X', 'C-J', 'C-Q', 'C-K'
    ];

    // Define total of cards
    const totalCards = cards.length;

    // Return error if people more than card
    if (peopleCount > totalCards) {
      setErrorMessage("Input value exceeds the total number of cards.");
      return;
    }

    // Make a random shuffle
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    // Distribute cards to each person
    const result = [];
    let cardsPerPerson = Math.floor(totalCards / peopleCount); // Calculate cards and round down to whole number
    let remainingCards = totalCards % peopleCount; // Calculate remaining cards

    let start = 0;
    for (let i = 0; i < peopleCount; i++) {
      // Calculate the number of cards to distribute to this person
      let numOfCards = cardsPerPerson;

      // If there are remaining cards, distribute one to this person
      if (remainingCards > 0) {
        numOfCards++;
        remainingCards--;
      }

      // Get the cards for this person and add them to the result array
      const personCards = shuffledCards.slice(start, start + numOfCards);
      // Separate each result with coma
      result.push(personCards.join(","));

      // Move the start index to the next set of cards for the next person
      start += numOfCards;
    }

    // Save the distributed cards to state for display
    setDistributedCards(result);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the validateInput function at line 11 return false
    if (!validateInput(people)) {
      setErrorMessage("Input value does not exist or value is invalid");
      setDistributedCards([]);
      return;
    }

    // Valid input will reset the error message
    setErrorMessage('');
    // Call distributeCards function
    distributeCards(parseInt(people));
  };

  return (
    <div className="container mt-5">
      <h1>Card Distribution</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="people">
          <Form.Label>Number of People:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Distribute Cards
        </Button>
      </Form>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {distributedCards.length > 0 && (
        <>
          <h2>Distributed Cards</h2>
          {distributedCards.map((cards, index) => (
            <p key={index}>Person {index + 1}: {cards}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
