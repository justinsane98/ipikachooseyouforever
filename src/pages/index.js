import * as React from "react"
import { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Link } from "gatsby"
import ParticleComponent from '../components/particles';
import BurstComponent from '../components/burst';

const firebaseConfig = {
  apiKey: "AIzaSyB4tg5WQ1DCFtvKucAc1tXVdYCdPzjOoTE",
  authDomain: "ipikachooseyouforever.firebaseapp.com",
  projectId: "ipikachooseyouforever",
  storageBucket: "ipikachooseyouforever.appspot.com",
  messagingSenderId: "1086607561909",
  appId: "1:1086607561909:web:9405407ff511166a5a1afc",
  measurementId: "G-089EQSK7FT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCards: [],
      completedCards: [],
      card1: null,
      card2: null,
    }
  }
  componentDidMount = async () => {
    if(typeof window !== undefined) {
      if (location.hostname === "localhost") {
        connectFirestoreEmulator(db, "localhost", 5003);
      }
    }
    const setSnapshot = await getDocs(collection(db, "sets", "base1", "cards"));
    setSnapshot.docs.map((card) => {
      let setArray = this.state.availableCards.push(card.data());
      this.setState({set: setArray});
    });
  
    console.log(this.state.availableCards);

    this.getTwoRandomCards();

  }

  getTwoRandomCards = () => {
    const index1 = Math.floor(Math.random() * this.state.availableCards.length);
    let index2 = Math.floor(Math.random() * this.state.availableCards.length);

    if(index1 === index2) {
      index2 = Math.floor(Math.random() * this.state.availableCards.length);
    }

    console.log(this.state.availableCards[index1]);
    console.log(this.state.availableCards[index2]);

    this.setState({
      card1: this.state.availableCards[index1],
      card2: this.state.availableCards[index2],
    });
  }

  render() {
    return (
      <div className="h-screen relative overflow-x-hidden">
        <ParticleComponent/>
        <header className="fixed top-0 left-0 right-0 bg-black z-10 p-2">
          <div className="text-white text-xs flex text-center font-bold max-w-screen-sm mx-auto">
            <div className="flex-1">I</div>
            <div className="flex-1">P</div>
            <div className="flex-1">I</div>
            <div className="flex-1">K</div>
            <div className="flex-1">A</div>
            <div className="flex-1">C</div>
            <div className="flex-1">H</div>
            <div className="flex-1">O</div>
            <div className="flex-1">O</div>
            <div className="flex-1">S</div>
            <div className="flex-1">E</div>
            <div className="flex-1">Y</div>
            <div className="flex-1">O</div>
            <div className="flex-1">U</div>
            <div className="flex-1">F</div>
            <div className="flex-1">O</div>
            <div className="flex-1">R</div>
            <div className="flex-1">E</div>
            <div className="flex-1">V</div>
            <div className="flex-1">E</div>
            <div className="flex-1">R</div>
          </div>  
        </header>
  
        <BurstComponent/>
        {this.state.card1 &&
          <div className="absolute top-12 left-12 h-[75vh] w-[33vw]">
            <img src={this.state.card1.image} alt={this.state.card1.name}/>
            {/* TODO FORMAT PRICE */}
            <div>${this.state.card1.price}</div>
          </div>
        }
        
        {this.state.card2 &&
          <div className="absolute top-12 right-12 h-[75vh] w-[33vw]">
            <img src={this.state.card2.image} alt={this.state.card2.name}/>
            {/* TODO FORMAT PRICE */}
            <div>${this.state.card2.price}</div>
          </div>
        }

      </div>
    );
  }
}

export default Index;