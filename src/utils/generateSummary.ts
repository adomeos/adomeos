import { Answer } from '@/types/quiz';

interface SummaryProfile {
  // Rythme de vie
  restIssue: 'extreme' | 'cant_stop' | 'guilt' | 'healthy';
  morningRoutine: 'phone_addict' | 'strict' | 'inconsistent' | 'relaxed';
  dayOff: 'busy' | 'work_anyway' | 'lost' | 'enjoys';
  
  // Objectifs
  goalFeeling: 'next_please' | 'never_enough' | 'numb' | 'celebrates';
  lastPleasure: 'forgotten' | 'guilt_after' | 'dont_know' | 'regular';
  
  // Corps
  sleep: 'minimal' | 'tired_anyway' | 'irregular' | 'good';
  food: 'forgets' | 'fuel_only' | 'cycles' | 'balanced';
  
  // Mental
  innerVoice: 'not_enough' | 'fear_collapse' | 'comparison' | 'kind';
  mask: 'always' | 'sometimes' | 'lost_identity' | 'authentic';
  emptyPhrase: 'exactly' | 'partly' | 'not_really' | 'not_at_all';
  
  // Parcours
  triedSolutions: string[];
  solutionResult: 'relapsed' | 'didnt_help' | 'helped_bit' | 'worked';
  
  // État
  exhaustionLevel: number;
  
  // Projection
  futureVision: 'more_exhausted' | 'scared' | 'burnout' | 'fine';
  readyToChange: 'now_or_never' | 'afraid_but_yes' | 'unsure' | 'not_really';
}

const solutionLabels: Record<string, string> = {
  '1': 'la thérapie',
  '2': 'le dev perso',
  '3': 'les routines',
  '4': 'le coaching',
  '5': 'les médocs',
  '6': 'le sport',
  '7': 'rien',
};

function getAnswerValue(answers: Answer[], questionId: number): string | number | string[] | undefined {
  const answer = answers.find(a => a.questionId === questionId);
  return answer?.value;
}

