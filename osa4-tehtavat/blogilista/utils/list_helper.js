const dummy = (blogs) => {
    return 1;
}

const totalLikes = (List) => {
    let totalLikes = 0;
    List.forEach((blog) => {
        totalLikes = blog.likes + totalLikes;
    })
    return totalLikes;
};

const favoriteBlog = (List) => {
    let maxLikes = 0;
    List.forEach((blog) => {
        if (maxLikes < blog.likes){
            maxLikes = blog.likes
        }
    })
    const mostLiked = List.find((like) => like.likes === maxLikes);
    const result = { title: mostLiked.title, author: mostLiked.author, likes: mostLiked.likes}
    return result;
};

const mostBlogs = (List) => {
    let seen = []
    List.forEach((blog) => {
        const isDuplicate = seen.find((author) => author.author === blog.author);
        if(!isDuplicate){
            seen.push({
                author: blog.author, blogs: 1
            })
        } else {
            isDuplicate.blogs++;
        }
    })
    const mostBlogs = Math.max(...seen.map(obj => obj.blogs));
    const index = seen.find(obj => obj.blogs === mostBlogs);
    return index;
};

const mostLikes = (List) => {
    const authors = [];
    List.forEach((blog) => {
        const isDuplicate = authors.find((author) => author.author === blog.author);
        if (!isDuplicate) {
            authors.push({
                author: blog.author,
                likes: blog.likes
            })
        } else {
            isDuplicate.likes += blog.likes;
        }
    })
    const mostLiked = Math.max(...authors.map(obj => obj.likes));
    const index = authors.find(obj => obj.likes === mostLiked);
    return index;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}