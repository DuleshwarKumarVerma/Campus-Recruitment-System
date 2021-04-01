const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    company_name: { type: String },
    department: { type: String },
    ctc: { type: Number },
    type: { type: String },
    estabYear: { type: Date },
    country: { type: String },
    natureOfBusiness: { type: String },
    cgpaCutOff: { type: Number },
    contact: { type: Number },

},{ timestamps: true });
module.exports = mongoose.model('tblcompany',companySchema);