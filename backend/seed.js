const mongoose = require('mongoose');
const Cake = require('./models/cake');
require('dotenv').config();

const sampleCakes = [
  {
    name: "Velvet Sky Bloom",
    description: "A luxurious red velvet sponge layered with Madagascar vanilla bean cream cheese frosting.",
    image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800",
    type: "Cake",
    category: "Anniversary",
    variants: [
      { weight: "250g", price: 799, isDefault: false },
      { weight: "500g", price: 1400, isDefault: false },
      { weight: "1kg", price: 2500, isDefault: true }
    ],
    isActive: true
  },
  {
    name: "Dark Truffle Magic",
    description: "Intense Belgian dark chocolate ganache draped over a moist chocolate chiffon base.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    type: "Cake",
    category: "Birthday",
    variants: [
      { weight: "250g", price: 549, isDefault: true },
      { weight: "500g", price: 950, isDefault: false },
      { weight: "1kg", price: 1800, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Lemon Berry Zest",
    description: "Zesty lemon cake filled with fresh blueberry compote and light mascarpone cream.",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800",
    type: "Cake",
    category: "Premium",
    variants: [
      { weight: "250g", price: 899, isDefault: false },
      { weight: "500g", price: 1600, isDefault: false },
      { weight: "1kg", price: 3000, isDefault: true }
    ],
    isActive: true
  },
  {
    name: "Strawberry Dream",
    description: "Fresh farm-picked strawberries on a cloud-like vanilla chiffon.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    type: "Cake",
    category: "Children Special",
    variants: [
      { weight: "500g", price: 1200, isDefault: true },
      { weight: "1kg", price: 2200, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Confetti Celebration",
    description: "Multi-colored sprinkle cake that brings joy to every child's party.",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800",
    type: "Cake",
    category: "Children Special",
    variants: [
      { weight: "500g", price: 1100, isDefault: true },
      { weight: "1kg", price: 2000, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Blueberry Bliss",
    description: "A gentle blueberry flavor perfect for welcoming a new soul.",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800",
    type: "Cake",
    category: "New Born",
    variants: [
      { weight: "500g", price: 1300, isDefault: true },
      { weight: "1kg", price: 2400, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Golden Saffron Delight",
    description: "Rich saffron and cardamom cake, the essence of festive joy.",
    image: "https://images.unsplash.com/photo-1505976662484-972161733989?w=800",
    type: "Cake",
    category: "Festive Special",
    variants: [
      { weight: "500g", price: 1500, isDefault: true },
      { weight: "1kg", price: 2800, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Belgian Chocolate Pastry",
    description: "Layered chocolate sponge with rich Belgian ganache.",
    image: "https://images.unsplash.com/photo-1571115177098-24ec4209b5d5?w=800",
    type: "Pastry",
    category: "General",
    variants: [
      { weight: "Piece", price: 150, isDefault: true }
    ],
    isActive: true
  },
  {
    name: "Red Velvet Pastry",
    description: "Classic red velvet with cream cheese frosting in a single serve.",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800",
    type: "Pastry",
    category: "General",
    variants: [
      { weight: "Piece", price: 180, isDefault: true }
    ],
    isActive: true
  },
  {
    name: "Classic Vanilla Cupcake",
    description: "Fluffy vanilla sponge with a swirl of buttercream.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800",
    type: "Cup Cake",
    category: "General",
    variants: [
      { weight: "Set of 2", price: 200, isDefault: true },
      { weight: "Box of 6", price: 550, isDefault: false }
    ],
    isActive: true
  },
  {
    name: "Oreo Blast Cupcake",
    description: "Chocolate cupcake topped with Oreo cream frosting.",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800",
    type: "Cup Cake",
    category: "General",
    variants: [
      { weight: "Set of 2", price: 250, isDefault: true },
      { weight: "Box of 6", price: 650, isDefault: false }
    ],
    isActive: true
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meraki')
  .then(async () => {
    console.log("Connected to DB, clearing existing cakes...");
    await Cake.deleteMany({});
    console.log("Inserting sample cakes...");
    await Cake.insertMany(sampleCakes);
    console.log("Done!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
