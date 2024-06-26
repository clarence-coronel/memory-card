export default function Card({ img, background, displayName, action }) {
  return (
    <button
      onClick={() => action(displayName)}
      className="max-w-[400px] mx-auto rounded-lg overflow-hidden"
    >
      <div className="hover:bg-red-500 rounded-lg p-2 hover:cursor-pointer duration-200 group relative bg-red-400">
        <img
          className="group-hover:scale-75 duration-500 z-10 w-full h-full left-0 top-0 absolute object-contain"
          src={background}
          alt="background"
        />
        <img
          className="aspect-[2/3] group-hover:scale-150 duration-500 z-20 relative object-contain"
          src={img}
          alt={displayName}
        />
      </div>
    </button>
  );
}
