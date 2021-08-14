import mongoose from 'mongoose';

const ConstructorSchema = new mongoose.Schema({
    name: String,
    percentage: Number,
    votesFor: Number,
    votesTotal: Number,
    bgColor: String,
    color: String
}, {collection: 'Constructors'});

const ConstructorModel = mongoose.model('Constructor', ConstructorSchema);

export default ConstructorModel;