function mapAnswerToProfile(answers: Answer[]): SummaryProfile {
  const getStringAnswer = (id: number): string => {
    const val = getAnswerValue(answers, id);
    return typeof val === 'string' ? val : '';
  };

  const getArrayAnswer = (id: number): string[] => {
    const val = getAnswerValue(answers, id);
    return Array.isArray(val) ? val : [];
  };

  const getNumberAnswer = (id: number): number => {
    const val = getAnswerValue(answers, id);
    return typeof val === 'number' ? val : 5;
  };

  // Map each answer to profile traits
  const restMap: Record<string, SummaryProfile['restIssue']> = {
    'A': 'extreme',
    'B': 'cant_stop',
    'C': 'guilt',
    'D': 'healthy',
  };

  const morningMap: Record<string, SummaryProfile['morningRoutine']> = {
    'A': 'phone_addict',
    'B': 'strict',
    'C': 'inconsistent',
    'D': 'relaxed',
  };

  const goalMap: Record<string, SummaryProfile['goalFeeling']> = {
    'A': 'next_please',
    'B': 'never_enough',
    'C': 'numb',
    'D': 'celebrates',
  };

  const sleepMap: Record<string, SummaryProfile['sleep']> = {
    'A': 'minimal',
    'B': 'tired_anyway',
    'C': 'irregular',
    'D': 'good',
  };

  const foodMap: Record<string, SummaryProfile['food']> = {
    'A': 'forgets',
    'B': 'fuel_only',
    'C': 'cycles',
    'D': 'balanced',
  };

  const dayOffMap: Record<string, SummaryProfile['dayOff']> = {
    'A': 'busy',
    'B': 'work_anyway',
    'C': 'lost',
    'D': 'enjoys',
  };

  const voiceMap: Record<string, SummaryProfile['innerVoice']> = {
    'A': 'not_enough',
    'B': 'fear_collapse',
    'C': 'comparison',
    'D': 'kind',
  };

  const pleasureMap: Record<string, SummaryProfile['lastPleasure']> = {
    'A': 'forgotten',
    'B': 'guilt_after',
    'C': 'dont_know',
    'D': 'regular',
  };

  const maskMap: Record<string, SummaryProfile['mask']> = {
    'A': 'always',
    'B': 'sometimes',
    'C': 'lost_identity',
    'D': 'authentic',
  };

  const phraseMap: Record<string, SummaryProfile['emptyPhrase']> = {
    'A': 'exactly',
    'B': 'partly',
    'C': 'not_really',
    'D': 'not_at_all',
  };

  const resultMap: Record<string, SummaryProfile['solutionResult']> = {
    'A': 'relapsed',
    'B': 'didnt_help',
    'C': 'helped_bit',
    'D': 'worked',
  };

  const futureMap: Record<string, SummaryProfile['futureVision']> = {
    'A': 'more_exhausted',
    'B': 'scared',
    'C': 'burnout',
    'D': 'fine',
  };

  const readyMap: Record<string, SummaryProfile['readyToChange']> = {
    'A': 'now_or_never',
    'B': 'afraid_but_yes',
    'C': 'unsure',
    'D': 'not_really',
  };

  return {
    restIssue: restMap[getStringAnswer(1)] || 'healthy',
    morningRoutine: morningMap[getStringAnswer(2)] || 'relaxed',
    goalFeeling: goalMap[getStringAnswer(3)] || 'celebrates',
    sleep: sleepMap[getStringAnswer(5)] || 'good',
    food: foodMap[getStringAnswer(6)] || 'balanced',
    dayOff: dayOffMap[getStringAnswer(7)] || 'enjoys',
    innerVoice: voiceMap[getStringAnswer(8)] || 'kind',
    lastPleasure: pleasureMap[getStringAnswer(10)] || 'regular',
    exhaustionLevel: getNumberAnswer(11),
    mask: maskMap[getStringAnswer(12)] || 'authentic',
    emptyPhrase: phraseMap[getStringAnswer(13)] || 'not_at_all',
    triedSolutions: getArrayAnswer(14),
    solutionResult: resultMap[getStringAnswer(15)] || 'worked',
    futureVision: futureMap[getStringAnswer(16)] || 'fine',
    readyToChange: readyMap[getStringAnswer(17)] || 'not_really',
  };
}

