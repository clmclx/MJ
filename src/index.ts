import { LocalPollRepository } from "./pollRepository/LocalPollRepository"

const electionName = "test européennes"
const candidates = [
    "Manon Aubry (LFI)",
    "Leon Deffontaines (PCF)",
    "Nathalie Arthaud (Lutte Ouvriere)",
    "Selma Labib (NPA)",
    "Raphael Glucksmann (PS)",
    "Pierre Larrouturou (Nouvelle donne)",
    "Guillaume Lacroix (Europe territoires ecologie)",
    "Marie Toussaint (EELV)",
    "Jean Marc Governatori (Ecologie au centre)",
    "Marine Cholley (Equinoxe)",
    "Valerie Hayer (Renaissance)",
    "Francois Xavier Bellamy (LR)",
    "Jordan Bardella (RN)",
    "Marion Marechal (Reconquete)",
    "Florian Philippot (Les patriotes)",
    "Helene Thouy (Animaliste)",
    "Caroline Zorn (parti pirate)",
    "Francois Asselineau (Union populaire republicaine)",
    "Yves Gernigon (Parti federaliste européen)",
    "Thierry Paul Valette (Europe Equitable)",
    "Jean Lassalle (Alliance Rurale)",
    "Georges Kuzmanovic (Nous le peuple)"
]

const candidateSubset = [
    "Manon Aubry (LFI)",
    "Selma Labib (NPA)",
    "Raphael Glucksmann (PS)",
    "Marie Toussaint (EELV)",
    "Valerie Hayer (Renaissance)",
    "Francois Xavier Bellamy (LR)",
    "Jordan Bardella (RN)",
]
const tresBien: Mention = {
    name: "tres bien",
    value: 6,

}

const bien: Mention = {
    name: "bien",
    value: 5,

}

const assezBien: Mention = {
    name: "assez bien",
    value: 4,

}

const passable: Mention = {
    name: "passable",
    value: 3,

}

const insuffisant: Mention = {
    name: "insuffisant",
    value: 2,

}

const aRejeter: Mention = {
    name: "a rejeter",
    value: 1,

}


const mentions = [tresBien, bien, assezBien, passable, insuffisant, aRejeter]

const voters = ["Alain", "Bernard", "Gertrude"]

const européennes: Poll = LocalPollRepository.createPoll(electionName,candidateSubset, mentions,voters,
 new Date(),
  new Date(2024, 6, 9));



const voteAlain: Vote = {
    pollId: européennes.id,
    userId: "Alain",
    votedMentions: {
        "Manon Aubry (LFI)": "a rejeter",
        "Selma Labib (NPA)": "a rejeter",
        "Raphael Glucksmann (PS)": "passable",
        "Marie Toussaint (EELV)": "bien",
        "Valerie Hayer (Renaissance)": "passable",
        "Francois Xavier Bellamy (LR)":  "insuffisant",
        "Jordan Bardella (RN)": "a rejeter"
    }
}

const voteBernard: Vote = {
    pollId: européennes.id,
    userId: "Bernard",
    votedMentions: {
        "Manon Aubry (LFI)": "bien",
        "Selma Labib (NPA)": "a rejeter",
        "Raphael Glucksmann (PS)": "passable",
        "Marie Toussaint (EELV)": "tres bien",
        "Valerie Hayer (Renaissance)": "passable",
        "Francois Xavier Bellamy (LR)":  "passable",
        "Jordan Bardella (RN)": "a rejeter"
    }
}

const voteGertrude: Vote = {
    pollId: européennes.id,
    userId: "Gertrude",
    votedMentions: {
        "Manon Aubry (LFI)": "a rejeter",
        "Selma Labib (NPA)": "a rejeter",
        "Raphael Glucksmann (PS)": "bien",
        "Marie Toussaint (EELV)": "assez bien",
        "Valerie Hayer (Renaissance)": "tres bien",
        "Francois Xavier Bellamy (LR)": "passable",
        "Jordan Bardella (RN)": "a rejeter"
    }
}


LocalPollRepository.addVoteToPoll(européennes, voteAlain)
LocalPollRepository.addVoteToPoll(européennes, voteBernard)
LocalPollRepository.addVoteToPoll(européennes, voteGertrude)



const results: Record<string, MentionResult[]> = LocalPollRepository.getPollResult(européennes)



console.log(results)
