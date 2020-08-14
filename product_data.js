let fs = require("fs");
const mongoose = require("mongoose");
const Product = require("./api/v1/models/Product");
let products_data = JSON.parse(fs.readFileSync("./data/results.json", "utf8"));
console.log(products_data[0]);
// console.log(products_data[0].);
const db = "mongodb://127.0.0.1:27017/amaprod";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

for (let i = 0; i < 1000; i++) {
  let product = products_data[i];
  // console.log(product);
  let newProduct = new Product({
    name: product.name,
    type: product.type,
    price: product.price,
    shipping: product.shipping,
    description: product.description,
    url: product.url,
    image: product.image,
  });
  console.log(newProduct);
  newProduct
    .save()
    .then((post) => {
      console.log(post);
    })
    .catch((err) => {
      console.log(err);
    });
}
//raw data
// console.log(products_data);
// Product.find({})
//     .then((products) => {
//       console.log(products);})
//     .catch((err) => {})
// let unique = (products_data)=>{
//   const s = new Set()
//   return products_data.filter(product=>{
//   })
// }
// let allManufactuers = products_data.map(product=>product.manufacturer)
// let allIds = products_data.map(product=>product.sku)
// let allProductsImages = products_data.map(product=>{
//   if (product.image) {
//     return product.image
//   }else{
//     console.log('image missing');
//   }
// })
// // console.log(allManufactuers.length);
// const uniqueSet = new Set(allManufactuers)
// const uniqueArray = [...uniqueSet]

// const uniqueIdSet = new Set(allIds)
// const uniqueIdArray = [...uniqueIdSet]
// // console.log(uniqueArray.length);
// console.log(uniqueIdArray);
// console.log(allProductsImages);

// let manufactuers = uniqueBy(products_data, "manufacturer");
