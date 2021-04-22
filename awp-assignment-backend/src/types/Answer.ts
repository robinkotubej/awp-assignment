interface Answer {
    answerId: string
    timeCreated: Date
    username: string
    answer: string
    upVoteCount: number
    downVoteCount: number
    updatedAt: Date | null
}

export default Answer
