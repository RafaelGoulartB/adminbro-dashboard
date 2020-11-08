import mongoose from 'mongoose'

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
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users'
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
  }]
}, {
  timestamps: true
})

const Cotations = mongoose.model('Cotations', CotationSchema)

export default Cotations
