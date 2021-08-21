const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	dbConfig.DB, 
	dbConfig.USER, 
	dbConfig.PASSWORD, 
	{
  	host: dbConfig.HOST,
  	dialect: dbConfig.dialect,
  	operatorsAliases: false,
  	pool:{
		    	max: dbConfig.pool.max,
		    	min: dbConfig.pool.min,
		    	acquire: dbConfig.pool.acquire,
		    	idle: dbConfig.pool.idle
  		 }
	});


const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Planet_List = require("./planet_list.model.js")(sequelize, Sequelize);
db.Planet_Production = require("./planet_production.model.js")(sequelize,Sequelize)
db.Production_Catalogue = require("./production_catalogue.model.js")(sequelize,Sequelize)
db.V_Planet_Production_Details = require("./v_planet_production_details.model.js")(sequelize,Sequelize)

module.exports = db;