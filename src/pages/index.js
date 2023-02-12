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
      loading: true
    }
  }
  componentDidMount = async () => {
    if(typeof window !== undefined) {
      if (location.hostname === "localhost") {
        connectFirestoreEmulator(db, "localhost", 5003);
      }
    }
    this.setState({
      loading: false
    })
  
    logEvent(analytics, 'welcome', {
      id: "public"
    });

  }


  render() {
    return (
      <div className="h-screen relative overflow-hidden bg-black">
        <ParticleComponent/>
        <div className={`transition-opacity duration-250 ${this.state.loading ? "opacity-0" : "opacity-100"}`}>
          <div className="relative z-10 grid h-screen place-content-center w-full flex justify-center text-center">
            <div className="rounded-xl bg-black-75 p-2 1024px:p-4">
              <div className="rounded-xl bg-black py-4 px-8 768px:py-8 text-white text-left w-[75vw] 1024px:w-[50vw] text-center">
                  <div className="text-5xl 1024px:text-7xl text-center font-black mx-auto tracking-[0.25em]"><span className="text-pink">I</span> <span className="text-gold">PIKA</span> <span className="text-green 1024px:block">CHOOSE</span> <span className="text-blue 1024px:block">YOU</span></div>
                  <div className="text-xl 1024px:text-2xl text-white mb-2">Pick the most valuable cards to become the best Pokémon trader of all time.</div>
                  <Link to="/game" className="mt-2 mb-2 inline-block 1024px:mt-4 rounded bg-pink text-xl 1024px:text-3xl text-black font-bold px-4 py-2 w-full transition-all hover:scale-110">Start Game</Link>
              </div>
            </div>
            <div className="text-sm mt-4 text-black w-[75vw] 1024px:w-[50vw] mx-auto">This website is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company. Powered by the <a className="underline" href="https://pokemontcg.io/">Pokémon TCG API</a>.</div>
          </div>
         </div>
      </div>
    );
  }
}

export default Index;