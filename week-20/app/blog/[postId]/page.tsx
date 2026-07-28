import axios from "axios";

async function page({ params }: { params: { postId: string } }) {
  const id = (await params).postId;

  const resp = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const data = resp.data;
  return (
    <div>
      Blog Page {id}
      <br />
      title - {data.title}
      <br />  
      body - {data.body}
    </div>
  );
}

export default page;
