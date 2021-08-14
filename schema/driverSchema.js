import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
    name: String,
    percentage: Number,
    votesFor: Number,
    votesTotal: Number,
    bgColor: String,
    color: String
}, {collection: 'Drivers'});

const DriverModel = mongoose.model('Driver', DriverSchema);

export default DriverModel;