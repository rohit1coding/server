import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  projectFeatures: {
    type: [String],
  },
  projectTechnology: {
    frontend: { type: [String] },
    backend: { type: [String] },
    database: { type: [String] },
  },
  sharingURL: {
    type: String,
  },
  basePrice: {
    type: Number,
    default: 0.0,
  },
  offerPrice: {
    type: Number,
    default: 0.0,
  },
  deliveryDays: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  collectionItem: {
    type: Boolean,
    default: false,
  },
  hotOfferItem: {
    isHotOffer: { type: Boolean, default: false },
    basic: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    value: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    prime: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
  },
  inventoryMangement: {
    isinventoryMangement: { type: Boolean, default: false },

    basic: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    value: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    prime: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
  },
  posSystem: {
    isposSystem: { type: Boolean, default: false },

    basic: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    value: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
    prime: {
      basePrice: {
        type: Number,
        default: 0,
      },
      offerPrice: {
        type: Number,
        default: 0,
      },
    },
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
