module.exports = {
    street: {type: String, trim: true},
    city: {type: String, trim: true},
    province: {type: String, trim: true},
    country: {
        countryCode: {type: String, trim: true},
        countryName: {type: String, trim: true}
    },
    zip: {type: String, trim: true}
};