var http 						= require('http')
var url 						= require("url")
var cors 						= require('cors')
var express 					= require('express')
var app 						= express()

const { v4:uuidv4 }				= require('uuid')

const SV 						= require('./StaticVariables.js')

var Planet_List 				= []
var Planet_Product 				= []
var Product_Catalogue 			= []
var Charactor_List 				= []
var Formula_List				= []
var V_Planet_Product_Details 	= []

var Product_Map_Name2Type 		= []

var Operation_UUIDs				= []


var __AK_DEBUG__ = null

const __ak_debug__ = (...args)=>{
	if(__AK_DEBUG__){
		console.log(...args)
	}
}

app.use(express.json())

app.use(
	cors({
    origin : 'http://localhost:5000'
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
	host		:'localhost',
	user 		:'root',
	password	:'',
	database	:'epd'
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
})

connection.query('select * from planet_list', function(error, results, fields){
	if(error) throw error;
	__ak_debug__('planet_list=',results)
	Planet_List = results;
})

connection.query('select * from formula_list', function(error, results, fields){
	if(error) throw error;
	__ak_debug__('formula_list=',results)
	Formula_List = results;
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

app.get('/Formula_List', function(req, res){
	res.send(JSON.stringify(Formula_List));
})

app.get('/V_Planet_Product_Details',function(req,res){
	res.send(JSON.stringify(V_Planet_Product_Details));
})

app.get('/Operation_Result', function(req,res){
	const query = url.parse(req.url,true).query

	console.log('GET : Operation_Result : Query -- UUID[', query.uuid,']')

	status = SV.HTTP_STATUS_CODE_ACCEPTED
	result ={
			status,
			statusText 	: 'Accepted',
			pending 	: SV.BASIC_DB_OPERATION_PERIOD,
			uuid 		: query.uuid
		}	

	if(query.uuid){
		if(Operation_UUIDs[query.uuid].welldone){
			status = SV.HTTP_STATUS_CODE_OK
			result = {
				status,
				statusText 	: 'OK',
				pending 	: 0
			}
		}else if(Operation_UUIDs[query.uuid].allLaunched && (Operation_UUIDs[query.uuid].finished + Operation_UUIDs[query.uuid].failed) == Operation_UUIDs[query.uuid].launched){
			status = SV.HTTP_STATUS_CODE_INTERNAL_SERVER_ERROR
			result = {
				status 		: status,
				statusText 	: 'Internal Server Error',
				pending 	: 0
			 }
		}
	}

	if(status != SV.HTTP_STATUS_CODE_ACCEPTED){
		var dstr = 'DELETE FROM `stock_list` WHERE `Abandoned`=1'
		connection.query(dstr)
		
		console.log('GET : Operation_Result : Delete - UUID[',query.uuid,']')
		delete Operation_UUIDs[query.uuid]		
	}

	res.status(status)
	res.send(result)
})

app.post('/Stock_List', function(req,res){

	var dstr = 'DELETE FROM `stock_list` WHERE `Abandoned`=1'
	connection.query(dstr)

	var operation_record_with_uuid = {
		uuid 		: uuidv4(),
		launched 	: 0,
		finished 	: 0,
		failed		: 0,
		allLaunched	: false,
		welldone	: false
	}

	Operation_UUIDs[operation_record_with_uuid.uuid]=operation_record_with_uuid

	console.log('POST : Stock_List : Set ---- UUID[',operation_record_with_uuid.uuid,']')

	var status = SV.HTTP_STATUS_CODE_ACCEPTED

	var result = {
		status,
		statusText	: 'Accepted',
		pending		: SV.BASIC_DB_OPERATION_PERIOD,
		uuid 		: operation_record_with_uuid.uuid
	}

	if(Array.isArray(req.body)){
		req.body.forEach((item_a,index_a)=>{
			var charactor_id = getIdByCharactorName(item_a.Name)

			if(item_a.Planet_List && item_a.Planet_List.length>0){

				item_a.Planet_List.forEach((item_b, index_b)=>{

					var planet_id = item_b.Planet_ID
					abandonOldRecord(charactor_id, planet_id)

					if(item_b.Stock_List && item_b.Stock_List.length>0){

						item_b.Stock_List.forEach((item_c,index_c)=>{
								updateStockList(charactor_id,planet_id,item_c.Product_Name, item_c.Product_Qty, operation_record_with_uuid)
						})

					}

				})
			}
		})
		operation_record_with_uuid.allLaunched = true
	}

	if(operation_record_with_uuid.launched==0){
		status = SV.HTTP_STATUS_CODE_OK
		result = {
			status,
			statusText : 'OK'
		}		
		console.log('POST : Stock_List : Delete - UUID[',operation_record_with_uuid.uuid,']')
		delete Operation_UUIDs[operation_record_with_uuid.uuid]
	}

	res.status(status)
	res.send(result)
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

function abandonOldRecord(cid, pid)
{
	var ustr = 	'UPDATE `stock_list` SET `Abandoned`=1 WHERE `CharactorID` LIKE "%'
				+ cid 		+ '%" and `PlanetID` LIKE "%'
				+ pid 		+ '%"'

	connection.query(ustr)
}

function updateStockList(cid,pid,pname,qty,operation_record_with_uuid){

	var ptype = Product_Map_Name2Type[pname]

	var istr = 	'INSERT INTO `stock_list`(`CharactorID`, `PlanetID`, `ProductID`, `ProductQty`,`Abandoned`) VALUES ("'
				+ cid 		+ '","'
				+ pid 		+ '","'
				+ ptype 	+ '","'
				+ qty 		+ '",0)'
		
	connection.query(istr,(err,result)=>{

		if(err==null){
			operation_record_with_uuid.finished++					
		}else{
			operation_record_with_uuid.failed++					
		}	

		if(operation_record_with_uuid.allLaunched == true && operation_record_with_uuid.launched == operation_record_with_uuid.finished){
			operation_record_with_uuid.welldone = true
		}
	})
	
	operation_record_with_uuid.launched++	
}