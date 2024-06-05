interface CandidateProfile {
    candidateName: string,
    majorityJudgment: {
        majorityMention: string,
        majorityPercent: number
    }
    mentionResults: MentionResult[]
}