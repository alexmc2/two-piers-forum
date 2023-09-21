import React from 'react'

export default function MainNav({ setActiveDiv, activeDiv }) {
  return (
    <nav className="bg-black flex flex-col items-center py-3 z-10">
      <button
        onClick={() => {
          setActiveDiv('dm')
        }}
        type="button"
        className={
          activeDiv === 'dm'
            ? 'group w-12 h-12 flex justify-center items-center bg-button-initial rounded-[15px] transition-all duration-75'
            : 'group w-12 h-12 flex justify-center items-center bg-main-gray rounded-full hover:bg-button-initial hover:rounded-[15px] transition-all duration-75'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5em"
          viewBox="0 0 576 512"
        >
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
        </svg>

        <div className="m850:hidden group-hover:scale-100 hover:hidden absolute w-auto px-3 py-2 m-2 h-10 min-w-max left-[70px] rounded-md shadow-md text-overlay-text bg-black text-base font-semibold transition-all duration-75 scale-0 origin-left z-10">
          <div>Direct messages</div>
          <div className="relative bottom-[17px] right-[22px] w-[10px] border-transparent border-[5px] border-r-black"></div>
        </div>
      </button>

      <div className="w-8 h-0.5 bg-gray-6 my-2"></div>

      <button
        onClick={() => {
          setActiveDiv('server')
        }}
        type="button"
        className={
          activeDiv === 'server'
            ? 'group w-12 h-12 flex justify-center items-center bg-button-initial text-white rounded-[15px] transition-all duration-75'
            : 'group text-white w-12 h-12 flex justify-center items-center bg-main-gray rounded-full hover:bg-button-initial hover:rounded-[15px] transition-all duration-75'
        }
      >
        <p>S</p>

        <div className="m850:hidden group-hover:scale-100 hover:hidden absolute w-auto px-3 py-2 m-2 h-10 min-w-max left-[70px] rounded-md shadow-md text-overlay-text bg-black text-base font-semibold transition-all duration-75 scale-0 origin-left z-10">
          <div>Server</div>
          <div className="relative bottom-[17px] right-[22px] w-[10px] border-transparent border-[5px] border-r-black"></div>
        </div>
      </button>
    </nav>
  )
}
