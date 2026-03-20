import { useRef, useState } from "react";
import Button from "./Button";

export const Otp = () => {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [enabled, setEnabled] = useState(true);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move forward
    if (value && index < 5) {
      refs[index + 1].current.focus();
    }

    // Enable button if all filled
    if (newOtp.every((d) => d !== "")) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        refs[index - 1].current.focus();
      }

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={refs[index]}
            value={digit}
            maxLength="1"
            type="text"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="bg-[#88a6b5] text-center text-[#ebfffd] rounded-xl font-bold w-10 h-12 focus:outline-[#40decf]"
          />
        ))}
      </div>

      <Button disabled={enabled}>SignUp</Button>
    </div>
  );
};
