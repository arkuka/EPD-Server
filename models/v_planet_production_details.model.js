module.exports = (sequelize, Sequelize)=>{
	const V_Planet_Production_Details = sequelize.define("V_Planet_Production_Details",{
		PlanetType:{
			type: Sequelize.STRING
		},
		ProductionName:{
			type: Sequelize.STRING
		},
		ProductionLevel:{
			type: Sequelize.STRING
		}
	},{
		tableName:'v_planet_production_details',
		timestamps:false
	})

	V_Planet_Production_Details.removeAttribute('id');

	return V_Planet_Production_Details;
}
