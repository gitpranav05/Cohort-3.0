async function page({ params }: { params: { postId: string } }) {
  const id = (await params).postId;
  return <div>Blog Page {id} </div>;
}

export default page;
