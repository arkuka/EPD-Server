module.exports = (sequelize, Sequelize)=>{
	const Planet_List = sequelize.define("Planet_List",{
		ID:{
			type: Sequelize.INTEGER
		},
		Region:{
			type: Sequelize.STRING
		},
		Constellation:{
			type: Sequelize.STRING
		},
		SolarSystem:{
			type: Sequelize.STRING			
		},
		PlanetNo:{
			type: Sequelize.STRING			
		},
		PlanetType:{
			type: Sequelize.STRING
		}
	},{
		tableName: 'planet_list',
		timestamps: false
	})	

	Planet_List.removeAttribute('id');

	return Planet_List;
}