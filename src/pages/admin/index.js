import * as React from "react"
import { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, connectFirestoreEmulator, setDoc, doc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Link } from "gatsby"
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
      availableSets: [],
      sets: []
    }
  }

  componentDidMount = async () => {
    if(typeof window !== undefined) {
      if (location.hostname === "localhost") {
        connectFirestoreEmulator(db, "localhost", 5003);
      }
    }
    this.getAvailableSets()
  }

  getAvailableSets = async () => {
    const setsSnapshot = await getDocs(collection(db, "availableSets"));
    let availableSetsArray = []
      setsSnapshot.docs.map((set) => {
        availableSetsArray.push(set.data());
        this.setState({availableSets: availableSetsArray});
      });
  }

  formatDate = (date) => {
    return date.split(" ")[0]
  }

  render() {
    return (
      <div className="relative bg-black text-white pb-4 px-4">
         <div className="grid grid-cols-12 gap-4 w-full font-bold border-b bg-black border-white-25 mb-2 py-2 sticky top-0">
            <div>ID</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Series</div>
            <div>Total</div>
            <div>Standard</div>
            <div>Expanded</div>
            <div>Unlimited</div>
            <div>Released</div>
            <div>Updated</div>
            <div>Fetched</div>
          </div>
        {this.state.availableSets.map((availableSet, index) => (
          <div className="grid grid-cols-12 gap-4 w-full">
            <div>
              {availableSet.id}    
            </div>
            <div className="col-span-2">
              {availableSet.name}    
            </div>
            <div className="col-span-2">
              {availableSet.series}    
            </div>
            <div>
              {availableSet.total}    
            </div>
            <div>
              {availableSet.standard ? "👍" : ""}    
            </div>
            <div>
              {availableSet.expanded? "👍" : ""}    
            </div>
            <div>
              {availableSet.unlimited ? "👍" : ""}    
            </div>
            <div>
              {availableSet.releaseDate}    
            </div>
            <div>
              {this.formatDate(availableSet.updatedAt)}
            </div>
            <div>
              {this.formatDate(availableSet.lastFetched)}
            </div>
          </div>
        )
        )}
      </div>
    );
  }
}

export default Index;