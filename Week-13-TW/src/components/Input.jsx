export const Input = ({
    type,
    children
})=>{
    return (
      <div>
        <input
          className="bg-[#124670] text-xl flex justify-center focus:ring-2 focus:ring-[#40decf] text-white placeholder:text-gray-400 rounded-2xl px-8 py-4 focus:outline-none"
          type={type}
          placeholder={children}
        />

        {/* <input
            type="text"
            placeholder="Your Birth Year"
            className="appearance-none text-xl text-white bg-[#124670] rounded-2xl px-8 py-4 
  focus:outline-none focus:ring-2 focus:ring-[#40decf] 
  placeholder:text-gray-400 "
          /> */}
      </div>
    );
}