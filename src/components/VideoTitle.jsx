const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-white bg-gradient-to-r from-black/80 via-black/50 to-transparent px-6 md:px-16 lg:px-24 pb-16">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight drop-shadow-lg">
        {title}
      </h1>

      {/* Overview */}
      <p className="mt-4 text-sm sm:text-base md:text-lg max-w-md md:max-w-lg lg:max-w-xl text-gray-200 drop-shadow-md line-clamp-3">
        {overview}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap mt-6 space-x-2 sm:space-x-4">
        {/* Play Button */}
        <button className="hidden md:block flex items-center space-x-2 bg-white text-black font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-neutral-100 transition">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72v368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1L91.2 36.9z"/>
          </svg>
          <span>Play</span>
        </button>

        {/* More Info Button */}
        <button className="hidden md:block flex items-center space-x-2 bg-gray-500/30 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-gray-400 hover:bg-gray-500/50 transition">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M256 48a208 208 0 1 1 0 416a208 208 0 1 1 0-416zm0 64a24 24 0 1 0 0 48a24 24 0 1 0 0-48zm-40 104v32h24v104h32V216h-56z" />
          </svg>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
