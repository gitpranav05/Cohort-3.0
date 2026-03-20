
function Button({
    disabled,
    children,
    onClick
}) {
  return (
    <div
      onClick={onClick}
      className={` flex justify-center-safe text-white transition duration-300 hover:bg-[#40decf]   rounded-2xl py-4 px-27 hover:cursor-pointer ${disabled ? "bg-[#88a6b5]" : "bg-green-400"}`}
    >
      {children}
    </div>
  );
}

export default Button