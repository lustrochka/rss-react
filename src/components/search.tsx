import { Component } from 'react';
import searchUrl from '../assets/drawing-2.svg';

interface IMyProps {
  callback: (searchString: string) => void;
}

export class Search extends Component<IMyProps> {
  state = {
    searchString: localStorage.getItem('searchString') || '',
  };
  render() {
    return (
      <div className="search-block">
        <div>Find astronomical object</div>
        <div className="search">
          <input
            type="search"
            value={this.state.searchString}
            className="search-input"
            onChange={(event) =>
              this.setState({ searchString: event.target.value.trim() })
            }
          ></input>
          <div
            className="loupe"
            onClick={() => {
              localStorage.setItem('searchString', this.state.searchString);
              this.props.callback(this.state.searchString);
            }}
          >
            <img src={searchUrl}></img>
          </div>
        </div>
      </div>
    );
  }
}
