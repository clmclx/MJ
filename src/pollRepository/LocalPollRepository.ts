let polls: Poll[] = []

const createPoll: (electionName: string, candidates: string[] , mentions: string[], voters: string[], startDate?: Date, endDate?: Date, algorithm?: string) => Poll 
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

const getPollResult: (poll: Poll) => Record<string, Record<string, number>> = (poll) =>  {
    const candidateResults: CandidateResults[] =[]
    const pollResults = buildInitialPollResults(poll)
    poll.votes.forEach(vote => compileVote(pollResults, vote))
    return pollResults
}

const buildInitialPollResults: (poll: Poll) => Record<string,Record<string, number>> = (poll) => {
    let initialPollResults: Record<string, Record<string, number>> = {}
    let initialCandidateResult : Record<string, number> = {}
    poll.mentions.forEach(mention => initialCandidateResult[mention] = 0)
    poll.candidates.forEach(candidate => {
        initialPollResults[candidate]=JSON.parse(JSON.stringify(initialCandidateResult))
    })

    return initialPollResults
}

const compileVote: (pollResults: Record<string,Record<string,number>>, vote: Vote) => void =
(pollResults, vote) => {
    Object.keys(vote.votedMentions).forEach(candidate => {
        const candidateMention = vote.votedMentions[candidate]
        pollResults[candidate][candidateMention]+=1
    })
}

const compileResults: (allCandidatesResults: CandidateResults[]) => Record<string, Record<string,number>> = (allCandidatesResults) => {
    const overallResults: Record<string, Record<string, number>> = {}
    allCandidatesResults.forEach((candidateResults: CandidateResults) => {
        const allVotes = Object.values(candidateResults.mentionsResult).reduce((acc, curVal) => acc + curVal, 0)
        Object.keys(candidateResults.mentionsResult)
        .forEach(mention => overallResults[candidateResults.candidate][mention] = candidateResults.mentionsResult[mention]/allVotes)
    })

    return overallResults
}

const addVoteToCandidate : (vote: Vote, candidateResults: CandidateResults) => CandidateResults = (vote, candidateResults) => {
    const votedMention : string  = vote.votedMentions[candidateResults.candidate]
    candidateResults.mentionsResult[votedMention]?candidateResults.mentionsResult[votedMention]+=1:candidateResults.mentionsResult[votedMention]=1
    return candidateResults
}

const isCandidateInResults: (candidate: string, allCandidateResults : CandidateResults[]) => boolean =
 (candidate: string, allCandidateResults: CandidateResults[]) => {
    return allCandidateResults.findIndex((candidateResults: CandidateResults) => candidateResults.candidate == candidate) == -1
}

const addMentionForCandidate: (votingResult: any, vote: Vote, candidate: string) => void =
(votingResult, vote, candidate) => {
    if(!Object.keys(votingResult).includes(candidate)) {
        votingResult[candidate][vote.votedMentions[candidate]] = 1
    } else {
        votingResult[candidate][vote.votedMentions[candidate]]+=1
    }
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