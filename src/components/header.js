import * as React from "react"
import {Link} from "gatsby"

const HeaderComponent = () => {

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-10 p-2 text-center">
      <Link to="/" className="group text-lg font-black inline-block tracking-[0.25em]"><span className="text-pink group-hover:text-white transition-all duration-250">I</span> <span className="text-gold group-hover:text-white transition-all duration-250">PIKA</span> <span className="text-green group-hover:text-white transition-all duration-250">CHOOSE</span> <span className="text-blue group-hover:text-white transition-all duration-250">YOU</span></Link>
      <Link to="/leaderboard" className="group absolute top-0 left-0 py-3 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 fill-white-50 group-hover:fill-white transition-all duration-250">
          <path d="M176.9 48c6.4 160.7 44.3 231.4 71.8 261.7c13.7 15.1 25.9 21.4 33.1 24.1c2.6 1 4.7 1.5 6.1 1.9c1.4-.3 3.5-.9 6.1-1.9c7.2-2.7 19.4-9 33.1-24.1c27.5-30.3 65.5-101 71.8-261.7H176.9zM176 0H400c26.5 0 48.1 21.8 47.1 48.2c-.2 5.3-.4 10.6-.7 15.8H552c13.3 0 24 10.7 24 24c0 108.5-45.9 177.7-101.4 220.6c-53.9 41.7-115.7 57.6-149.5 63.7c-4.7 2.5-9.1 4.5-13.1 6.1V464h80c13.3 0 24 10.7 24 24s-10.7 24-24 24H288 184c-13.3 0-24-10.7-24-24s10.7-24 24-24h80V378.4c-4-1.6-8.4-3.6-13.1-6.1c-33.8-6-95.5-22-149.5-63.7C45.9 265.7 0 196.5 0 88C0 74.7 10.7 64 24 64H129.6c-.3-5.2-.5-10.4-.7-15.8C127.9 21.8 149.5 0 176 0zM390.8 302.6c18.1-8 36.8-18.4 54.4-32c40.6-31.3 75.9-80.2 81.9-158.6H442.7c-9.1 90.1-29.2 150.3-51.9 190.6zm-260-32c17.5 13.6 36.3 24 54.4 32c-22.7-40.3-42.8-100.5-51.9-190.6H48.9c6 78.4 41.3 127.3 81.9 158.6zM295.2 102.5l14.5 29.3c1.2 2.4 3.4 4 6 4.4l32.4 4.7c6.6 1 9.2 9 4.4 13.6l-23.4 22.8c-1.9 1.8-2.7 4.5-2.3 7.1l5.5 32.2c1.1 6.5-5.7 11.5-11.6 8.4l-29-15.2c-2.3-1.2-5.1-1.2-7.4 0l-29 15.2c-5.9 3.1-12.7-1.9-11.6-8.4l5.5-32.2c.4-2.6-.4-5.2-2.3-7.1l-23.4-22.8c-4.7-4.6-2.1-12.7 4.4-13.6l32.4-4.7c2.6-.4 4.9-2 6-4.4l14.5-29.3c2.9-5.9 11.4-5.9 14.3 0z"/>
        </svg>
      </Link>
      <Link to="/game" className="group absolute top-0 right-0 py-3 px-4 inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-6 fill-white-50 group-hover:fill-white transition-all duration-500">
          <path d="M7.468 194.9C-7.906 168.2 1.218 134.2 27.85 118.8L220.7 7.468C247.3-7.906 281.4 1.218 296.8 27.85L463.8 317.1C479.1 343.8 470 377.8 443.4 393.2L250.5 504.5C223.9 519.9 189.9 510.8 174.5 484.2L7.468 194.9zM49.04 170.9L216.1 460.2C218.2 463.8 222.9 465.1 226.5 462.1L419.4 351.6C423.1 349.5 424.3 344.8 422.2 341.1L255.2 51.85C253.1 48.18 248.4 46.92 244.7 49.04L51.85 160.4C48.18 162.5 46.92 167.2 49.04 170.9H49.04zM491.5 301.1L354.7 64.25C356.5 64.08 358.2 63.1 360 63.1H584C614.9 63.1 640 89.07 640 119.1V456C640 486.9 614.9 512 584 512H360C346.4 512 333.8 507.1 324.1 498.1L459.4 420.9C501.3 396.7 515.7 343.1 491.5 301.1L491.5 301.1z"/>
        </svg>
      </Link>
    </header>
  )
};

export default HeaderComponent;