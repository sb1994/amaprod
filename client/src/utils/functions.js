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
