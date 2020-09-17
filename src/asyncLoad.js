import React, { useState, useEffect } from "react";

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
        console.log(json.articles);
        setResults(json.articles);
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

export default function AsyncHooks() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, loading] = useGiphy(query);
  const firstState = [
    {
      articles: {
        title: "Lovely Day for an Egg",
        canonical_url: "https://www.jackparker.dev",
        site_type: "Owner",
      },
    },
  ];
  const onSubmit = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      setQuery(search);
    }
  };
  return (
    <>
      <div className="form">
        <input
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          type="text"
          value={search}
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
          <h1>Loading...</h1>
        ) : (
          results.map((item) => (
            <div>
              <h1>{item.title}</h1>
              <a href={item.canonical_url}>Link</a>
              <p>Type: {item.site_type}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
