import React from 'react';
import './App.css';
import classes from './App.module.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Collections from './containers/Collections/Collections';

function App() {
  return (
    <div className={classes.App}>
      <Header/>
      {/* hello!! World!! */}
      <Collections/>
      <Footer/>
    </div>
  );
}

export default App;
