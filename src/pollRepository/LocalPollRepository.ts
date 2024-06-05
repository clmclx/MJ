let polls: Poll[] = []

const createPoll: (electionName: string, candidates: string[] , mentions: Mention[], voters: string[], startDate?: Date, endDate?: Date, algorithm?: string) => Poll 
= (electionName, candidates, mentions, voters, startDate?, endDate?)=> {
    const id = Math.floor(Math.random() * 1000000).toString()
    let poll: Poll = {
        id: id,
        electionName: electionName,
        candidates: candidates,
        voters: voters,
        startDate: startDate,
        endDate: endDate,
        votes: [],
        mentions: mentions
    }
    polls.push(poll)

    return poll
} 


const getPollbyId: (pollId: string) => Poll | undefined = (pollId) => {
    return polls.find(poll => poll.id === pollId)
}

const getPollbyName: (pollName: string) => Poll | undefined = (pollName) => {
    return polls.find(poll => poll.electionName === pollName)
}

const deletePoll: (pollId: string) => boolean = (pollId: string) => {
    const index = polls.findIndex(poll => poll.id === pollId)
    if (index == -1) {
        return false
    } else {
      polls = polls.splice(index, 1)
      return true
    }
}

const getPollResult: (poll: Poll) => Record<string, MentionResult[]> = (poll) =>  {
    const pollResults = buildInitialPollResults(poll)
    poll.votes.forEach(vote => compileVote(pollResults, vote))
    return pollResults
}

const buildInitialPollResults: (poll: Poll) => Record<string,MentionResult[]> = (poll) => {
    let initialPollResults: Record<string, MentionResult[]> = {}
    let initialCandidateResult : MentionResult[] = []
    poll.mentions.forEach(mention => initialCandidateResult.push({mention: mention, numberOfVotes: 0}))
    poll.candidates.forEach(candidate => {
        initialPollResults[candidate]=JSON.parse(JSON.stringify(initialCandidateResult))
    })

    return initialPollResults
}

const compileVote: (pollResults: Record<string,MentionResult[]>, vote: Vote) => void =
(pollResults, vote) => {
    Object.keys(vote.votedMentions).forEach(candidate => {
        const candidateMention = vote.votedMentions[candidate]
        let mentionResult = pollResults[candidate].find((mentionResult: MentionResult) => mentionResult.mention.name == candidateMention)
        if (mentionResult) {
            mentionResult.numberOfVotes+=1
        }
    })
}

const addVoteToPoll: (poll: Poll, vote: Vote) => void = (poll, vote) => {
    poll.votes.push(vote)
}

export const LocalPollRepository: PollRepository = {
    createPoll: createPoll,
    getPollById: getPollbyId,
    getPollByName: getPollbyName,
    getPollResult: getPollResult,
    addVoteToPoll: addVoteToPoll
 }