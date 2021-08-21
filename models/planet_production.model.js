module.exports = (sequelize, Sequelize)=>{
	const Planet_Production = sequelize.define("Planet_Production",{
		PlanetType:{
			type: Sequelize.INTEGER
		},
		ProductionType_1:{
			type: Sequelize.STRING
		},
		ProductionType_2:{
			type: Sequelize.STRING
		},
		ProductionType_3:{
			type: Sequelize.STRING			
		},
		ProductionType_4:{
			type: Sequelize.STRING			
		},
		ProductionType_5:{
			type: Sequelize.STRING
		},
		ProductionType_6:{
			type: Sequelize.STRING
		}
	},{
		tableName: 'planet_production',
		timestamps: false
	})	

	Planet_Production.removeAttribute('id');

	return Planet_Production;
}