import { createContext, useContext, useState } from "react";

const BulbContext = createContext();

function App() {
  const [bulbOn, setBulbOn] = useState();

  return (
    <div>
      <BulbContext.Provider value={{
        bulbOn:bulbOn,
        setBulbOn:setBulbOn
      }}>
        <Light />
      </BulbContext.Provider>
    </div>
  );
}

function Light() {
  return (
    <div>
      <LightBulb/>
      <LightSwitch/>
    </div>
  );
}

function LightBulb() {
    const {bulbOn} = useContext(BulbContext);
  return (
    <div>
      {bulbOn ? (
        <img src="https://www.w3schools.com/js/pic_bulboff.gif"></img>
      ) : (
        <img src="https://www.w3schools.com/js/pic_bulbon.gif"></img>
      )}
    </div>
  );
}

function LightSwitch() {
    const {bulbOn, setBulbOn} = useContext(BulbContext);

  function toggle() {
    setBulbOn(!bulbOn);
  }
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;
