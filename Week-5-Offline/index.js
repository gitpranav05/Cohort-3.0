const arr = [1,2,3,4,5,6]

function transform(i) {
    return i*2;    
}

function maps(abc, lsd){
    for(let i=0; i<abc.length; i++){
        if(abc[i]%2!=0){
            abc[i]=lsd(abc[i]);
        }
    }
}
function fn(n) {
    if(n%2==0){
        return true;
    }
    else{
        false;
    }
}
const ans = arr.filter(fn)
// maps(arr, transform)
console.log(ans);