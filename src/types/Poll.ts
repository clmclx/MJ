interface Poll {
    id: string;
    electionName: string;
    startDate?: Date;
    endDate?: Date;
    voters: string[];
    candidates: string[];
    mentions: Mention[];
    votes: Vote[];
}
