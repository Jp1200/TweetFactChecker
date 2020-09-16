import React, { useState } from "react";
import Async from "react-async";
import Source from "./sourceDiv";
function App() {
  const [input, newInput] = useState("");
  const [sources, newSources] = useState([]);

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
      loadSources();
    }
  };
  const onSubmit = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      searchForSources();
    }
  };
  const loadSources = async () => {
    await fetch(
      `https://api-hoaxy.p.rapidapi.com/articles?sort_by=relevant&use_lucene_syntax=true&query=${input}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
          "x-rapidapi-key":
            "5205c32fa5mshca9ad07b3dd74ccp18bbedjsnb96ddfde337e",
        },
      }
    )
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => onResponse(res.json()));
  };
  return (
    <div className="container">
      <h1>
        <i class="fab fa-twitter"></i>Tweet Source Search
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
        <Async promiseFn={loadSources}>
          <Async.Loading>Loading...</Async.Loading>
          <Async.Fulfilled>
            {(data) => {
              return (
                <div>
                  <div>
                    <h2>React Async - Random Users</h2>
                  </div>
                  {data.map((source) => (
                    <div key={source.sourcename} className="row">
                      <div className="col-md-12">
                        <p>{source.name}</p>
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
        </Async>
      </div>
    </div>
  );
}

export default App;
