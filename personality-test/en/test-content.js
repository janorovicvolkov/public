window.personalityTestContent = {
  locale: 'en',
  functionPrompts: {
    Ni: ['Introverted intuition', ['I often arrive at one central interpretation after reflecting on several details.', 'I look for the longer-term direction a situation seems to be taking.', 'A quiet sense of where an idea is leading often guides my attention.', 'I prefer to focus on underlying meaning rather than every possible explanation.']],
    Ne: ['Extraverted intuition', ['One idea often leads me to several other possibilities.', 'I enjoy exploring alternate interpretations, even when one answer seems likely.', 'I am quick to imagine different ways a plan could develop.', 'Brainstorming with other people often sparks more ideas for me.']],
    Si: ['Introverted sensing', ['I compare a new experience with details I remember from similar situations.', 'Familiar routines help me stay grounded and consistent.', 'I notice when something differs from how I remember it.', 'I value methods that have worked reliably in my own experience.']],
    Se: ['Extraverted sensing', ['I respond quickly to what is happening around me in the moment.', 'I enjoy learning by directly trying something out.', 'I notice changes in my immediate surroundings as they happen.', 'I prefer engaging with what is real and present over imagining distant outcomes.']],
    Ti: ['Introverted thinking', ['I work to make my own understanding of a subject internally consistent.', 'I like taking an idea apart to see precisely how its pieces fit together.', 'I refine definitions until they express the distinction I have in mind.']],
    Te: ['Extraverted thinking', ['I organize tasks around clear objectives and measurable progress.', 'I look for practical methods that help a group reach a decision efficiently.', 'I prefer plans that make responsibilities and next steps explicit.']],
    Fi: ['Introverted feeling', ['I check whether a choice feels true to my own values before committing to it.', 'I have strong personal convictions even when I do not talk about them often.', 'I try to understand what feels personally meaningful to each individual.']],
    Fe: ['Extraverted feeling', ['I notice the emotional tone of a group and adjust how I communicate.', 'I try to find an approach that helps people feel included and understood.', 'Shared expectations and mutual consideration matter to me in a group.']]
  },
  enneagramPrompts: {
    1: ['I notice quickly when something could be done more correctly.', 'I feel responsible for holding myself to high standards.', 'I can be hard on myself for small mistakes.', 'It matters to me that my actions match my principles.', 'I often feel there is a right way that deserves to be followed.', 'I get tense when people treat important responsibilities casually.', 'I try to improve systems that seem careless or unfair.', 'I find it difficult to relax when something feels unfinished.'],
    2: ['I naturally look for ways to be helpful to people I care about.', 'Feeling appreciated matters more to me than I usually admit.', 'I can sense when someone needs support, even if they do not ask.', 'I sometimes put another person’s needs ahead of my own.', 'I enjoy being someone others can rely on emotionally.', 'I feel hurt when my care is taken for granted.', 'I often build closeness by offering practical or personal help.', 'It can be difficult for me to ask directly for what I need.'],
    3: ['I like making visible progress toward goals that matter to me.', 'I adapt how I present myself to suit the setting.', 'Being seen as capable is important to me.', 'I feel uneasy when I seem unproductive for too long.', 'I enjoy finding an effective route to a desired result.', 'I often measure success by whether a goal was achieved.', 'I work hard to recover quickly when a plan fails.', 'Recognition can give me a strong sense that my effort counted.'],
    4: ['I want my choices to feel personal and true to who I am.', 'I notice emotional nuances that are easy to miss.', 'I am drawn to what feels distinctive rather than conventional.', 'I sometimes compare my inner life with what others seem to have.', 'I value being understood for my particular perspective.', 'My feelings can be intense and meaningful to me.', 'I look for personal significance in experiences.', 'A sense of longing or incompleteness can stay with me.'],
    5: ['I need enough privacy and quiet to think clearly.', 'I prefer to understand a subject before getting involved in it.', 'I protect my time and energy carefully.', 'I often observe a situation before deciding how to participate.', 'I feel more confident when I have built a solid knowledge base.', 'Too many demands from others can make me withdraw.', 'I like solving problems by breaking them into parts.', 'I am selective about how much of myself I share.'],
    6: ['I naturally consider what might go wrong so I can prepare.', 'Trust is something I build through consistency over time.', 'I often test an idea before relying on it.', 'Having dependable people around me brings reassurance.', 'I notice when rules or expectations are unclear.', 'I can be both cautious about authority and loyal to good leaders.', 'I think through backup plans when something important is at stake.', 'Uncertainty can make it hard for me to settle on a decision.'],
    7: ['I look for possibilities when a situation starts to feel limiting.', 'I enjoy having several appealing options to choose from.', 'I use humor or new plans to lift a difficult mood.', 'I am energized by variety and fresh experiences.', 'I dislike feeling trapped in a repetitive routine.', 'I tend to focus on what could be enjoyable or exciting next.', 'I can move quickly from a disappointment toward a new idea.', 'I often keep plans flexible in case something better appears.'],
    8: ['I would rather address a conflict directly than let it linger.', 'I value being able to make my own decisions.', 'I step in when I think someone is being pushed around.', 'I communicate strongly when something matters to me.', 'I dislike feeling controlled by another person.', 'I respect people who are straightforward and stand their ground.', 'I can take charge when a situation needs decisive action.', 'I prefer to show strength rather than expose vulnerability too quickly.'],
    9: ['I try to understand several sides before taking a position.', 'A calm, steady environment helps me feel most like myself.', 'I sometimes put off a decision to avoid unnecessary friction.', 'I can adapt to other people’s preferences without much fuss.', 'I want disagreements to end with a sense of mutual understanding.', 'I may overlook my own priorities while keeping a group comfortable.', 'I prefer a manageable pace to constant urgency.', 'It can take time for me to notice how strongly I feel about something.']
  },
  typeStacks: {
    ISTJ: ['Si', 'Te', 'Fi', 'Ne'], ISFJ: ['Si', 'Fe', 'Ti', 'Ne'], INFJ: ['Ni', 'Fe', 'Ti', 'Se'], INTJ: ['Ni', 'Te', 'Fi', 'Se'],
    ISTP: ['Ti', 'Se', 'Ni', 'Fe'], ISFP: ['Fi', 'Se', 'Ni', 'Te'], INFP: ['Fi', 'Ne', 'Si', 'Te'], INTP: ['Ti', 'Ne', 'Si', 'Fe'],
    ESTP: ['Se', 'Ti', 'Fe', 'Ni'], ESFP: ['Se', 'Fi', 'Te', 'Ni'], ENFP: ['Ne', 'Fi', 'Te', 'Si'], ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
    ESTJ: ['Te', 'Si', 'Ne', 'Fi'], ESFJ: ['Fe', 'Si', 'Ne', 'Ti'], ENFJ: ['Fe', 'Ni', 'Se', 'Ti'], ENTJ: ['Te', 'Ni', 'Se', 'Fi']
  },
  typeDescriptions: {
    1: 'You may be guided by a wish to act with integrity and make things better. Notice whether high standards help you, or leave too little room for rest and imperfection.',
    2: 'You may be guided by a wish to offer care and build close relationships. Notice whether giving comes freely, or makes it harder to name your own needs.',
    3: 'You may be guided by a wish to make meaningful progress and contribute effectively. Notice whether achievement reflects what matters to you, or mainly how success looks.',
    4: 'You may be guided by a wish to live with depth and personal meaning. Notice whether honoring your individuality also leaves room for ordinary, steady belonging.',
    5: 'You may be guided by a wish to understand and feel capable. Notice when thoughtful boundaries support you, and when they become a reason to stay at a distance.',
    6: 'You may be guided by a wish for trust, reliability, and preparedness. Notice how your careful questions help you, and when uncertainty asks for more reassurance than it can provide.',
    7: 'You may be guided by a wish for freedom, possibility, and engaging experiences. Notice whether seeking the next option helps you stay open, or makes it harder to be present.',
    8: 'You may be guided by a wish for autonomy and protection from unfair control. Notice how your willingness to act can create safety, while still making space for mutual influence.',
    9: 'You may be guided by a wish for inner steadiness and connection. Notice whether keeping the peace includes your own priorities and preferences.'
  },
  centers: { head: [5, 6, 7], heart: [2, 3, 4], gut: [8, 9, 1] },
  ui: {
    saved: 'Progress saved on this device', savedTemporary: 'Progress available until this tab closes', outOfFive: 'of 5',
    questionAria: (number) => `How much statement ${number} sounds like you`,
    progress: (answered, total) => `${answered} of ${total} answered`, page: (current, total) => `Page ${current} of ${total}`,
    back: 'Back', continue: 'Continue', seeResults: 'See results', required: 'Choose an answer for each statement to continue.',
    typeWing: (type, wing) => `Type ${type}w${wing}`, typeLabel: (type) => `Type ${type}`,
    wingExplanation: 'The wing is the adjacent type with the higher score in this test.',
    tritypeDescription: 'One leading pattern from each center, with your highest scoring type first. The other types represent the leading patterns in the remaining centers. Treat this as a possible combination to explore, not a definitive classification.'
  }
};
