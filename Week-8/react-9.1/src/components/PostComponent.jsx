export function PostComponent({ name, subTitle, time, image, desc }) {
  const style = {
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  };
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <img
          src={image}
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            marginLeft: 10,
          }}
        />
        <div style={{ fontSize: 10, marginLeft: 10 }}>
          <b>{name}</b>
          <div>{subTitle}</div>
          <div>{time}</div>
        </div>
      </div>
      <div style={{ fontSize: 10, marginLeft: 10 }}>{desc}</div>
    </div>
  );
}
