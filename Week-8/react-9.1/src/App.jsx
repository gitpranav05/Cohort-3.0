import { useEffect, useState } from "react";
import { PostComponent } from "./components/PostComponent";

function App() {
  const [count, setCount] = useState(1);

  function counter() {
    setCount(function(curr){
      return curr+1;
    })
  }

  useEffect(function(){
    setInterval(counter,1000);
  }, [])



  return (
    <div>
      <div style={{backgroundColor: "red", borderRadius:20, width:20, paddingLeft: 10, marginLeft:30, paddingTop:10}}>
        {count}
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFnSIAXp2wpKT9HzzaIYDg2Zomevux3lqNw&s"
        style={{height:50}}
      />
  {/* <button onClick={counter}>Add</button> */}

    </div>
  );

}

export default App;

// const [posts, setPosts] = useState([]);

// const postComponents = posts.map((post) => (
//   <PostComponent
//     name={post.name}
//     subTitle={post.subTitle}
//     time={post.time}
//     image={post.image}
//     desc={post.desc}
//   />
// ));

// function addPost(){
//   setPosts([...posts, {
//     name: "Pranav",
//     subTitle: "1000 Followers",
//     time: "2m ago",
//     image: "https://avatars.githubusercontent.com/u/192879957?v=4",
//     desc: "Hello Pranav Awasarmol"
//   }]);
// }


// return (
//   <div style={{ background: "#dfe6e9", height: "100vh" }}>
//     <button onClick={addPost}>Add Post</button>
//     <div
//       style={{
//         display: "flex",
//         // alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div>
//         {postComponents}
//       </div>
//     </div>
//   </div>
// );