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
          `https://api.giphy.com/v1/gifs/search?api_key=ySGo48L37OkJ0cGH1zAfrGr8yobgFMQt&q=${query}&limit=10&offset=0&rating=G&lang=en`
        );
        const json = await response.json();

        setResults(
          json.data.map((item) => {
            return item.images.preview.mp4;
          })
        );
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
  const [sources, newSources] = useState([]);
  const [loading, newState] = useState(false);
  const [results, loading] = useGiphy(input);
  const onLoading = () => {
    newState(true);
  };
  const offLoading = () => {
    newState(false);
  };
  const onInputChange = (event) => {
    newInput(event.target.value);
  };
  const onResponse = (data) => {
    newSources(data);
  };
  const searchForSources = () => {
    if (input === "") {
      alert("Enter Something");
    } else {
      onLoading();
    }
  };
  const onSubmit = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      searchForSources();
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
          onChange={onInputChange}
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
        {/* {loading ? (
          <Source
            sources={sources}
            input={input}
            onResponse={onResponse}
            offLoading={offLoading}
          />
        ) : (
          <p>Enter to search</p>
        )} */}
        {loading ? (
          <h1>LOADING...</h1>
        ) : (
          results.map((item) => {
            return (
              <div>
                <p>{item.canonical_url}</p>
              </div>
            );
          })
        )}
        {/* <Async promiseFn={loadSources}>
          <Async.Loading>Loading...</Async.Loading>
          <Async.Fulfilled>
            {(data) => {
              return (
                <div>
                  <div>
                    <h2>React Async - Random Users</h2>
                  </div>
                  {data.map((source) => (
                    <div key={source.source} className="row">
                      <div className="col-md-12">
                        <p>{source.title}</p>
                        <p>{source.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </Async.Fulfilled>
          <Async.Rejected>
            {(error) => `Something went wrong: ${error.message}`}
          </Async.Rejected>
        </Async> */}
      </div>
    </div>
  );
}

export default App;
