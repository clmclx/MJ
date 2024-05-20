interface Vote {
    pollId: string,
    userId: string,
    votedMentions: Record<string, string>
}