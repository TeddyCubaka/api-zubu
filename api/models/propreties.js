const mongoose = require("mongoose");

const propretySchema = mongoose.Schema({
	owner: mongoose.Types.ObjectId,
	uploadDate: Date,
	updateDate: [Date],
	questions: [mongoose.Types.ObjectId],
	visits: [mongoose.Types.ObjectId],
	rentalInformation: {
		isAvailable: Boolean,
		availabilityDate: String,
		RentalType: String,
		price: { type: Number, required: true },
		guaranteeValue: { type: String, required: true },
		monetaryCurrency: String,
		coverPicture: String,
		address: { type: String, required: true, unique: true },
		bedRooms: Number,
		announcementPeriod: {
			start: Date,
			due: Date,
		},
		lessor: {
			fullName: String,
			contacts: String,
		},
	},
	description: {
		gallery: [
			{
				url: String,
				width: Number,
				height: Number,
				size: Number,
				uploadDate: Date,
				publicId: String,
			},
		],
		tenantCharges: [
			{
				charge: String,
				price: Number,
				currency: String,
			},
		],
		interior: {
			rooms: [
				{
					name: String,
					size: Number,
					unit: String,
				},
			],
		},
		external: {
			rooms: [
				{
					name: String,
					size: Number,
					unit: String,
				},
			],
		},
		furniture: [String],
		geographicLocation: {
			nearestSchoolDistance: [
				{
					name: String,
					geolocalisation: String,
					grade: String,
					distance: String,
				},
			],
			nearestTransportationStopDistance: [
				{
					name: String,
					geolocalisation: String,
					distance: String,
				},
			],
		},
	},
	contacts: {
		contactMethod: String,
		phone: [],
		mail: String,
		facebook: String,
		twiter: String,
		linkendin: String,
	},
	rentHistorical: [
		{
			modificationDate: Date,
			whatChange: [{ change: String }],
		},
	],
	statistics: {
		referencingNote: Number,
		averagePiewsPerWeek: Number,
		averagePrade: Number,
		averageViewsPerMonth: Number,
		personWhoNoted: Number,
		averageVisitsPerWeek: Number,
		viewsPerWeek: [
			{
				startTime: Date,
				endTime: Date,
				numberOfView: Number,
			},
		],
		viewsPerMonth: [
			{
				startTime: Date,
				endTime: Date,
				numberOfView: Number,
			},
		],
	},
});

module.exports = mongoose.model("Proprety", propretySchema);
