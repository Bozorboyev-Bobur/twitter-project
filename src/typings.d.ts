export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'tweet'
    blockTweet: boolean
}

export type TweetBody = {
    text?: string
    username: string
    nickname?: string
    profileImg: string
    image?: string
    video?: string
    verified?: boolean
    like?: string
    retweet?: string
    reply?: string
}

export type CommentBody = {
    text: string
    tweetId: string
    username: string
    nickname: string
    profileImg: string
    verified?: boolean
    image?: string
    like?: string
    retweet?: string
}

export interface Comment extends CommentBody {
    _createdAt: string
    _id: string
    _updatedAt: string
    _rev: string
    _type: 'tweet'
    tweet: {
        _ref: string
        _type: 'reference'
    }
}