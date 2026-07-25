import axios from "axios"

async function getBlogs() {
  const resp = await axios.get("https://jsonplaceholder.typicode.com/todos/");
  return resp.data;
}

async function page() {

  const blogs = await getBlogs();

  return (
    // eslint-disable-next-line react/jsx-key
    <h1>{blogs.map((blog:todo)=> <Todo title={blog.title} completed={blog.completed} />  )}</h1>
  )
}

export default page

interface todo{
  title: string,
  completed: boolean;
}

function Todo({title,completed}: todo){
  return <div>
    {title} {completed ? "done" : "not done"}
  </div>
}