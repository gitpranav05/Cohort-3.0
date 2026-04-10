import axios from "axios";
import Dust from "../icons/Dust";
import Linked from "../icons/Linked";
import Notes from "../icons/Notes"; 
import Twitter from "../icons/Twitter";
import { You } from "../icons/You";
import { BACKEND_URL } from "../config";
import Copy from "../icons/Copy";
import toast from "react-hot-toast";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  divId: string;
  shared?: boolean;
}

function Card({ title, link, type, divId, shared }: CardProps) {
  const Icon = {
    twitter: <Twitter size="lg" />,
    youtube: <You size="lg" />,
    link: <Linked size="lg" />,
    document: <Notes size="lg" />,
  };
  const contentId: string = divId;

  async function delHandler() {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: {
          contentId: contentId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(response);
      toast.success("Card deleted successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="bg-white rounded-md shadow-md w-70 border-gray-200 border p-2 m-2  max-w-96">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <div className="text-gray-400">{Icon[type]}</div>
            <h1 className="pl-2">{title}</h1>
          </div>
          <div className="flex gap-3 items-center text-gray-400">
            <div
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
            >
              {/* <Share size="lg" /> */}
              <Copy size="lg"/>
            </div>
            {!shared && (
              <div onClick={delHandler}>
                <Dust size="lg" />
              </div>
            )}
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
              <a
                href={link.replace("x", "twitter") + "?ref_src=twsrc%5Etfw"}
              ></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
