import { Component } from 'react';
import imgUrl from '../assets/PIWO.svg';

interface IMyProps {
  class: string;
}

export class Loader extends Component<IMyProps> {
  render() {
    return (
      <div className={this.props.class}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index}>
            <img src={imgUrl} className="bubble"></img>
          </div>
        ))}
      </div>
    );
  }
}
