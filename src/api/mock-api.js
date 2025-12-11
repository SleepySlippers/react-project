import articles from '../assets/articles.json'
import comments from '../assets/comments.json'

const DURATION = 1000;

export async function getArticles() {
    return new Promise(resolve => {
        setTimeout(() => resolve(articles), DURATION)
    })
}

export async function getComments() {
    return new Promise(resolve => {
        setTimeout(() => resolve(comments), DURATION)
    })
}
