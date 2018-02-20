import React, { Component } from "react";
import tmdb from "../tmdb";
import _ from "lodash";
import DocumentTitle from "react-document-title";

import Header from "./Header";
import MovieArray from "./MovieArray";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchresults: []
    };

    this.videoSearch = this.videoSearch.bind(this);
  }

  getData(term) {
    tmdb.call("/search/movie", { query: term, include_adult: true }, data => {
      let results = [];
      data.results.map(movie => {
        // eslint-disable-line
        if (movie.poster_path) {
          results.push(movie);
        }
      });
      this.setState({ searchresults: results });
    });
  }

  videoSearch(term) {
    this.setState({ searchTerm: term });
    this.getData(term);
  }

  render() {
    return (
      <DocumentTitle title="Search">
        <div className="searchpage">
          <div className="searchcover">
            <Header
              search={true}
              onSearchTermChange={this.videoSearch}
              searchTerm={this.state.searchTerm}
            />
          </div>

          {this.state.searchresults[0] && (
            <MovieArray search={true} data={this.state.searchresults} />
          )}
        </div>
      </DocumentTitle>
    );
  }
}

export default SearchPage;
