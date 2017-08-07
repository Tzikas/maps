import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ExampleApp from '../PopupButton/PopupButton';
// import Prompt from '../popup/popup';

const App = ({ children }) => (
  <div>
    <ExampleApp />

    <main>
      {children}
    </main>
  </div>
);

export default App;