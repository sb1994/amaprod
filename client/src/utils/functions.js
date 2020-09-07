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
  let quantites = cart.map((item) => {
    return item.quantity
  })
  let prices = cart.map((item) => {
    return parseFloat(item.product.price)
  })

  // let totalPrice = 0

  for (let i = 0; i < quantites.length; i++) {
    totalPrice = totalPrice + quantites[i] * prices[i]
  }
  return totalPrice
}
