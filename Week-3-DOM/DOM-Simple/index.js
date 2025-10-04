let cnt = 1;

function delTodo(ind) {
  const el = document.getElementById(ind);
  el.parentNode.removeChild(el);
}

function addTodo() {
  const inpel = document.getElementById("inp");
  const val = inpel.value.trim();
  if (val === "") {
    alert("Enter a valid ToDo");
    return;
  }
  console.log(val);
  const newDiv = document.createElement("div");
  const d =
    "<div>" +
    val +
    '<button onclick="delTodo(' +
    cnt +
    ')">Delete</button></div>';
  newDiv.setAttribute("id", cnt);
  cnt++;
  newDiv.innerHTML = d;

  document.querySelector("#todo").appendChild(newDiv);

  inpel.value = "";
}
