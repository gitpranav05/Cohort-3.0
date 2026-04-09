import Dust from "../icons/Dust";
import Linked from "../icons/Linked";
import Notes from "../icons/Notes";
import { Share } from "../icons/Share";
import Twitter from "../icons/Twitter";
import { You } from "../icons/You";

interface CardProps{
    title: string,
    link : string,
    type : "twitter" | "youtube"
}


function Card({title, link, type}: CardProps) {
  const Icon = {
    "twitter":<Twitter size="lg"/>,
    "youtube":<You size="lg"/>,
    "link":<Linked size="lg"/>,
    "document":<Notes size="lg"/>
  }
  return (
    <div>
      <div className="bg-white rounded-md shadow-md w-72 border-gray-200 border p-2 m-2  max-w-96">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <div className="text-gray-400">
              {Icon[type]}
            </div>
            <h1 className="pl-2">{title}</h1>
          </div>
          <div className="flex gap-3 items-center text-gray-400">
            <div onClick={()=>{
              navigator.clipboard.writeText(link);
            }}>
              <Share size="lg" />
            </div>
            <Dust size="lg" />
          </div>
        </div>
        {/* <h1 className="font-semibold  text-xl">Future Projects</h1> */}
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={`${link}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x","twitter")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
