var express = require('express');
var app = express();
var bodyParser =require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var ingredients = [
{
	"id":"232kak",
	"text":"Eggs"
},
{
	"id":"231kak",
	"text":"milk"
},
{
	"id":"230kak",
	"text":"bread"
},
{
	"id":"74hdy",
	"text":"cheese"
	
}
];

app.get('/ingredients', function(request, response) {
	response.send(ingredients);
	
});

app.post('/ingredients', function(request,response) {
	var ingredient=request.body;
	if(!ingredient || ingredient.text === ""){
		response.status(500).send({error: "Your ingredient must have a text"});
	}
	else {
		ingredients.push(ingredient);
		response.status(200).send(ingredients);
	}
});

app.put('/ingredients/:ingredientId', function(request, response) {
	
	
	var newtext= request.body.text;
	
	if(!newtext || newtext === "") {
		response.status(500).send({error:"You must provide ingredient text"})
	}
	else
	{
		var objectFound = false;
		for(var x=0; x<ingredients.length;x++){
		var ing = ingredients[x];
		
		if(ing.id === request.params.ingredientId)
		{
			ingredients[x].text = newtext;
			objectFound = true;
			break;
		}
	}	
	
	if(!objectFound)
	{
		response.status(500).send({error:"Ingredient id not found"});
	}
	else
	{
		response.send(ingredients);
	}
	
	}
    
});


app.listen(3000, function() {
	console.log("First API running on port 3000!");
});