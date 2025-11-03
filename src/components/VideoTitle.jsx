const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[12%] px-24 absolute text-white bg-linear-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex">
        <button className="mx-2 px-6 py-3 bg-white text-black border-2 border-black rounded-xl flex items-center space-x-3 hover:bg-neutral-50/50">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/>
          </svg>
          <span className="font-semibold">Play</span>
        </button>

        <button className="mx-2 px-6 py-3 bg-gray-300/30 hover:bg-gray-300/50 text-white border-2 border-black rounded-xl">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
