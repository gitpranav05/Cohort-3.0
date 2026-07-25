import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <div className="text-4xl flex items-center w-screen h-screen justify-center">
    <div>

    Todo Application
  <br />
  <Link className="text-md border m-2" href={"auth/signin"}> Sign in</Link>
  <br />
  <Link className="text-md border m-2" href={"auth/signup"}> Sign up</Link>
    </div>

  </div>;
}
