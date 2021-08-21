var http = require('http')
var url = require("url")
var cors = require('cors')
var express = require('express')



var app = express()

var Planet_List = []
var Planet_Product = []
var Product_Catalogue = []
var Charactor_List = []
var V_Planet_Product_Details = []



app.use(cors({
    origin: 'http://localhost:5000'
}));

/*const db = require("./models/index");*/

/*db.sequelize.sync().then(()=>{
		console.log("Re-sync db")	
		db.Planet_List.findAll().then((rows)=>{
				rows.forEach(item=>{
					Planet_List.push(item.dataValues)		
				})
				console.log(Planet_List)
		})

		db.Planet_Product.findAll().then((rows)=>{
				rows.forEach(item=>{
					Planet_Product.push(item.dataValues)		
				})
				console.log(Planet_Product)
		})

		db.Product_Catalogue.findAll({
			where:{				
				ProductType:"PP-0002"
			}
		}).then((rows)=>{
				rows.forEach(item=>{
					Product_Catalogue.push(item.dataValues)		
				})
				console.log(Product_Catalogue)
		})

		db.V_Planet_Product_Details.findAll({
			where:{
				PlanetType:'Ice'				
			}
		}).then((rows)=>{				
				rows.forEach(item=>{
					V_Planet_Product_Details.push(item.dataValues)		
				})
				console.log(V_Planet_Product_Details)
		})
	}
);*/

var mysql = require("mysql");
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'epd'
})

console.log(connection.connect());

connection.query('select * from V_Planet_Product_Details where `planettype` like "%a%" ',function(error,results,fields){
	
	if(error) throw error;
	console.log('data:',results);
})

connection.query('select * from Charactor_List where 1',function(error,results,fields){
	
	if(error) throw error;
	console.log('data:',results);
	Charactor_List = results;
})


app.get('/Charactor_List',function(req,res){
	res.send(JSON.stringify(Charactor_List));
})

app.get('/Planet_List',function(req,res){
	res.send(JSON.stringify(Planet_List));
})

app.get('/Planet_Product',function(req,res){	
	res.send(JSON.stringify(Planet_Product));		
})

app.get('/Product_Catalogue',function(req,res){
	res.send(JSON.stringify(Product_Catalogue));		
})

app.get('/V_Planet_Product_Details',function(req,res){
	res.send(JSON.stringify(V_Planet_Product_Details));		
})

app.listen(5001);

console.log('server is running on port 5001');


