export default function Card({ img, background, displayName }) {
  return (
    <div className="max-w-[300px] mx-auto rounded-md overflow-hidden">
      <div className="hover:bg-red-500 hover:cursor-pointer duration-200 group relative bg-red-400">
        <img
          className="group-hover:scale-90 duration-500 z-10 w-full h-full left-0 top-0 absolute object-contain"
          src={background}
          alt="background"
        />
        <img
          className="aspect-[2/3] group-hover:scale-125 duration-500 z-50 relative object-contain"
          src={img}
          alt={displayName}
        />
      </div>
    </div>
  );
}
