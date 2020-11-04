const mongoose = require('mongoose')

const CotationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  price: {
    type: Number,
    require: true
  },
  city: [{
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    }
  }],
  history: [{
    x: {
      type: String,
      require: true
    },
    y: {
      type: Number,
      require: true
    }
  }],

  lastUpdated: {
    default: Date.now(),
    type: Date
  }
})

const Cotations = mongoose.model('Cotations', CotationSchema)

export {
  Cotations
}
