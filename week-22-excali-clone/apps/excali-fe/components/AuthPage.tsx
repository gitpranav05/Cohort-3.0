"use client";

function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-5 gap-2 bg-gray-400 flex flex-col rounded-2xl">
        <input className=" outline-0" type="email" placeholder="E-Mail" />
        <input className=" outline-0"  type="password" placeholder="Password" />

        <button className="cursor-pointer bg-white py-1 text-gray-400 rounded-2xl" onClick={() => {}}>
          {isSignin ? "Sign in" : "Sign up"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
