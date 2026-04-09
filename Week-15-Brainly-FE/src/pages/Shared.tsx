import axios from "axios";
import { BACKEND_URL } from "../config";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";


function Shared() {

    const [contents, setContents] = useState([]);

    const hash = "64db28db76";


    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/brain/${hash}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setContents(response.data.content);
        });
    });


  console.log(contents);
  return (
    <div>
      <Sidebar />
      <div className="flex flex-wrap py-5  bg-[#cecbff] min-h-screen ml-76">
        {contents.map(({ type, link, title, _id }) => (
          <div>
            <Card
              title={title}
              type={type}
              link={link}
              divId={_id}
              shared={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shared;
