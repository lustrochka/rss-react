'use client';

import { Component, ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error('An error occurred', error);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBlock">
          <h2>Something went wrong...</h2>
          <div className="eyes">
            <div className="eye">
              <div className="pupil">
                <div className="blick"></div>
              </div>
            </div>
            <div className="eye">
              <div className="pupil">
                <div className="blick"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
