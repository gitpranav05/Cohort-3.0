const crypto = require('crypto')

function findHash(pref){

	let input =0;
	while(true){
		let inp = input.toString();
		let hash= crypto.createHash('sha256').update(inp).digest('hex');
		if(hash.startsWith(pref)){
			return {input:inp, hash:hash};
		}
		input++;
	}
}

console.log(
  findHash("55711980d50fd24989409a7a7d4e15fcd206556eec1245c94a6e60910dc4e41d"),
);

