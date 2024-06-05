interface PollRepository {
    createPoll: (elctionName: string, candidate: string[], mentions: Mention[], voters: string[], startDate: Date, endDate: Date)=>Poll;
    getPollById: (pollId: string)=>Poll | undefined,
    getPollByName: (pollName: string) =>Poll | undefined,
    getPollResult: (poll: Poll)=>Record<string, MentionResult[]>,
    addVoteToPoll: (poll: Poll, vote: Vote) => void
}