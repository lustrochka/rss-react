import { Component, ReactNode } from 'react';
import React from 'react';
import styles from './errorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
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
        <div className={styles.errorBlock}>
          <h2>Something went wrong...</h2>
          <div className={styles.eyes}>
            <div className={styles.eye}>
              <div className={styles.pupil}>
                <div className={styles.blick}></div>
              </div>
            </div>
            <div className={styles.eye}>
              <div className={styles.pupil}>
                <div className={styles.blick}></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
