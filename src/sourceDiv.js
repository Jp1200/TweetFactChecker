import React, { useState } from "react";
import { useAsync } from "react-async";
// const loadSources =

const LoadSource = () => {
  const { data, error, isLoading } = useAsync({
    promiseFn: async () => {
      console.log("hit function loadSources");
      await fetch(
        `https://api-hoaxy.p.rapidapi.com/articles?sort_by=relevant&use_lucene_syntax=true&query=${this.props.input}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
            "x-rapidapi-key":
              "5205c32fa5mshca9ad07b3dd74ccp18bbedjsnb96ddfde337e",
          },
        }
      );
    },
  });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    // The rendered component
    this.props.offLoading();
  return (
    <div>
      <div>
        <h2>React Async - Random Users</h2>
      </div>
      {data.map((source) => (
        <div key={source.id} className="row">
          <div className="col-md-12">
            <p>{source.title}</p>
            <p>{source.canonical_url}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default class Source extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <LoadSource input={this.props.input} onResponse={this.props.onResponse} />
    );
  }
}
