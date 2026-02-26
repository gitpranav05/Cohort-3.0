import React from "react";

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        margin: "10px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Card>
        <h2>Card Title</h2>
        <p>This is some content inside the card.</p>
      </Card>
      <Card>
        <h2>Another Card</h2>
        <p>This card has different content!</p>
      </Card>
    </div>
  );
};

export default App;

// const [currTab, setTab] = useState(1);
// const [loading, setLoading] = useState(true);
// const [tabData, setTabData] = useState({});

// useEffect(() => {
//   setLoading(true);

//   fetch("https://jsonplaceholder.typicode.com/todos/" + currTab).then(
//     async (res) => {
//       const json = await res.json();
//       setTabData(json);
//       setLoading(false);
//     },
//   );
// }, [currTab]);

// return (
//   <div>
//     <button
//       onClick={() => {
//         setTab(1);
//       }}
//       style={{ color: currTab == 1 ? "red" : "black" }}
//     >
//       Todo 1
//     </button>
//     <button
//       onClick={() => {
//         setTab(2);
//       }}
//       style={{ color: currTab == 2 ? "red" : "black" }}
//     >
//       Todo 2
//     </button>
//     <button
//       onClick={() => {
//         setTab(3);
//       }}
//       style={{ color: currTab == 3 ? "red" : "black" }}
//     >
//       Todo 3
//     </button>
//     <button
//       onClick={() => {
//         setTab(4);
//       }}
//       style={{ color: currTab == 4 ? "red" : "black" }}
//     >
//       Todo 4
//     </button>

//     <br />
//     {loading ? "Loading..." : tabData.title}
//   </div>
// );

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
