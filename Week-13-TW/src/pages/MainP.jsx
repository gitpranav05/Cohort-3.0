import { Otp } from "../components/Otp"


function MainP() {
  return (
    <>
          <div className="min-h-screen bg-[#012f63] flex flex-col items-center">
            <div className="font-mono text-4xl flex py-30">
              <h1 className="text-[#40decf]">Webinar</h1>
              <h1 className="text-white">.gg</h1>
            </div>
    
            <div>
              <h1 className="text-white text-4xl font-bold">Verify your age</h1>
            </div>
    
            <div className="py-20 flex flex-col gap-8 items-center">
              <h1 className="text-gray-400">
                Please confirm your birth year. This data will not be stored.
              </h1>
    
              {/* <Input type="text">Your Birth Year</Input>
    
              <Button disabled={true}>Continue</Button> */}
    
                <Otp/>
    
              {/* <input
                type="text"
                placeholder="Your Birth Year"
                className="appearance-none text-xl text-white bg-[#124670] rounded-2xl px-8 py-4 
      focus:outline-none focus:ring-2 focus:ring-[#40decf] 
      placeholder:text-gray-400 "
              /> */}
    
              {/* <button className="bg-[#88a6b5] text-white text-xl rounded-2xl py-4  hover:cursor-pointer hover:bg-[#40decf]  transition duration-300">
                Continue
              </button> */}
            </div>
          </div>
        </>
  )
}

export default MainP