function generatePhrases(profile: SummaryProfile): string[] {
  const phrases: string[] = [];

  // Bloc 1 : Rythme de vie (haute priorité)
  if (profile.restIssue === 'extreme') {
    phrases.push("Tu te reposes jamais.");
  } else if (profile.restIssue === 'cant_stop') {
    phrases.push("Tu sais que tu devrais te reposer, mais y'a toujours un truc à faire.");
  }

  if (profile.morningRoutine === 'phone_addict') {
    phrases.push("Le matin, t'es déjà sur ton téléphone avant même de te lever.");
  } else if (profile.morningRoutine === 'strict') {
    phrases.push("T'as une routine stricte, pas le choix.");
  }

  if (profile.dayOff === 'work_anyway') {
    phrases.push("Même tes jours off, tu travailles.");
  } else if (profile.dayOff === 'lost') {
    phrases.push("Quand t'as du temps libre, tu sais pas quoi faire de toi.");
  }

  // Bloc 4 : Mental (haute priorité)
  if (profile.innerVoice === 'not_enough') {
    phrases.push("Ta voix intérieure te dit que t'es jamais assez bien.");
  } else if (profile.innerVoice === 'fear_collapse') {
    phrases.push("T'as peur que tout s'effondre si tu relâches.");
  }

  if (profile.mask === 'always') {
    phrases.push("Tu portes un masque. Personne sait vraiment ce qui se passe.");
  } else if (profile.mask === 'lost_identity') {
    phrases.push("T'as même plus l'impression de savoir qui tu es.");
  }

  if (profile.emptyPhrase === 'exactly') {
    phrases.push("Cette phrase sur le vide intérieur ? Elle te parle direct.");
  }

  // Bloc 6 : État actuel (haute priorité)
  if (profile.exhaustionLevel >= 7) {
    phrases.push(`Aujourd'hui, t'es à ${profile.exhaustionLevel}/10 sur l'échelle de l'épuisement.`);
  } else if (profile.exhaustionLevel >= 5) {
    phrases.push(`T'es à ${profile.exhaustionLevel}/10 niveau épuisement.`);
  }

  // Bloc 5 : Parcours (haute priorité)
  if (profile.triedSolutions.length >= 3) {
    const solutionsList = profile.triedSolutions
      .slice(0, 3)
      .map(s => solutionLabels[s] || s)
      .filter(s => s !== 'rien')
      .join(', ');
    if (solutionsList) {
      phrases.push(`T'as déjà essayé ${solutionsList}.`);
    }
  } else if (profile.triedSolutions.includes('7')) {
    phrases.push("T'essaies de tout gérer seul.");
  }

  if (profile.solutionResult === 'relapsed') {
    phrases.push("Ça a marché un temps, puis t'as rechuté.");
  } else if (profile.solutionResult === 'didnt_help') {
    phrases.push("Rien n'a vraiment fonctionné.");
  }

  // Bloc 7 : Projection et motivation (haute priorité)
  if (profile.futureVision === 'burnout') {
    phrases.push("Tu vois le burnout arriver.");
  } else if (profile.futureVision === 'more_exhausted') {
    phrases.push("Tu sais que si tu changes rien, ça va empirer.");
  }

  if (profile.readyToChange === 'now_or_never') {
    phrases.push("Mais t'es prêt à changer.");
  } else if (profile.readyToChange === 'afraid_but_yes') {
    phrases.push("T'as peur de pas y arriver, mais t'es prêt à essayer.");
  }

  // Bloc 2 : Rapport aux objectifs (moyenne priorité)
  if (profile.goalFeeling === 'next_please') {
    phrases.push("Quand t'atteins un objectif, tu passes direct au suivant.");
  } else if (profile.goalFeeling === 'never_enough') {
    phrases.push("C'est jamais assez bien pour toi.");
  }

  if (profile.lastPleasure === 'forgotten') {
    phrases.push("Le plaisir sans objectif ? T'as oublié ce que c'est.");
  } else if (profile.lastPleasure === 'dont_know') {
    phrases.push("T'as du mal à savoir ce qui te fait plaisir.");
  }

  // Bloc 3 : Corps (priorité plus basse)
  if (profile.sleep === 'minimal') {
    phrases.push("Ton sommeil ? 4-5h et tu te dis que ça suffit.");
  } else if (profile.sleep === 'tired_anyway') {
    phrases.push("Tu dors, mais tu te réveilles fatigué.");
  }

  if (profile.food === 'forgets') {
    phrases.push("Tu manges devant l'écran sans t'en rendre compte.");
  } else if (profile.food === 'cycles') {
    phrases.push("Régimes stricts puis craquages. Tu contrôles pas.");
  }

  return phrases;
}

export function generateSummary(answers: Answer[]): string {
  const profile = mapAnswerToProfile(answers);
  const allPhrases = generatePhrases(profile);
  
  // Assemble phrases respecting 600 character limit
  let summary = '';
  const maxLength = 580; // Leave room for closing
  
  for (const phrase of allPhrases) {
    const potentialSummary = summary ? `${summary} ${phrase}` : phrase;
    if (potentialSummary.length <= maxLength) {
      summary = potentialSummary;
    }
  }
  
  // Add empathetic closing
  const closing = " On a compris. On va t'aider.";
  if ((summary + closing).length <= 600) {
    summary += closing;
  }
  
  return summary;
}
