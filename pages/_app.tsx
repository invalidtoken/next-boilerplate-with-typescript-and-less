import App from 'next/app';
import { ReactElement } from 'react';

class MyApp extends App {
  render(): ReactElement {
    const { Component } = this.props;
    return (
      <div>
        <Component />
      </div>
    );
  }
}

export default MyApp;
