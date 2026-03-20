export const Navbar = () => {
  return (
    <div className="bg-[#40decf] py-3 px-30 flex justify-between text-[#11504e]">
      <h1 className="text-3xl font-bold   ">Pranav</h1>

      <div className="flex gap-8 items-center font-bold">
        <a href="">
          {" "}
          <h1>About</h1>
        </a>
        <a href="">
          {" "}
          <h1>Contact</h1>
        </a>
        <a href="">
          {" "}
          <h1>Services</h1>
        </a>
        <a href="" className="text-white bg-[#0ebeb0] px-5 py-1 rounded-full">
          {" "}
          <h1>Buy Now</h1>
        </a>
      </div>
    </div>
  );
};
