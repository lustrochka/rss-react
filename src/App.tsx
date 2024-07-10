import { Component } from 'react';
import { Page } from './components/page';
import { ErrorBoundary } from './components/errorBoundary';
import './App.scss';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    );
  }
}

export default App;
