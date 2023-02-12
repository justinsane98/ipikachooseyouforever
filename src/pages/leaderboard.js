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
import ConvertDateToUsString from "../components/convertDateToUsString"


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
      loading: true,
      leaderboard: []
    }
  }
  componentDidMount = async () => {
    if(typeof window !== undefined) {
      if (location.hostname === "localhost") {
        connectFirestoreEmulator(db, "localhost", 5003);
      }
    }
    let leaderboardArray = this.state.leaderboard;
    const leaderboardSnapshot = await getDocs(collection(db, "leaderboard"));
    leaderboardSnapshot.docs.map((leader) => {
      leaderboardArray.push(leader);
    });
    
    const sortedLeaderboardArray = leaderboardArray.sort((a,b) => b.data().total - a.data().total)
    this.setState({leaderboard: sortedLeaderboardArray});

    this.setState({loading: false});
  
    logEvent(analytics, 'viewLeaderboard', {
      id: "public"
    });

  }

  formatPrice = (price) => {
    return "$" + price.toFixed(2)
  }

  render() {
    return (
      <div className="h-screen relative overflow-hidden bg-black">
        <ParticleComponent/>
        <HeaderComponent/>

        <div className={`transition-opacity duration-250 ${this.state.loading ? "opacity-0" : "opacity-100"}`}>
            <div className="relative grid h-screen mt-4 1024px:mt-0 place-content-center w-full flex justify-center text-center transition-opacity duration-250">
              <div className="rounded-xl bg-black-75 p-2 1024px:p-4">
                <div className="rounded-xl bg-black 1024px:py-4 px-2 1024px:px-8 text-white text-left w-[75vw] 1024px:w-[50vw]">
                  <div className="text-3xl 1024px:text-7xl text-pink mb-2 text-center">Leaderboard</div>
                  <div className="flex w-full text-xl 1024px:text-3xl border-b border-white-25 1024px:mb-2 1024px:pb-2">
                    <div className="w-1/4 text-left">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-white w-3 1024px:w-4 inline-block">
                          <path d="M144 128H304v16c0 44.2-35.8 80-80 80s-80-35.8-80-80V128zm0-108.8l-.1-.1c-.3-.2-.6-.4-.8-.6L140 16 124.4 3.5C121.5 1.2 118 0 114.4 0H112c-8.8 0-16 7.2-16 16V39v3.2 .1V144c0 70.7 57.3 128 128 128s128-57.3 128-128V42.3v-.1V39 16c0-8.8-7.2-16-16-16h-2.4c-3.6 0-7.2 1.2-10 3.5L308 16l-3 2.4c-.3 .2-.6 .4-.8 .6l-.1 .1c-10.2 7.5-23.8 8.3-34.9 2L238.9 4c-4.6-2.6-9.7-4-14.9-4s-10.4 1.4-14.9 4L178.9 21.2c-11 6.3-24.7 5.5-34.9-2zM168 352H280c63.6 0 115.6 49.5 119.7 112H48.3c4.1-62.5 56.2-112 119.7-112zm0-48C75.2 304 0 379.2 0 472v8c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32v-8c0-92.8-75.2-168-168-168H168z"/>
                        </svg>
                      </div>
                    <div className="w-1/4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white w-4 1024px:w-5 inline-block"> 
                        <path d="M218.7 152h74.6l13.8 8.8C361.1 195.4 464 277 464 416c0 26.5-21.5 48-48 48H96c-26.5 0-48-21.5-48-48c0-139 102.9-220.6 156.9-255.2l13.8-8.8zM286 104H226l-7.5-10.8L187.4 48H324.6L293.5 93.2 286 104zM150.8 139.9C89.4 185.5 0 274.8 0 416c0 53 43 96 96 96H416c53 0 96-43 96-96c0-141.2-89.4-230.5-150.8-276.1c-10.4-7.7-20-14.2-28.2-19.4l27.3-39.5 29.8-43.2C401 21.7 389.6 0 370.3 0H141.7C122.4 0 111 21.7 121.9 37.6l29.8 43.2L179 120.4c-8.2 5.3-17.8 11.7-28.2 19.4zM276 216c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/>
                      </svg>
                      </div>
                    <div className="w-1/4 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-white w-3 1024px:w-4 inline-block">
                        <path d="M211.8 339.8C200.9 350.7 183.1 350.7 172.2 339.8L108.2 275.8C97.27 264.9 97.27 247.1 108.2 236.2C119.1 225.3 136.9 225.3 147.8 236.2L192 280.4L300.2 172.2C311.1 161.3 328.9 161.3 339.8 172.2C350.7 183.1 350.7 200.9 339.8 211.8L211.8 339.8zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96z"/>
                      </svg>
                    </div>
                      <div className="w-1/4 text-right">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white w-4 1024px:w-5 inline-block"> 
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM280 120V248.7l60 90c7.4 11 4.4 25.9-6.7 33.3s-25.9 4.4-33.3-6.7l-64-96c-2.6-3.9-4-8.6-4-13.3V120c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
                        </svg>
                      </div>
                    </div>
                  <div className="h-[33vh] 1024px:h-[50vh] overflow-auto">
                    {this.state.leaderboard.map((leader, index) =>
                      <div className="flex w-full text-xl 1024px:text-3xl">
                        <div className="w-1/4 text-left">{index+1}. {leader.data().initials}</div>
                        <div className="w-1/4">{this.formatPrice(leader.data().total)}</div>
                        <div className="w-1/4 text-center">{leader.data().successes}</div>
                        <div className="w-1/4 text-right">{ConvertDateToUsString(new Date(leader.data().date))}</div>
                      </div>
                    )}
                  </div>
                  <Link to="/game" className=" text-center mt-2 mb-2 inline-block 1024px:mt-4 w-full rounded bg-pink text-xl 1024px:text-3xl text-black font-bold px-4 py-2 transition-all hover:scale-110">Start New Game</Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Index;