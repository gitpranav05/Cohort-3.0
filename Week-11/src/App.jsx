import { useState } from "react";
// import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";

export default function App(){
  const [state, setState] = useState(0);
  const prev = usePrev(state);

  return (
    <>
      <p>{state}</p>
      <button onClick={()=>{
        setState((curr)=>curr+1)
      }}>Click Me</button>

      <p>The previous state value was {prev}</p>
    </>
  );
}


// export default function App() {
//    const [currPost, setCurrPost] = useState(1);
  
//   const {data,loading} = useFetch("https://jsonplaceholder.typicode.com/posts/"+currPost);

//   return (
//     <div>
//       {loading ? "Loading..." : JSON.stringify(data.title)}
//       <br />
//       <button
//         onClick={() => {
//           setCurrPost(1);
//         }}
//       >
//         1
//       </button>
//       <button
//         onClick={() => {
//           setCurrPost(2);
//         }}
//       >
//         2
//       </button>
//       <button
//         onClick={() => {
//           setCurrPost(3);
//         }}
//       >
//         3
//       </button>
//     </div>
//   );
// }

// function useCounter(){
//   const [count, setCount] = useState(0);

//   function incCount() {
//     setCount((c) => c + 1);
//   }

//   return{
//     count:count,
//     incCount:incCount
//   }

// function Counter() {
//   const { count, incCount } = useCounter();

//   return (
//     <div>
//       <button onClick={incCount}>Increase</button>
//       <br />
//       {count}
//     </div>
//   );
// }
