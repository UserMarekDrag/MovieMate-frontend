// Importowanie wymaganych modułów i komponentów
import React, { useState } from 'react';

import './SearchForm.css';

function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    // Wywołaj API z miastem i datą
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Wpisz miasto" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Szukaj</button>
    </form>
  );
}

export default SearchForm;
