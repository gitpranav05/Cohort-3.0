function btoa(byArr) {
    return new TextDecoder().decode(byArr);
}

const bytes = new Uint8Array([72,101,108,108,111])
const as = btoa(bytes);
console.log(as);

//Next week was BTC whitepaper