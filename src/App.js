import React, { useState, useEffect } from "react";
// import Async, { useAsync } from "react-async";
// import Source from "./sourceDiv";

// OKAY
function useGiphy(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api-hoaxy.p.rapidapi.com/articles?sort_by=relevant&use_lucene_syntax=true&query=${query}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
              "x-rapidapi-key":
                "5205c32fa5mshca9ad07b3dd74ccp18bbedjsnb96ddfde337e",
            },
          }
        );
        const json = await response.json();

        setResults(json);
      } finally {
        setLoading(false);
      }
    }

    if (query !== "") {
      fetchData();
    }
  }, [query]);

  return [results, loading];
}
function App() {
  const [input, newInput] = useState("");
  const [query, setQuery] = useState("");
  const [results, loading] = useGiphy(query);

  const onSubmit = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      setQuery(input);
    }
  };

  return (
    <div className="container">
      <h1>
        <i className="fab fa-twitter"></i>Tweet Source Search
      </h1>
      <header>
        Copy and paste Tweets in the Search Bar to find related articles
      </header>
      <div className="form">
        <input
          onChange={(e) => newInput(e.target.value)}
          name="search"
          type="text"
          value={input}
          autoComplete="off"
          required
          onKeyPress={onSubmit}
        ></input>
        <label className="label-name" htmlFor="search">
          <span className="content-name">Search</span>
        </label>
      </div>
      <div className="sources-container">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          results.articles.map(
            (item) => <h1>{item.title}</h1>
            // <a href={item.canonical_url}>Link</a>
            // <p>Type: {item.site_type}</p>P
          )
        )}
      </div>
    </div>
  );
}

export default App;
