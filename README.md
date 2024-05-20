MJ platform:


voting schema:
	Poll:
		- options: List [string] // the options for which we have to give mentions
		- mentions: List [string] // The mentions available for each option
		- voters: List [UID] // the list of voters
		- votes: List [Vote] // the records of each vote
		- algorithm: string //The algorithms which will compute the mention
		- startDate: Date  // the date for the start of the vote
		- endDate: Date // the limit date for which to vote


	Vote:
		- pollId: Poll
		- userId: userId // unique identifier for the vote
		- vote : Map<string, string>  // Mapping the option to the mentions

	User:
		- userId: String // alphanumeric string
		- email: string
		- password: string


