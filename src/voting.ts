




export const addVote = (poll: Poll, vote: Vote) => {
    poll.votes.push(vote)
}

const isVoteValid = (poll: Poll, userId: string, vote: Vote) => {
    let votedCandidates = Object.keys(vote.votedMentions)
    return  isUserValid(poll, userId) && areArraysEqual(poll.candidates, votedCandidates)
    && areVotedMentionsValid(vote, poll)
}

const isUserValid = (poll:Poll, userId: string) => {
    const voters = poll.voters
    return voters.includes(userId)
}

const areArraysEqual = (firstArray: any[], secondArray: any[]) => {
    return firstArray.length === secondArray.length &&
    firstArray.every((val, index) => val === secondArray[index]);
}

const areVotedMentionsValid = (vote: Vote, poll: Poll) => {
    return Object.values(vote.votedMentions).every((mention: string)=> poll.mentions.indexOf(mention) >-1);
}













