import React, { useState } from 'react';

import './SearchForm.css';

function SearchForm() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
