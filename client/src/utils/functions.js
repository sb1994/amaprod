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
    return parseFloat(item.product.price)
  })
  //get the total price of the cart by multiplying them all together
  // with the quantitiy of the items
  for (let i = 0; i < quantites.length; i++) {
    totalPrice = totalPrice + quantites[i] * prices[i]
  }
  return totalPrice
}
