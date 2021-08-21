module.exports = (sequelize, Sequelize)=>{
	const Production_Catalogue = sequelize.define("Production_Catalogue",{
		ProductionType:{
			type: Sequelize.STRING
		},
		ProductionName:{
			type: Sequelize.STRING
		},
		ProductionLevel:{
			type: Sequelize.STRING
		}
	},{
		tableName:'production_catalogue',
		timestamps:false
	})

	Production_Catalogue.removeAttribute('id');

	return Production_Catalogue;
}
