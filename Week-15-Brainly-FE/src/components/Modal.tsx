/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import Cross from "../icons/Cross";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Link = "link",
  Document = "document"
}

export function Modal({ open, onClose }) {
  const titleRef = useRef<any>();
  const linkRef = useRef<any>();

  const [type, setType] = useState(ContentType.Youtube)

  async function subHandler() {
    try {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      const respo = await axios.post(
        BACKEND_URL + "/api/v1/content",
        {
          title,
          link,
          type,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      console.log("SUCCESS:", respo.data);

      onClose();
    } catch (err: any) {
      console.log("ERROR FULL:", err);

      // 🔥 Most important line
      console.log("BACKEND ERROR:", err.response?.data?.msg);

      console.log("STATUS:", err.response?.status);
      console.log("HEADERS:", err.response?.headers);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-400/50 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="bg-white opacity-100 p-4 rounded-2xl">
              <div
                onClick={onClose}
                className="flex justify-end bg-red-400 rounded-3xl ml-82 p-1"
              >
                <Cross size="lg" />
              </div>
              <div className=" flex flex-col pt-2 px-6">
                <Input  ref={titleRef} placeholder={"Title"} />
                <Input  ref={linkRef} placeholder={"Link"} />
              </div>
              <div className="">
                <h1 className="text-center font-semibold text-xl p-2">Type</h1>
                <div className="flex justify-between gap-2 ">
                  <Button className="transition-all duration-150" text="YouTube" size="sm" variant={type === ContentType.Youtube? "primary" : "secondary"} onClick={()=>{setType(ContentType.Youtube)}} />
                  <Button className="transition-all duration-150" text="Twitter" size="sm" variant={type === ContentType.Twitter? "primary" : "secondary"} onClick={()=>{setType(ContentType.Twitter)}} />
                  <Button className="transition-all duration-150" text="Link" size="sm" variant={type === ContentType.Link? "primary" : "secondary"} onClick={()=>{setType(ContentType.Link)}} />
                  <Button className="transition-all duration-150" text="Document" size="sm" variant={type === ContentType.Document? "primary" : "secondary"} onClick={()=>{setType(ContentType.Document)}} />
                </div>
              </div>
              <div className="flex justify-center p-2">
                <Button
                  onClick={subHandler}
                  variant="primary"
                  size="md"
                  text="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
