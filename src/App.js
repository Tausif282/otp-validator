import { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  let OTP_DIGIT_COUNT = 5;
  const [inputArray, setInputArray] = useState(
    new Array(OTP_DIGIT_COUNT).fill("")
  );

  const refArr = useRef([]);

  const handleChange = (e, Index) => {
    if (isNaN(e.target.value)) return;

    let newArr = [...inputArray];
    newArr[Index] = e.target.value?.slice(-1);
    setInputArray(newArr);

    e.target.value && refArr.current[Index + 1]?.focus();
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleBackSpaceKey = (e, Index) => {
    if (!e.target.value && e.key == "Backspace")
      refArr.current[Index - 1]?.focus();
  };

  return (
    <div className="App">
      <h1>VALIDATE OTP</h1>
      <div>
        {inputArray.map((value, Index) => {
          return (
            <input
              className="otpInput"
              value={inputArray[Index]}
              key={Index}
              onChange={(e) => handleChange(e, Index)}
              ref={(el) => (refArr.current[Index] = el)}
              onKeyDown={(e) => handleBackSpaceKey(e, Index)}
            />
          );
        })}
      </div>
    </div>
  );
}
