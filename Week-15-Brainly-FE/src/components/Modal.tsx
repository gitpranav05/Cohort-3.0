import Cross from "../icons/Cross";
import { Button } from "./Button";
import { Input } from "./Input";

export function Modal({ open, onClose }) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-400/50 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="bg-white opacity-100 p-4 rounded-2xl">
              <div
                onClick={onClose}
                className="flex justify-end bg-red-400 rounded-3xl ml-62 p-1"
              >
                <Cross size="lg" />
              </div>
              <div className=" flex flex-col pt-2 p-6">
                <Input onChange={() => {}} placeholder={"Title"} />
                <Input onChange={() => {}} placeholder={"Link"} />
                <Input onChange={() => {}} placeholder={"Type"} />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" text="Submit" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


