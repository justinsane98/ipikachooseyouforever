import logo from './logo.svg';
import './App.css';
import ParticleComponent from './components/particles';
import BurstComponent from './components/burst';

function App() {
  return (
    <div className="h-screen relative">
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

    </div>
  );
}

export default App;
