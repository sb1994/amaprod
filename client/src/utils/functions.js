import product from '../reducers/productReducer'

export const checkReviewFormRender = (reviews, user_id) => {
  console.log(reviews)
  console.log(user_id)
  let renderReviewForm = reviews.includes((review) => {
    if (review.user._id !== user_id) {
      console.log(review)
      return true
    }
  })
  return renderReviewForm
}
export const returnTotalPrice = (cart) => {
  let totalPrice = 0
  //gets the quantitys of the products
  //and puts them into an array
  let quantites = cart.map((item) => {
    return item.quantity
  })

  //gets the prices of the products
  //and puts them into an array
  let prices = cart.map((item) => {
    return parseFloat(item.product.price).toFixed(2)
  })
  //get the total price of the cart by multiplying them all together
  // with the quantitiy of the items
  for (let i = 0; i < quantites.length; i++) {
    totalPrice = totalPrice + quantites[i] * prices[i]
  }
  return parseFloat(totalPrice).toFixed(2)
}
export const checkPurchaseStatus = ({ _id }, { order_history }) => {
  // return orders
  let checkedStatus = false
  let filteredOrdersArray = order_history.map((order) => {
    return order.products
  })
  let unfilterProducts = filteredOrdersArray.map((product, index) => {
    return product
  })

  //checks wheter the item has alreay been purchased or not
  for (let i = 0; i < unfilterProducts.length; i++) {
    let products = unfilterProducts[i]
    for (let y = 0; y < products.length; y++) {
      // const element = products[i][y]
      if (unfilterProducts[i][y].product._id !== _id) {
        checkedStatus = false
      } else {
        checkedStatus = true
      }
    }
  }

  return checkedStatus
}
