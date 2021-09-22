var http 						= require('http')
var url 						= require("url")
var cors 						= require('cors')
var express 					= require('express')
var app 						= express()

var Planet_List 				= []
var Planet_Product 				= []
var Product_Catalogue 			= []
var Charactor_List 				= []
var V_Planet_Product_Details 	= []

var Product_Map_Name2Type 		= []


var __AK_DEBUG__ = null

const __ak_debug__ = (...args)=>{
	if(__AK_DEBUG__){
		console.log(...args)
	}
}

app.use(express.json())

app.use(
	cors({
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

__ak_debug__(connection.connect());

connection.query('select * from v_planet_product_details ',function(error,results,fields){
	
	if(error) throw error;
	__ak_debug__('v_planet_product_details=:',results);
})

connection.query('select * from charactor_list',function(error,results,fields){
	
	if(error) throw error;
	__ak_debug__('charactor_list:',results);
	Charactor_List = results;
})

connection.query('select * from product_catalogue', function(error, results, fields){
	if(error) throw error;
	__ak_debug__('product_catalogue=',results)
	Product_Catalogue = results;
	Product_Catalogue.forEach((item,index)=>{
		Product_Map_Name2Type[item.ProductName] = item.ProductType
	})
	console.log('Product_Map_Name2Type=',Product_Map_Name2Type)
	
})

connection.query('select * from planet_list', function(error, results, fields){
	if(error) throw error;
	__ak_debug__('planet_list=',results)
	Planet_List = results;
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

app.post('/Update_Stock_List', function(req,res){

	console.log('req.body = ', req.body)

	var dstr = 'DELETE FROM `stock_list` WHERE `Abandoned`=1'
	connection.query(dstr)

	if(Array.isArray(req.body)){
		req.body.forEach((item_a,index_a)=>{
			var charactor_id = getIdByCharactorName(item_a.Name)

			console.log(item_a.Name,'=>',charactor_id)

			if(item_a.Planet_List && item_a.Planet_List.length>0){
				item_a.Planet_List.forEach((item_b, index_b)=>{
					var planet_id = item_b.Planet_ID

					if(item_b.Stock_List && item_b.Stock_List.length>0){
						item_b.Stock_List.forEach((item_c,index_c)=>{
								updateStockList(charactor_id,planet_id,item_c.Product_Name, item_c.Product_Qty)
						})
					}
				})
			}
		})
	}	

	res.send('Update_Stock_List Processed')
})

app.listen(5001);

console.log('server is running on port 5001');

function getIdByCharactorName(charactor_name){
	var charactor_id = ''
	Charactor_List.forEach((item,index)=>{
		if(Charactor_List[index].CharactorName==charactor_name){
			charactor_id = Charactor_List[index].CharactorID
		}
	})
	return charactor_id
}

function updateStockList(cid,pid,pname,qty){

	var ptype = Product_Map_Name2Type[pname]

	var ustr = 	'UPDATE `stock_list` SET `Abandoned`=1 WHERE `CharactorID` LIKE "%'
				+ cid 		+ '%"'

	var istr = 	'INSERT INTO `stock_list`(`CharactorID`, `PlanetID`, `ProductID`, `ProductQty`,`Abandoned`) VALUES ("'
				+ cid 		+ '","'
				+ pid 		+ '","'
				+ ptype 	+'","'
				+ qty 		+'",0)'

	connection.query(ustr,(err, result)=>{
		if(err==null){
			connection.query(istr)
		}
	})

	console.log('end of updateStockList')
}