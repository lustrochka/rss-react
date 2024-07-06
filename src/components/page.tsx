import { Component } from 'react';
import axios from 'axios';
import { SearchParams } from '../types';
import { Search } from './search';
import { Loader } from './loader';
import { SearchResults } from './searchResults';
import '../App.scss';

export class Page extends Component {
  state = {
    results: [],
    loadingClass: 'loading',
    resClass: 'results hiding',
    nothingClass: 'not-found hiding',
    error: false,
  };

  componentDidMount(): void {
    this.search(localStorage.getItem('searchString') || '');
  }

  componentDidUpdate() {
    if (this.state.error) throw new Error('This is an error');
  }

  load() {
    this.setState({
      loadingClass: 'loading',
      resClass: 'results hiding',
      nothingClass: 'not-found hiding',
    });
  }

  search(searchString: string) {
    const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject/search';
    const params: SearchParams = { pageNumber: 0, pageSize: 10 };
    if (searchString) params.name = searchString;
    axios
      .post(
        BASE_URL,
        {},
        {
          params,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        if (res.data.astronomicalObjects.length > 0) {
          this.setState({
            loadingClass: 'loading hiding',
            resClass: 'results',
            nothingClass: 'not-found hiding',
            results: res.data.astronomicalObjects,
          });
        } else {
          this.setState({
            loadingClass: 'loading hiding',
            nothingClass: 'not-found',
          });
        }
      });
  }

  render() {
    return (
      <>
        <div className="top-section">
          <button
            className="error-button"
            onClick={() => {
              this.setState({ error: true });
            }}
          >
            Make an error
          </button>
          <Search
            callback={(searchString) => {
              this.load();
              this.search(searchString);
            }}
          />
        </div>
        <div className="bottom-section">
          <Loader class={this.state.loadingClass} />
          <h2 className={this.state.nothingClass}>Nothing found :(</h2>
          <SearchResults
            class={this.state.resClass}
            data={this.state.results}
          />
        </div>
      </>
    );
  }
}
