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
      difference: 0,
      subTotal: 0,
      successes: 0,
      fails: 0,
      streak: 0,
      showPrices: false,
      showStartButton: false,
      showNextButton: false,
      showFinishButton: false,
      showCards: true,
      showResults: false,
      showBurst: true,
      loading: true
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

  formatPrice = (price) => {
    return "$" + price.toFixed(2)
  }

  getTwoRandomCards = () => {
    const index1 = Math.floor(Math.random() * this.state.availableCards.length);
    let index2 = Math.floor(Math.random() * this.state.availableCards.length);

    if(index1 === index2) {
      index2 = Math.floor(Math.random() * this.state.availableCards.length);
    }

    this.setState({
      card1: this.state.availableCards[index1],
      card2: this.state.availableCards[index2],
      loading: false,
      difference: this.state.availableCards[index1].price - this.state.availableCards[index2].price
    });
  }

  showNext = () => {
    this.clearStage()
    this.getTwoRandomCards()
    this.setStage()
    
  }

  chooseCard = (index) => {
    this.showPrices()
    this.hideBurst()
    if(index == 1 && this.state.card1.price > this.state.card2.price) {
      this.addToSuccesses()
      this.addToStreak()
      this.showResults()
      this.showNextButton()
    } else if (index == 2 && this.state.card2.price > this.state.card1.price) {
      this.addToSuccesses()
      this.addToStreak()
      this.showResults()
      this.showNextButton()
    } else {
      this.resetStreak()
      if(this.state.fails < 2) {
        this.addToFails()
        this.showResults()
        this.showNextButton()
        } else {
          this.showResults()
        // show retry button!
        console.log("GAME OVER!!!")
        }
    }
    this.setSubTotal()
    this.showResults()
  }

  showPrices = () => {
    this.setState({
      showPrices: true
    })
  }

  hidePrices = () => {
    this.setState({
      showPrices: false
    })
  }

  setSubTotal = () => {
    const subTotal = this.state.subTotal + this.state.difference
    this.setState({
      subTotal: subTotal
    })
  }

  addToSuccesses = () => {
    this.setState({
      successes: this.state.successes + 1
    })
  }

  addToFails = () => {
    this.setState({
      fails: this.state.fails + 1
    })
  }

  addToStreak = () => {
    this.setState({
      streak: this.state.streak + 1
    })
  }

  resetStreak = () => {
    this.setState({
      streak: 0
    })
  }

  // call after clicking next
  clearStage = () => {
    this.hideCards()
    this.hidePrices()
    this.hideResults()
    this.hideNextButton()
  }

  // call after clearing stage
  setStage = () => {
    this.showCards()
    this.showBurst()
  }

  showEndGame = () => {

  }

  hideCards = () => {
    this.setState({
      showCards: false 
    })
  }

  showCards = () => {
    this.setState({
      showCards: true 
    })
  }

  showNextButton = () => {
    this.setState({
      showNextButton: true 
    })
  }
  
  hideNextButton = () => {
    this.setState({
      showNextButton: false 
    })
  }

  showResults = () => {
    this.setState({
      showResults: true 
    })
  }
  
  hideResults = () => {
    this.setState({
      showResults: false 
    })
  }

  showBurst = () => {
    this.setState({
      showBurst: true 
    })
  }
  
  hideBurst = () => {
    this.setState({
      showBurst: false 
    })
  }

  render() {
    return (
      <div className="h-screen relative overflow-hidden">
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

        <div className={`transition-opacity duration-250 ${this.state.loading ? "opacity-0" : "opcity-100"}`}>
          {this.state.showBurst &&
            <BurstComponent/>
          }
          
          {this.state.showResults &&
            <div className="absolute bottom-24 w-full flex justify-center">
              <div>
                <div>Difference: {this.formatPrice(Math.abs(this.state.difference))}</div>
                <div>SubTotal: {this.formatPrice(this.state.subTotal)}</div>
                <div>Streak: {this.state.streak}</div>
                <div>Successes: {this.state.successes}</div>
                <div>Fails: {this.state.fails}</div>

                {this.state.showNextButton &&
                  <button onClick={(e)=> {e.preventDefault();this.showNext()}} className="mt-4 rounded bg-black text-xl text-white font-bold px-4 py-2 inline-block">Next</button>
                }
              </div>
            </div>
          }

          {this.state.card1 &&
            <div onClick={(e) => {e.preventDefault();this.chooseCard(1)}} className={`absolute top-20 left-12 h-auto w-[33vw] -rotate-[5deg] transition duration-100 hover:cursor-pointer hover:scale-110 hover:-rotate-[3deg] ${this.state.showCards ? "opacity-100" : "opacity-0"}`}>
              <div className="rounded-xl overflow-hidden">
              <img src={this.state.card1.image} alt={this.state.card1.name}/>
              </div>
              {this.state.showPrices &&
                <div className="absolute -bottom-4 -right-4 w-full flex justify-end">
                  <div className={`bg-black text-black text-center w-auto p-4 rounded-xl bg-[#EED54E] ${this.state.card1.price > this.state.card2.price ? "text-3xl font-bold" : "text-lg" }`}>{this.formatPrice(this.state.card1.price)}</div>
                </div>
              }
            </div>
          }
          
          {this.state.card2 &&
            <div onClick={(e) => {e.preventDefault();this.chooseCard(2)}} className={`absolute top-20 right-12 h-auto w-[33vw] rotate-[5deg] transition duration-100 hover:cursor-pointer hover:scale-110 hover:rotate-[3deg] ${this.state.showCards ? "opacity-100" : "opacity-0"}`}>
              <div className="rounded-xl overflow-hidden">
                <img src={this.state.card2.image} alt={this.state.card2.name}/>
              </div>
              {this.state.showPrices &&
                <div className="absolute -bottom-4 -left-4 w-full flex justify-start">
                  <div className={`bg-black text-black text-center w-auto p-4 rounded-xl bg-[#EED54E] ${this.state.card1.price < this.state.card2.price ? "text-3xl font-bold" : "text-lg" }`}>{this.formatPrice(this.state.card2.price)}</div>
                  <div className={`absolute w-1 rounded-xl bg-[#EED54E] ${this.state.card1.price < this.state.card2.price ? "animate-ping" : "hidden" }`}></div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Index;