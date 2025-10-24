const express = require("express")
const app = express();

app.use(express.json())

const users = [{
	name:"John",
	kidneys:[{
		healthy:false
	}]
}];

app.get("/", function(req, res){

	const johnKid = users[0].kidneys;
	const noK = johnKid.length;

	let hel=0;

	for(let i=0; i<johnKid.length; i++){
		if(johnKid[i].healthy){
			hel++;
		}
	}
	const unhel = noK - hel;

	res.json({
		noK,
		hel,
		unhel
	})
});


app.post("/",(req, res)=>{
	const ishel = req.body.ishel;
	users[0].kidneys.push({
		healthy:ishel
	})

	res.json({
		msg:"Done"
	})
});	

app.put("/",(req,res)=>{
	for(let i=0; i<users[0].kidneys.length; i++){
		users[0].kidneys[i].healthy=true;
		
	}
	res.json({
		});
})

app.listen(3000, (req,res)=>{
	console.log("Listening on 3000");
});

