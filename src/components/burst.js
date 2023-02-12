import * as React from "react"
const BurstComponent = () => {

  return (
    <div className="grid h-screen place-content-center mt-8 768px:mt-0">
      <div className={`relative text-center`}>
        <div className={`bg-black w-[200px] h-[200px] inline-block relative text-center animate-spin-slow`}>
          <div className={`bg-black absolute top-0 left-0 w-[200px] h-[200px] rotate-[60deg]`}></div>
          <div className={`bg-black absolute top-0 left-0 w-[200px] h-[200px] rotate-[30deg]`}></div>
        </div>
        <div className={`bg-black w-[200px] h-[200px] inline-block top-0 left-0 absolute animate-ping-slow`}>
          <div className={`bg-black absolute top-0 left-0 w-[200px] h-[200px] rotate-[60deg]`}></div>
          <div className={`bg-black absolute top-0 left-0 w-[200px] h-[200px] rotate-[30deg]`}></div>
        </div>
        
        <div className="absolute top-2 left-0 right-0 z-10 text-white font-bold text-9xl leading-normal -rotate-[5deg]">VS</div>
      </div>
    </div>
  )
};

export default BurstComponent;