let cnt=0;
function deleteTodo(ind){
    const el = document.getElementById("todo-"+ind);
    el.parentNode.removeChild(el);
}

setInterval(callback, 1000)