import * as React from "react"
import { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, connectFirestoreEmulator, setDoc, doc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Link } from "gatsby"
import ParticleComponent from '../components/particles';
import BurstComponent from '../components/burst';
import HeaderComponent from "../components/header";
import { v4 as uuidv4 } from 'uuid';
import timestamp from "time-stamp";

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

let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

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
      success: false,
      fail: false,
      fails: 0,
      streak: 0,
      showPrices: false,
      showStartButton: false,
      showNextButton: false,
      showRetryButton: false,
      showCards: true,
      showResults: false,
      showBurst: true,
      loading: true,
      cardChosen: false,
      saved: false,
      profane: false,
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
  
    logEvent(analytics, 'startGame', {
      id: "public"
    });
    
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

    const card1 = this.state.availableCards[index1];
    const card2 = this.state.availableCards[index2]

    this.setState({
      card1: card1,
      card2: card2,
      loading: false,
      difference: card1.price > card2.price ? card1.price - card2.price : card2.price - card1.price
    });
  }

  showNext = () => {
    this.clearStage()
    this.getTwoRandomCards()
    this.setStage()
  }

  chooseCard = (index) => {
    if(!this.state.cardChosen){
      this.setState({
        cardChosen: true
      });
      this.showPrices()
      this.hideBurst()
      if(index == 1 && this.state.card1.price > this.state.card2.price) {
        this.setSuccess()
        this.addToSuccesses()
        this.addToStreak()
        this.showResults()
        this.showNextButton()
        this.addToSubTotal()
        logEvent(analytics, 'pickSuccess', {
          id: "public"
        });
      } else if (index == 2 && this.state.card2.price > this.state.card1.price) {
        this.setSuccess()
        this.addToSuccesses()
        this.addToStreak()
        this.showResults()
        this.showNextButton()
        this.addToSubTotal()
        logEvent(analytics, 'pickSuccess', {
          id: "public"
        });
      } else {
        this.setFail()
        this.addToFails()
        this.resetStreak()
        this.subtractFromSubTotal()
        this.showResults()
        logEvent(analytics, 'pickFail', {
          id: "public"
        });
        if(this.state.fails < 2) {
          this.showNextButton()
          } else {
            this.showEndGameButton()
            //this.showRetryButton()
            logEvent(analytics, 'gameOver', {
              id: "public"
            });
          }
      }
      this.showResults()
    }
  }

  unChooseCard = () => {
    this.setState({
      cardChosen: false
    });
  }

  setSuccess = () => {
    this.setState({
      success: true
    })
  }

  setFail = () => {
    this.setState({
      fail: true
    })
  }

  resetSuccess = () => {
    this.setState({
      success: false
    })
  }

  resetFail = () => {
    this.setState({
      fail: false
    })
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

  addToSubTotal = () => {
    this.setState({
      subTotal: this.state.subTotal + this.state.difference
    })
  }
  

  subtractFromSubTotal = () => {
    this.setState({
      subTotal: this.state.subTotal - this.state.difference
    })
  }

  resetSubTotal = () => {
    this.setState({
      subTotal: 0
    })
  }

  addToSuccesses = () => {
    this.setState({
      successes: this.state.successes + 1
    })
  }

  resetSuccesses = () => {
    this.setState({
      successes: 0
    })
  }

  addToFails = () => {
    this.setState({
      fails: this.state.fails + 1
    })
  }

  resetFails = () => {
    this.setState({
      fails: 0
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
    this.unChooseCard()
    this.hideCards()
    this.hidePrices()
    this.hideResults()
    this.hideNextButton()
    this.hideRetryButton()
    this.hideEndGameButton()
    this.resetSuccess()
    this.resetFail()
  }

  // call after clearing stage
  setStage = () => {
    this.showCards()
    this.showBurst()
  }


  retry = () => {
    this.resetFails()
    this.resetSuccesses()
    this.resetSubTotal()
    this.resetStreak()
    this.clearStage()
    this.getTwoRandomCards()
    this.setStage()
  }

  setInitials = (e) => {
    this.setState({
      initials: e.target.value.toUpperCase().replace(/[^a-z]/gi, '')
    })
  }

  saveScore = async () => {
    this.setState({
      profane: false
    })
    if(this.state.initials != "" && this.state.initials.length === 3){
      // profanity check...
      const profane = ["ASS", "CUM", "FUC", "FUK", "SEX", "JEW", "GAY", "TIT", "KKK", "DIK", "DIK", "CNT", "XXX"]
      if(profane.includes(this.state.initials)){
        this.setState({
          profane: true
        })
      } else {
        this.setState({
          saved: true
        })
        await setDoc(doc(db, "leaderboard", uuidv4()), {
          initials: this.state.initials,
          total: this.state.subTotal,
          successes: this.state.successes,
          date: timestamp('YYYY/MM/DD:mm:ss')
        });
      }
      
    } else {
      
    }
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

  showRetryButton = () => {
    this.setState({
      showRetryButton: true 
    })
  }
  
  hideRetryButton = () => {
    this.setState({
      showRetryButton: false 
    })
  }

  showEndGameButton = () => {
    this.setState({
      showEndGameButton: true 
    })
  }
  
  hideEndGameButton = () => {
    this.setState({
      showEndGameButton: false 
    })
  }

  showEndGame = () => {
    this.clearStage()
    this.showRetryButton()
    this.setState({
      showEndGame: true 
    })
  }
  
  hideEndGame = () => {
    this.setState({
      showEndGame: false 
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
      <div className="h-screen relative overflow-hidden bg-black">
        <ParticleComponent/>
        <HeaderComponent/>

        <div className={`transition-opacity duration-250 ${this.state.loading ? "opacity-0" : "opacity-100"}`}>
          {this.state.showBurst &&
            <BurstComponent/>
          }
          
          {this.state.showResults &&
            <div className={`relative grid h-screen mt-4 1024px:mt-0 place-content-center w-full flex justify-center text-center transition-opacity duration-250 ${this.state.showResults ? "opacity-100" : "opacity-0"}`}>
              <div className="rounded-xl bg-black-75 p-2 1024px:p-4">
                <div className="rounded-xl bg-black py-4 px-4 1024px:px-8 text-white text-left w-[25vw]">
                {this.state.success &&
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-16 1024px:w-32 fill-green inline-block">
                    <path d="M88 192h-48C17.94 192 0 209.9 0 232v208C0 462.1 17.94 480 40 480h48C110.1 480 128 462.1 128 440v-208C128 209.9 110.1 192 88 192zM96 440C96 444.4 92.41 448 88 448h-48C35.59 448 32 444.4 32 440v-208C32 227.6 35.59 224 40 224h48C92.41 224 96 227.6 96 232V440zM512 221.5C512 187.6 484.4 160 450.5 160h-102.5c11.98-27.06 18.83-53.48 18.83-67.33C366.9 62.84 343.6 32 304.9 32c-41.22 0-50.7 29.11-59.12 54.81C218.1 171.1 160 184.8 160 208C160 217.1 167.5 224 176 224C180.1 224 184.2 222.4 187.3 219.3c52.68-53.04 67.02-56.11 88.81-122.5C285.3 68.95 288.2 64 304.9 64c20.66 0 29.94 16.77 29.94 28.67c0 10.09-8.891 43.95-26.62 75.48c-1.366 2.432-2.046 5.131-2.046 7.83C306.2 185.5 314 192 322.2 192h128.3C466.8 192 480 205.2 480 221.5c0 15.33-12.08 28.16-27.48 29.2c-8.462 .5813-14.91 7.649-14.91 15.96c0 12.19 12.06 12.86 12.06 30.63c0 14.14-10.11 26.3-24.03 28.89c-5.778 1.082-13.06 6.417-13.06 15.75c0 8.886 6.765 10.72 6.765 23.56c0 31.02-31.51 22.12-31.51 43.05c0 3.526 1.185 5.13 1.185 10.01C389 434.8 375.8 448 359.5 448H303.9c-82.01 0-108.3-64.02-127.9-64.02c-8.873 0-16 7.193-16 15.96C159.1 416.3 224.6 480 303.9 480h55.63c33.91 0 61.5-27.58 61.5-61.47c18.55-10.86 30.33-31 30.33-53.06c0-4.797-.5938-9.594-1.734-14.27c19.31-10.52 32.06-30.97 32.06-53.94c0-7.219-1.281-14.31-3.75-20.98C498.2 266.2 512 245.3 512 221.5z"/>
                  </svg>
                }

                {this.state.fail &&
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-16 1024px:w-32 fill-red inline-block">
                  <path d="M128 288V64.03c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 320 128 305.7 128 288zM481.5 229.1c1.234-5.092 1.875-10.32 1.875-15.64c0-22.7-11.44-43.13-29.28-55.28c.4219-3.015 .6406-6.076 .6406-9.122c0-22.32-11.06-42.6-28.83-54.83c-2.438-34.71-31.47-62.2-66.8-62.2h-52.53c-35.94 0-71.55 11.87-100.3 33.41L169.6 92.93c-6.285 4.71-9.596 11.85-9.596 19.13c0 12.76 10.29 24.04 24.03 24.04c5.013 0 10.07-1.565 14.38-4.811l36.66-27.51c20.48-15.34 45.88-23.81 71.5-23.81h52.53c10.45 0 18.97 8.497 18.97 18.95c0 3.5-1.11 4.94-1.11 9.456c0 26.97 29.77 17.91 29.77 40.64c0 9.254-6.392 10.96-6.392 22.25c0 13.97 10.85 21.95 19.58 23.59c8.953 1.671 15.45 9.481 15.45 18.56c0 13.04-11.39 13.37-11.39 28.91c0 12.54 9.702 23.08 22.36 23.94C456.2 266.1 464 275.2 464 284.1c0 10.43-8.516 18.93-18.97 18.93H307.4c-12.44 0-24 10.02-24 23.1c0 4.038 1.02 8.078 3.066 11.72C304.4 371.7 312 403.8 312 411.2c0 8.044-5.984 20.79-22.06 20.79c-12.53 0-14.27-.9059-24.94-28.07c-24.75-62.91-61.74-99.9-80.98-99.9c-13.8 0-24.02 11.27-24.02 23.99c0 7.041 3.083 14.02 9.016 18.76C238.1 402 211.4 480 289.9 480C333.8 480 360 445 360 411.2c0-12.7-5.328-35.21-14.83-59.33h99.86C481.1 351.9 512 321.9 512 284.1C512 261.8 499.9 241 481.5 229.1z"/>
                  </svg>
                }
                <div className="my-2 1024px:my-4 text-xl font-bold">
                  <div className="flex w-full items-center">
                    <div className={`text-xl w-1/2 1024px:text-3xl mb-0 text-left 1024px:mb-2 mr-2 ${this.state.success ? "text-green" : "text-red"}`}>{this.state.success ? "+" : "-"}{this.formatPrice(this.state.difference)}</div>
                    <div className="text-3xl w-1/2 1024px:text-5xl mb-0 text-right 1024px:mb-4">{this.state.subTotal > 0 ? this.formatPrice(this.state.subTotal) : "-" + this.formatPrice(Math.abs(this.state.subTotal))}</div>
                  </div>
                 {/* Perhaps come back to this when we want to introduce a streak mulitplier */}
                  {/* <div>Streak: {this.state.streak}</div> */}
                  <div className="w-full bg-white-25 rounded-full h-2">
                    <div className="rounded-full h-2 bg-white" style={{"width" : (this.state.successes/(this.state.successes + this.state.fails))*100 + "%"}}></div>
                  </div>
                  <div className="flex w-full">
                  <div className="flex my-2 w-3/4 1024px:my-4 text-black">
                    <div className={`w-4 1024px:w-8 h-4 1024px:h-8 rounded-full mr-1 shadow-inner flex content-center justify-center items-center overflow-hidden ${this.state.fails > 0 ? "bg-red" : "bg-white-25"}`}>
                      {this.state.fails > 0 &&
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 1024px:w-12 fill-black-25 inline-block">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z"/>
                      </svg>
                      }
                    </div>
                    <div className={`w-4 1024px:w-8 h-4 1024px:h-8  rounded-full mr-1 shadow-inner flex content-center justify-center items-center overflow-hidden ${this.state.fails > 1 ? "bg-red" : "bg-white-25"}`}>
                      {this.state.fails > 1 &&
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 1024px:w-12 fill-black-25 inline-block">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z"/>
                      </svg>
                      }
                    </div>
                    <div className={`w-4 1024px:w-8 h-4 1024px:h-8 rounded-full shadow-inner flex content-center justify-center items-center overflow-hidden ${this.state.fails > 2 ? "bg-red" : "bg-white-25"}`}>
                      {this.state.fails > 2 &&
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 1024px:w-12 fill-black-25 inline-block">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z"/>
                      </svg>
                      }
                    </div>
                  </div>
                    <div className="mt-1 text-right w-1/4">{this.state.successes} / {this.state.successes + this.state.fails}</div>
                  </div>
                </div>
                <div>
                  {this.state.showEndGameButton  &&
                    <button onClick={(e)=> {e.preventDefault();this.showEndGame()}} className="mt-2 1024px:mt-4 rounded bg-green text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">Show Results</button>
                  }
                  {this.state.showNextButton &&
                    <button onClick={(e)=> {e.preventDefault();this.showNext()}} className="mt-2 1024px:mt-4 rounded bg-green text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">Next</button>
                  }
                  </div>
                </div>
              </div>
            </div>
          }

          {this.state.showEndGame &&
          <div className={`relative z-10 grid h-screen mt-4 1024px:mt-0 place-content-center w-full flex justify-center text-center transition-opacity duration-250 ${this.state.showEndGame ? "opacity-100" : "opacity-0"}`}>
            <div className="rounded-xl bg-black-75 p-2 1024px:p-4">
              <div className="rounded-xl bg-black py-4 px-8 text-white text-left w-[50vw] text-center">
                  <div className="text-3xl 1024px:text-7xl text-pink mb-2">{this.state.subTotal > 0 ? "Congratulations!" : "Sorry!"}</div>
                  {!this.state.saved &&
                    <div>
                      <div className="text-xl 1024px:text-3xl mb-4"><span className="text-red">You</span> <span className="text-gold">pika</span> <span className="text-green">chose</span> correctly {this.state.successes} times and {this.state.subTotal > 0 ? " won " : " lost "} {this.formatPrice(Math.abs(this.state.subTotal))}!</div>
                      {this.state.subTotal > 0 &&
                        <div className="my-4 1024px:my-8">
                          <input onChange={(e) => {e.preventDefault();this.setInitials(e)}} className="w-full text-xl 1024px:text-3xl rounded uppercase p-2 text-center bg-white-25" placeholder="Enter Your Intials" maxLength={3} minLength={3} value={this.state.initials}></input>
                          <button onClick={(e)=> {e.preventDefault();this.saveScore()}} className="mt-2 mb-2 1024px:mt-4 rounded bg-pink text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">Save Highscore</button>
                          {this.state.profane &&
                            <div className="">This a kids game... {"(ಠ_ಠ)"}</div>
                          }
                        </div>
                      }
                    </div>
                  }

                  {this.state.saved &&
                    <div>
                      <div className="text-xl 1024px:text-3xl mb-4">Your score has been saved. View the leaderboard!</div>
                      <Link to="/leaderboard" className="mt-2 mb-2 inline-block 1024px:mt-4 rounded bg-pink text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">View Leaderboard</Link>
                    </div>  
                  }
                  {this.state.showRetryButton &&
                    <button onClick={(e)=> {e.preventDefault();this.retry()}} className="1024px:mt-4 rounded bg-green text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">Try Again</button>
                  }
              </div>
            </div>
          </div>
          }

          <div className={`absolute top-4 left-0 flex h-screen w-full justify-center items-center pointer-events-none ${this.state.showCards ? "opacity-100" : "opacity-0"}`}>
          {this.state.card1 &&
            <div onClick={(e) => {e.preventDefault();this.chooseCard(1)}} className="h-auto max-w-[25vw] 1024px:max-w-[33vw] -rotate-[5deg] pl-6 transition duration-100 hover:cursor-pointer hover:scale-110 hover:-rotate-[3deg] pointer-events-auto">
              <div className="rounded-xl overflow-hidden">
              <img src={this.state.card1.image} alt={this.state.card1.name}/>
              </div>
              {this.state.showPrices &&
                <div className="absolute -bottom-4 -right-4 w-full flex justify-end">
                  <div className={`text-black text-center w-auto p-2 1024px:p-4 rounded-xl bg-gold ${this.state.card1.price > this.state.card2.price ? "text-2xl 1024px:text-4xl font-bold" : "text-lg 1024px:text-xl" }`}>{this.formatPrice(this.state.card1.price)}</div>
                </div>
              }
            </div>
          }
          <div className="w-[33vw]"></div>
          {this.state.card2 &&
            <div onClick={(e) => {e.preventDefault();this.chooseCard(2)}} className="h-auto max-w-[25vw] 1024px:max-w-[33vw] rotate-[5deg] pr-6 transition duration-100 hover:cursor-pointer hover:scale-110 hover:rotate-[3deg] pointer-events-auto">
              <div className="rounded-xl overflow-hidden">
                <img src={this.state.card2.image} alt={this.state.card2.name}/>
              </div>
              {this.state.showPrices &&
                <div className="absolute -bottom-4 -left-4 w-full flex justify-start">
                  <div className={`text-black text-center w-auto p-2 1024px:p-4 rounded-xl bg-gold ${this.state.card1.price < this.state.card2.price ? "text-2xl 1024px:text-4xl font-bold" : "text-lg 1024px:text-xl" }`}>{this.formatPrice(this.state.card2.price)}</div>
                </div>
              }
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Index;