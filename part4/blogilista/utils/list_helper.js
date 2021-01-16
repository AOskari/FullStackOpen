const dummy = (blogs) => {
    return Number(1)
  }
  
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : (blogs.reduce(reducer, 0))
}

const favoriteBlog = (blogs) => {

  let favorite = blogs[0]

  const reducer = (sum, item) => {
    if (favorite.likes < item.likes) {
      favorite = item
      return item
    } else {
      return favorite
    }
  }
  console.log(blogs.reduce(reducer, 0))
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}