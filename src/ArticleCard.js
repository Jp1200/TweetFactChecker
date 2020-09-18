import React from "react";

export default class Article extends React.Component {
  render() {
    return (
      <div className="card-grid-space">
        <div className="num">Score: {parseInt(this.props.item.score)}</div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="article-card"
          href={this.props.item.canonical_url}
        >
          <div>
            <h1>{this.props.item.title}</h1>
            <p>Number of Tweets: {this.props.item.number_of_tweets}</p>
            <div className="date">
              {this.props.item.date_published.split("T")[0]}
            </div>
            <div className="tags">
              <div className="tag">
                {this.props.item.site_type.toUpperCase()}
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
