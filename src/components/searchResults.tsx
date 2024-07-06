import { Component } from 'react';
import { IResponseItem } from '../types';

interface IMyProps {
  class: string;
  data: IResponseItem[];
}

export class SearchResults extends Component<IMyProps> {
  render() {
    return (
      <div className={this.props.class}>
        <div className="result-container">
          {this.props.data.map((item: IResponseItem) => (
            <div key={item.uid.toString()} className="result-item">
              <h3>{item.name}</h3>
              <div>type: {item.astronomicalObjectType}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
