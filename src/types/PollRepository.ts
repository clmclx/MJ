interface PollRepository {
    createPoll: (elctionName: string, candidate: string[], mentions: string[], voters: string[], startDate: Date, endDate: Date)=>Poll;
    getPollById: (pollId: string)=>Poll | undefined,
    getPollByName: (pollName: string) =>Poll | undefined,
    getPollResult: (poll: Poll)=>CandidateResults[]
    addVoteToPoll: (poll: Poll, vote: Vote) => void
}