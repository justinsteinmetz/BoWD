// ===== CHARACTER ICONS (inline SVG) =====
const CHAR_ICONS = {
  opal:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="11" r="5"/><line x1="22" y1="16" x2="22" y2="30"/><line x1="22" y1="20" x2="9" y2="15"/><line x1="22" y1="20" x2="35" y2="15"/><line x1="22" y1="30" x2="16" y2="40"/><line x1="22" y1="30" x2="28" y2="40"/></svg>`,
  winn:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 18 Q9 8 22 7 Q35 6 35 18 Q36 28 22 31 Q8 29 10 18Z"/><path d="M10 18 Q5 12 7 22 Q9 28 12 26"/><path d="M35 18 Q39 12 37 22 Q35 28 32 26"/><circle cx="17" cy="17" r="1.5" fill="#574E45"/><circle cx="27" cy="17" r="1.5" fill="#574E45"/><path d="M14 24 Q18 29 22 29 Q26 29 30 24"/><line x1="19" y1="27" x2="19" y2="29"/><line x1="22" y1="28" x2="22" y2="30"/><line x1="25" y1="27" x2="25" y2="29"/></svg>`,
  preacher: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 Q14 9 7 12 L7 36 Q14 33 22 34Z"/><path d="M22 10 Q30 9 37 12 L37 36 Q30 33 22 34Z"/><line x1="22" y1="10" x2="22" y2="34"/><line x1="11" y1="17" x2="20" y2="17"/><line x1="11" y1="21" x2="20" y2="21"/><line x1="11" y1="25" x2="20" y2="25"/><line x1="24" y1="17" x2="33" y2="17"/><line x1="24" y1="21" x2="33" y2="21"/><line x1="24" y1="25" x2="33" y2="25"/></svg>`,
  franny:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="22" r="8"/><circle cx="30" cy="22" r="8"/><path d="M22 20 Q22 22 22 24"/><line x1="6" y1="19" x2="3" y2="16"/><line x1="38" y1="19" x2="41" y2="16"/></svg>`,
  gloria:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 36 Q8 26 8 17 Q8 9 15 9 Q19 9 22 13 Q25 9 29 9 Q36 9 36 17 Q36 26 22 36Z"/></svg>`,
  otis:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" fill="none" stroke="#574E45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="6" x2="22" y2="20"/><rect x="19" y="4" width="6" height="5" rx="1"/><ellipse cx="22" cy="32" rx="9" ry="10"/><path d="M13 28 Q10 32 13 36"/><path d="M31 28 Q34 32 31 36"/><circle cx="22" cy="32" r="3"/><line x1="22" y1="9" x2="22" y2="22"/><line x1="19" y1="13" x2="25" y2="13"/><line x1="19" y1="17" x2="25" y2="17"/></svg>`,
};

// ===== BLOCKS DATA =====
// Five chapter blocks covering the full novel.
// Each block has its own zones array.
// Zone types: vocab | quiz | charmap | craft | rewrite | creative | extension

const BLOCKS = [

  // ══════════════════════════════════════════════════════════
  // BLOCK 1 — Chapters 1–5
  // Arrival. The dog. The ten things. Loneliness introduced.
  // ══════════════════════════════════════════════════════════
  {
    id: "b1",
    title: "Arrival",
    chapters: "Chapters 1–5",
    locked: false,
    zones: [

      {
        id: "b1z1", type: "vocab",
        title: "Word Wall",
        subtitle: "Chapters 1–5",
        teacherNote: "Tap each card to reveal the definition. Before flipping, ask: does this word feel positive, negative, or somewhere in between?",
        words: [
          { word: "melancholy",   hint: "an adjective", def: "A deep, quiet sadness — the kind that settles in and stays a while." },
          { word: "peculiar",     hint: "an adjective", def: "Strange or unusual in a way that makes you stop and stare." },
          { word: "recalled",     hint: "a verb",       def: "Brought a memory back to mind; remembered." },
          { word: "stray",        hint: "a noun/adj",   def: "An animal (or person) with no home, wandering on its own." },
          { word: "congregation", hint: "a noun",       def: "A group of people gathered together, often for a shared purpose." },
          { word: "prideful",     hint: "an adjective", def: "Too proud — feeling better than others in a way that can hurt." },
          { word: "tolerate",     hint: "a verb",       def: "To put up with something even when it's hard or uncomfortable." },
          { word: "impact",       hint: "a noun",       def: "The strong effect one thing has on another." }
        ]
      },

      {
        id: "b1z2", type: "quiz",
        title: "Check-In",
        subtitle: "Chapters 1–5",
        teacherNote: "Self-marking comprehension check. Review any question with a low class score before moving on.",
        questions: [
          {
            q: "Where does Opal find Winn-Dixie at the beginning of the story?",
            opts: ["At the park", "In a Winn-Dixie supermarket", "Outside the church", "In her garden"],
            correct: 1,
            explain: "Opal finds the big, ugly dog causing chaos inside the Winn-Dixie grocery store — and names him after it."
          },
          {
            q: "Why doesn't Opal know much about her mother?",
            opts: ["Her mother is very private", "Her mother left when Opal was three", "Her mother lives far away", "Her mother has lost her memory"],
            correct: 1,
            explain: "Opal's mother left the family when Opal was only three years old. The preacher rarely talks about her."
          },
          {
            q: "What unusual thing can Winn-Dixie do that makes people smile?",
            opts: ["He can dance on his hind legs", "He fetches the newspaper", "He smiles — showing all his teeth", "He can open doors"],
            correct: 2,
            explain: "Winn-Dixie's enormous grin, teeth and all, is one of his most endearing (and slightly alarming) features."
          },
          {
            q: "What is Opal's father's job in Naomi?",
            opts: ["He is a teacher", "He is a librarian", "He is a preacher", "He is a shopkeeper"],
            correct: 2,
            explain: "Opal's father is the preacher at the Open Arms Baptist Church of Naomi, Florida."
          },
          {
            q: "What does the preacher tell Opal about her mother when she asks?",
            opts: ["He refuses to say anything", "He tells her ten things about her mother", "He shows her old photographs", "He says he will tell her when she is older"],
            correct: 1,
            explain: "The preacher agrees to tell Opal ten things about her mother — one for each year of Opal's life."
          }
        ]
      },

      {
        id: "b1z3", type: "charmap",
        title: "Who's Who",
        subtitle: "Characters so far",
        teacherNote: "Students explore each character before writing. Use the open question as a discussion starter — there's no right answer.",
        prompt: "Which character surprises you most, and why?",
        characters: [
          {
            name: "Opal", icon: "opal",
            role: "Our narrator",
            traits: ["Lonely but brave", "Asks big questions", "Collects people like treasures"],
            think: "Opal talks to strangers, animals, and the sky. What does that tell us about her?"
          },
          {
            name: "Winn-Dixie", icon: "winn",
            role: "The dog",
            traits: ["Smiles with all his teeth", "Afraid of thunder", "Brings people together"],
            think: "Winn-Dixie can't speak — but how does DiCamillo make him feel like a character with feelings?"
          },
          {
            name: "The Preacher", icon: "preacher",
            role: "Opal's father",
            traits: ["Quiet and careful", "Loves Opal deeply", "Carries sadness he doesn't show"],
            think: "Why do you think the preacher finds it so hard to talk about Opal's mother?"
          }
        ]
      },

      {
        id: "b1z4", type: "craft",
        title: "Writer's Craft",
        subtitle: "Simile & Tone",
        teacherNote: "Work through each quote together or independently. The reveal is for after students have had a go — not before.",
        similes: [
          {
            quote: "The preacher sat there looking like a turtle that had pulled its head back inside its shell.",
            highlight: "like a turtle that had pulled its head back inside its shell",
            question: "What feeling does this simile create? What can't the preacher do right now?",
            answer: "The simile shows the preacher withdrawing — he can't or won't come out and face Opal's question. Turtles hide when they feel unsafe. DiCamillo uses this to show that grief can make us retreat from the people who need us most."
          },
          {
            quote: "Winn-Dixie looked up at me and wagged his tail and smiled his big smile, and I could see he was going to be trouble.",
            highlight: "I could see he was going to be trouble",
            question: "This isn't a simile — it's understatement. Why is saying less sometimes more powerful?",
            answer: "By saying it quietly ('I could see'), Opal sounds like she already loves the dog and doesn't mind the trouble at all. Understatement lets readers feel the warmth without being told how to feel. It trusts us."
          }
        ]
      },

      {
        id: "b1z5", type: "extension",
        title: "Go Deeper",
        subtitle: "Block 1",
        teacherNote: "No single right answer. Use the reveals to extend discussion, not close it.",
        questions: [
          {
            q: "The preacher gives Opal ten things about her mother. Why does he do it that way — in a list — rather than just talking about her?",
            reveal: "A list is controlled. It has edges. Talking freely about someone you've lost — and feel guilty about losing — is much harder to stop once it starts. The preacher's ten things are a form of self-protection as much as a gift. Opal doesn't see that yet, but the reader might."
          },
          {
            q: "Winn-Dixie is described as ugly, smelly, and a mess. Why do you think DiCamillo chose to make him look like that?",
            reveal: "Because nobody who matters in this novel is beautiful on the surface. The dog matches the town, the people, the grief. DiCamillo is making a quiet argument: that the things worth loving rarely announce themselves. Opal sees past the surface immediately — that's character."
          }
        ]
      }

    ]
  },

  // ══════════════════════════════════════════════════════════
  // BLOCK 2 — Chapters 6–10
  // Miss Franny. Otis. Gloria. Strangers become something more.
  // ══════════════════════════════════════════════════════════
  {
    id: "b2",
    title: "Strangers",
    chapters: "Chapters 6–10",
    locked: true,
    zones: [

      {
        id: "b2z1", type: "vocab",
        title: "Word Wall",
        subtitle: "Chapters 6–10",
        teacherNote: "Before revealing, ask students to guess from context. Which of these words could describe a person? Which could describe a feeling?",
        words: [
          { word: "overwhelmed",  hint: "an adjective", def: "When something is too big or heavy to deal with — emotionally or physically." },
          { word: "considerate",  hint: "an adjective", def: "Thoughtful about other people's feelings; kind in a quiet way." },
          { word: "genuine",      hint: "an adjective", def: "Real, true — not pretending or performing." },
          { word: "pathological", hint: "an adjective", def: "So extreme it seems like an illness — beyond normal behaviour." },
          { word: "intends",      hint: "a verb",       def: "Plans to do something; means to." },
          { word: "comfort",      hint: "a noun/verb",  def: "A feeling of ease after pain — or the act of giving that feeling to someone." },
          { word: "exception",    hint: "a noun",       def: "Someone or something that doesn't follow the usual rule." },
          { word: "mystery",      hint: "a noun",       def: "Something unknown, unexplained — that makes you want to look closer." }
        ]
      },

      {
        id: "b2z2", type: "quiz",
        title: "Check-In",
        subtitle: "Chapters 6–10",
        teacherNote: "Students get immediate feedback. If the class scores low on question 3, pause and discuss — it's the most important one.",
        questions: [
          {
            q: "What is Miss Franny Block's job?",
            opts: ["She is a teacher", "She is a librarian", "She is a shopkeeper", "She is a nurse"],
            correct: 1,
            explain: "Miss Franny Block is the librarian at the Herman W. Block Memorial Library — a library her father built in her honour."
          },
          {
            q: "What did Miss Franny once mistake for a bear?",
            opts: ["A large dog", "A man in a coat", "A real bear that wandered in", "A horse"],
            correct: 2,
            explain: "A real bear actually walked into the library. Miss Franny threw a book at it. It's one of her most prized stories."
          },
          {
            q: "What does Otis do in the pet shop that surprises Opal?",
            opts: ["He lets the animals run free", "He plays guitar and the animals gather to listen", "He talks to the animals in a different language", "He feeds them sweets"],
            correct: 1,
            explain: "Every morning before opening, Otis plays his guitar and the animals come out of their cages to listen. It's the novel's most quietly magical image."
          },
          {
            q: "What is unusual about Gloria Dump's eyesight?",
            opts: ["She is completely blind", "She can only see shapes and shadows", "Her eyes are very bad — she sees the world in a blur", "She wears thick glasses"],
            correct: 2,
            explain: "Gloria's eyes are so bad she can barely see — but DiCamillo makes clear she sees people more clearly than almost anyone else in the novel."
          },
          {
            q: "What does Gloria Dump have hanging in the tree in her garden?",
            opts: ["Wind chimes", "Old bottles — her 'mistake tree'", "Photographs", "Letters"],
            correct: 1,
            explain: "Gloria hangs bottles on a tree to remind herself of her past mistakes. She doesn't hide from them — she keeps them visible. It's one of the novel's most powerful images."
          }
        ]
      },

      {
        id: "b2z3", type: "craft",
        title: "Writer's Craft",
        subtitle: "Imagery & Character",
        teacherNote: "Focus on the second quote — the bottle tree is the novel's most sustained image. Give students time with it.",
        similes: [
          {
            quote: "She had the kind of laugh that made you want to be there with her in the sunlight.",
            highlight: "the kind of laugh that made you want to be there with her in the sunlight",
            question: "What does DiCamillo achieve by linking the laugh to sunlight? What does warmth have to do with laughter?",
            answer: "Sunlight stands for warmth, openness, and belonging. DiCamillo links sound to physical sensation — the laugh doesn't just sound nice, it makes you want to be physically near it. Gloria Dump's laugh is an invitation, not just a reaction."
          },
          {
            quote: "She said that was her mistake tree. She said she was trying to grow something that would outgrow the mistakes.",
            highlight: "trying to grow something that would outgrow the mistakes",
            question: "Gloria doesn't hide her mistakes — she plants them. What does this image say about how she deals with the past?",
            answer: "The bottle tree is an act of honesty and hope at the same time. Gloria knows she can't undo what she's done — but she can tend something living alongside it. DiCamillo suggests that forgiveness isn't erasure. It's growth next to the damage."
          }
        ]
      },

      {
        id: "b2z4", type: "rewrite",
        title: "Rewrite It",
        subtitle: "Craft in practice",
        teacherNote: "The source sentence is deliberately flat. Three rewrites, three techniques. Read versions aloud — compare what each one does to the reader's feeling, not which is 'best'.",
        sourceLine: "Otis played his guitar. The animals listened.",
        sourceNote: "True. But it gives nothing. No texture, no feeling, no reason to care.",
        tasks: [
          {
            id: "rw0",
            label: "Add a simile",
            instruction: "Rewrite using a comparison. What did the animals look like, gathered there? What does the music feel like in the room?",
            placeholder: "The animals sat like…  /  The music was like…",
            example: "The animals sat like children at a bedtime story, perfectly still, as if moving might make it stop."
          },
          {
            id: "rw1",
            label: "Add sensory detail",
            instruction: "Rewrite using sound, smell, or physical sensation. What would you actually hear, feel, or notice if you were standing in the doorway?",
            placeholder: "The air smelled of…  /  The only sound was…",
            example: "The only sound was the guitar. Even the parrot was quiet. The sawdust on the floor didn't move."
          },
          {
            id: "rw2",
            label: "Write it from an animal's point of view",
            instruction: "Pick one animal in the shop. Rewrite the moment from inside their experience — what do they feel when the music starts?",
            placeholder: "Choose an animal. What changes for them when the music begins?",
            example: "When the music started, something in my chest went loose. I didn't know what it was. I just stopped being afraid."
          }
        ]
      },

      {
        id: "b2z5", type: "extension",
        title: "Go Deeper",
        subtitle: "Block 2",
        teacherNote: "Start with the evidence task before opening discussion. Specific moments first — then interpretation.",
        questions: [
          {
            q: "Find one moment in chapters 6–10 where a character uses a story to connect with someone. Write one sentence describing the moment. Why does the story work where direct conversation might not?",
            reveal: "Miss Franny's bear story is the obvious one — but look also at Gloria asking Opal to tell her about Winn-Dixie, and Otis's guitar as a kind of wordless story. DiCamillo seems to suggest that stories are safer than conversation. They create a shared space where nobody has to be too exposed."
          },
          {
            q: "Gloria Dump tells Opal not to judge people by their mistakes. But she also keeps her mistake tree visible. Is that a contradiction — or does it make sense?",
            reveal: "It's not a contradiction — it's a distinction. Gloria isn't saying forget your mistakes. She's saying don't let them become the whole story of a person. She keeps the bottles visible so she can see them clearly, not so others can judge her by them. There's a difference between accountability and shame."
          }
        ]
      }

    ]
  },

  // ══════════════════════════════════════════════════════════
  // BLOCK 3 — Chapters 11–16
  // Sweetie Pie. The Dewberry boys. Littmus lozenges.
  // Community forming at the edges. Loss with a sweet taste.
  // ══════════════════════════════════════════════════════════
  {
    id: "b3",
    title: "Sweet & Sad",
    chapters: "Chapters 11–16",
    locked: true,
    zones: [

      {
        id: "b3z1", type: "vocab",
        title: "Word Wall",
        subtitle: "Chapters 11–16",
        teacherNote: "The word 'sorrow' is central to this block. Linger on it — ask students what the difference is between sorrow and sadness.",
        words: [
          { word: "sorrow",       hint: "a noun",       def: "A deep sadness, often about loss — heavier and quieter than ordinary sadness." },
          { word: "lozenge",      hint: "a noun",       def: "A small sweet (candy) dissolved slowly in the mouth — often used as medicine." },
          { word: "complicated",  hint: "an adjective", def: "Difficult to understand because many different feelings or ideas are mixed together." },
          { word: "prejudice",    hint: "a noun",       def: "An unfair opinion about someone based on who they are, not what they've done." },
          { word: "manufacture",  hint: "a verb",       def: "To make something, usually in large amounts, by a process." },
          { word: "afflicted",    hint: "an adjective", def: "Affected by something painful or difficult — suffering from something." },
          { word: "mournful",     hint: "an adjective", def: "Full of sadness, especially about something lost." },
          { word: "charitable",   hint: "an adjective", def: "Generous and kind — especially to people who are struggling." }
        ]
      },

      {
        id: "b3z2", type: "quiz",
        title: "Check-In",
        subtitle: "Chapters 11–16",
        teacherNote: "Question 4 is the most important — it's about the central metaphor of this block. If students get it wrong, discuss before moving on.",
        questions: [
          {
            q: "Who is Sweetie Pie Thomas?",
            opts: ["Opal's cousin", "A five-year-old girl who loves Winn-Dixie", "A girl from Opal's church", "The librarian's granddaughter"],
            correct: 1,
            explain: "Sweetie Pie Thomas is a little girl in Naomi who immediately falls in love with Winn-Dixie and wants a dog of her own for her birthday."
          },
          {
            q: "Who are the Dewberry boys?",
            opts: ["Two brothers who bully Opal", "Two brothers who become unlikely companions to Opal", "Boys from Opal's church", "Boys who don't like Winn-Dixie"],
            correct: 1,
            explain: "Dunlap and Stevie Dewberry are initially presented as antagonists — they call Gloria Dump a witch. But the relationship is more complicated than it first appears."
          },
          {
            q: "Who was Littmus W. Block, and what did he do?",
            opts: ["A local preacher who built a church", "A soldier who came home from war and built a sweet factory", "Miss Franny's father, who built the library", "A candy-maker who moved to Naomi"],
            correct: 1,
            explain: "Littmus W. Block was Miss Franny's great-great-grandfather. He fought in the Civil War, came home to find his family dead, and — instead of giving up — built a sweet factory. The Littmus lozenge is the result."
          },
          {
            q: "What is unusual about the taste of a Littmus lozenge?",
            opts: ["It tastes different to everyone", "It tastes sweet but also of sorrow", "It is extremely bitter", "It has no flavour at all"],
            correct: 1,
            explain: "The Littmus lozenge tastes sweet — but also of something sad. DiCamillo uses it to say that sweetness and sorrow can exist in the same moment. It's the novel's central metaphor in edible form."
          },
          {
            q: "What does Opal notice about what the lozenge makes different people think of?",
            opts: ["Everyone thinks of the same thing", "Each person thinks of something they miss or have lost", "Nobody can agree on what flavour it is", "The preacher refuses to eat one"],
            correct: 1,
            explain: "Each person's sorrow is different — but everyone who eats the lozenge finds it. Opal understands that loss is universal even when it's personal."
          }
        ]
      },

      {
        id: "b3z3", type: "craft",
        title: "Writer's Craft",
        subtitle: "Metaphor & Meaning",
        teacherNote: "The Littmus lozenge is the novel's most sustained metaphor. Push students past surface description — what is DiCamillo actually saying?",
        similes: [
          {
            quote: "The candy was sweet, but there was also something else — something sad. I tasted it — sorrow.",
            highlight: "something sad. I tasted it — sorrow.",
            question: "DiCamillo makes sorrow something you can taste. What does it mean to put an abstract feeling into physical form like this?",
            answer: "When you can taste something, it's real — undeniable. DiCamillo is saying that sorrow isn't just an idea or a mood. It's present, it sits in the body. Making it a taste also makes it something shared — everyone at the table experiences it at the same moment, even if it means different things to each of them."
          },
          {
            quote: "Littmus W. Block put the sadness of the world right into his candy and said, 'Here. Take some. It is for free.'",
            highlight: "put the sadness of the world right into his candy",
            question: "Why does Miss Franny say the sadness is 'for free'? What is DiCamillo saying about sorrow — is it a burden or something else?",
            answer: "Free means nobody chooses it, nobody buys it, nobody can avoid it. Littmus didn't manufacture sadness — he just named it honestly and put it somewhere people could encounter it in a safe, shared way. DiCamillo suggests that acknowledging grief, rather than hiding it, is its own kind of gift."
          }
        ]
      },

      {
        id: "b3z4", type: "creative",
        title: "Your Turn",
        subtitle: "Writing",
        teacherNote: "The lozenge prompt is deceptively rich. Give students time. The best responses will name something specific, not just 'sadness'.",
        mainPrompt: "Opal tastes the Littmus lozenge and it makes her think of her mother. If you could taste a Littmus lozenge right now, what would yours taste like — what would it make you think of? Write 6–10 sentences describing the taste and the memory it brings.",
        chips: [
          "Start with the physical taste — sweet, then something else",
          "Don't name the feeling — describe it as a sensation",
          "Write about a place, not just a person",
          "Begin with: 'At first it just tasted like…'",
          "End with what you do with the feeling once it arrives",
          "Write about something small that carries something large"
        ],
        placeholder: "The taste was sweet at first, but then…"
      },

      {
        id: "b3z5", type: "extension",
        title: "Go Deeper",
        subtitle: "Block 3",
        teacherNote: "These questions have more friction than the earlier blocks. That's intentional. Let disagreement happen.",
        questions: [
          {
            q: "The Littmus lozenge tastes of sorrow. Littmus could have left the sorrow out. Why didn't he — and does it make the candy better or worse?",
            reveal: "Littmus had just come home from war to find everything he loved gone. He couldn't pretend otherwise. The sorrow in the candy is an act of honesty — a refusal to make something falsely cheerful. DiCamillo's argument might be: sweetness without sorrow is just sugar. It's the combination that makes it real."
          },
          {
            q: "Opal is starting to build a community — Franny, Gloria, Otis, Sweetie Pie. But she didn't plan any of it. What actually causes these friendships to form?",
            reveal: "The dog. Shared stories. Loneliness meeting loneliness at the right moment. None of these friendships are the result of effort in the conventional sense — they happen because Opal is open, because Winn-Dixie creates occasions, and because most of these characters were already waiting for someone to knock. Community in this novel isn't built. It accumulates."
          }
        ]
      }

    ]
  },

  // ══════════════════════════════════════════════════════════
  // BLOCK 4 — Chapters 17–22
  // The party takes shape. Opal asks the hard questions.
  // The preacher begins to open. Forgiveness and grief.
  // ══════════════════════════════════════════════════════════
  {
    id: "b4",
    title: "Opening Up",
    chapters: "Chapters 17–22",
    locked: true,
    zones: [

      {
        id: "b4z1", type: "vocab",
        title: "Word Wall",
        subtitle: "Chapters 17–22",
        teacherNote: "Several of these words relate to inner states that are hard to name. Ask: which of these would Opal use? Which would the preacher use?",
        words: [
          { word: "forgiveness",  hint: "a noun",       def: "The act of choosing not to stay angry at someone for something they did." },
          { word: "abandoned",    hint: "a verb (past)", def: "Left behind by someone who was supposed to stay." },
          { word: "desperate",    hint: "an adjective", def: "Feeling such a strong need for something that you'll do almost anything to get it." },
          { word: "tentative",    hint: "an adjective", def: "Careful, uncertain — not fully committed, as if expecting things might go wrong." },
          { word: "reconcile",    hint: "a verb",       def: "To find a way to accept two things that seem to be in conflict." },
          { word: "invitation",   hint: "a noun",       def: "A request to come — to a place, a conversation, or a relationship." },
          { word: "fragments",    hint: "a noun",       def: "Small broken pieces of something that was once whole." },
          { word: "yearning",     hint: "a noun/verb",  def: "A deep, aching desire for something — especially something out of reach." }
        ]
      },

      {
        id: "b4z2", type: "quiz",
        title: "Check-In",
        subtitle: "Chapters 17–22",
        teacherNote: "Question 5 often surprises students — sit with it.",
        questions: [
          {
            q: "What does Opal decide to organise in these chapters?",
            opts: ["A church fundraiser", "A party for her new friends", "A spelling competition", "A parade for Winn-Dixie"],
            correct: 1,
            explain: "Opal decides to throw a party — bringing together Gloria, Franny, Otis, Sweetie Pie, and the Dewberry boys. It's the novel's central act of community-building."
          },
          {
            q: "What does Opal ask Gloria about her mother?",
            opts: ["Whether her mother will ever come back", "Whether it's her fault her mother left", "What her mother looked like", "Whether the preacher ever talks about her mother"],
            correct: 1,
            explain: "Opal asks Gloria directly: is it her fault her mother left? It's the question underneath everything. Gloria doesn't dismiss it — she engages with it honestly."
          },
          {
            q: "What does Gloria tell Opal about her mother leaving?",
            opts: ["That it was the preacher's fault", "That it had nothing to do with Opal — her mother had a sickness she couldn't fight", "That Opal will understand when she's older", "That some things can't be explained"],
            correct: 1,
            explain: "Gloria tells Opal that her mother leaving had nothing to do with Opal — her mother had a problem with drinking that she couldn't beat. It's not a comfortable answer, but it's an honest one."
          },
          {
            q: "What does Opal begin to notice about her father in these chapters?",
            opts: ["That he is angry about the past", "That he misses her mother more than he shows", "That he is starting to open up and talk more", "That he wants to leave Naomi"],
            correct: 2,
            explain: "The preacher begins — very slowly — to be more present. He's still guarded, but Opal notices he's trying. The distance between them is beginning to close."
          },
          {
            q: "What does Opal realise about her father and the ten things he told her about her mother?",
            opts: ["That he was lying about some of them", "That telling her cost him more than she understood at the time", "That he has forgotten some of them", "That the ten things were actually about him, not her mother"],
            correct: 1,
            explain: "Opal begins to understand that the ten things weren't just information — they were an act of courage from a man who finds it very hard to talk about loss. She's starting to see her father as a person, not just a parent."
          }
        ]
      },

      {
        id: "b4z3", type: "craft",
        title: "Writer's Craft",
        subtitle: "Voice & Silence",
        teacherNote: "Both quotes are about what isn't said. Push students to articulate why silence is sometimes a more powerful narrative tool than speech.",
        similes: [
          {
            quote: "The preacher put his hand on top of my hand and patted it. He didn't say anything.",
            highlight: "He didn't say anything.",
            question: "DiCamillo ends the moment with silence. What does the preacher's silence say that words couldn't?",
            answer: "Words would require the preacher to commit to a feeling, to name it, to make it stable. He can't do that yet. The hand on Opal's hand is the truth — he's there, he loves her, he's trying. DiCamillo knows that some moments are too full for language. Silence, here, is not absence. It's presence without the risk of getting it wrong."
          },
          {
            quote: "I wondered if she had thought about me, if somewhere she was thinking about me right now.",
            highlight: "if somewhere she was thinking about me right now.",
            question: "Opal doesn't ask this question out loud. Why does DiCamillo keep it inside Opal's head — and what does it tell us about what Opal actually needs?",
            answer: "Asking the question out loud risks an answer — and the answer might be no. Keeping it internal lets Opal hold onto the possibility. It also shows us how much of Opal's inner life is spent reaching toward someone who isn't there. The novel is full of these one-sided conversations — with the absent mother, with Winn-Dixie, with the sky."
          }
        ]
      },

      {
        id: "b4z4", type: "rewrite",
        title: "Rewrite It",
        subtitle: "Craft in practice",
        teacherNote: "This rewrite focuses on emotional weight — the same factual content, three different emotional temperatures. Read versions aloud and ask: which version of Opal do you most believe?",
        sourceLine: "My mother left. The preacher didn't talk about it.",
        sourceNote: "Two facts. Nothing else. The reader gets information but not experience.",
        tasks: [
          {
            id: "rw0",
            label: "Write it as Opal — age 10",
            instruction: "Rewrite this from inside Opal's experience right now. What does she carry around with her every day because of these two facts?",
            placeholder: "My mother left when I was three, and…",
            example: "My mother left when I was three. I only know ten things about her. I have counted them so many times I've worn them smooth, like stones."
          },
          {
            id: "rw1",
            label: "Write it as the preacher",
            instruction: "The same facts, from inside the preacher's experience. He knows more than Opal does. What does he carry?",
            placeholder: "She left in the early morning…  /  I've told Opal ten things…",
            example: "She left before Opal woke up. I've never told Opal that. Some things you keep so the child can sleep."
          },
          {
            id: "rw2",
            label: "Write it as Gloria Dump",
            instruction: "Gloria has heard Opal's version. She's lived through her own losses. How does she hold this story — with wisdom, with sadness, with something else?",
            placeholder: "That child carries something heavy…",
            example: "That child carries something heavy for someone so small. She asks me questions her father can't answer yet. I give her what I can."
          }
        ]
      },

      {
        id: "b4z5", type: "extension",
        title: "Go Deeper",
        subtitle: "Block 4",
        teacherNote: "These questions are about adult grief seen through a child's eyes. Students may connect them to their own experience — let that happen.",
        questions: [
          {
            q: "Gloria tells Opal it wasn't her fault her mother left. Do you think Opal believes her? Find a moment in the text that supports your answer.",
            reveal: "This is genuinely open. DiCamillo doesn't resolve it cleanly. Opal hears Gloria, but the question keeps coming back in different forms — in how she talks about her mother, in what she wishes for. Believing something and knowing it are different things. The novel is honest about that gap."
          },
          {
            q: "The preacher is described throughout the novel as someone who 'can't get out of the bottle.' What does this mean — and is he getting out, by this point?",
            reveal: "The bottle is the preacher's grief — his guilt about his wife, his difficulty connecting. Gloria first uses the bottle image. By Block 4, the preacher is beginning — very slowly — to reach toward Opal. He's not out. But the lid is looser. DiCamillo never gives us a sudden transformation. Just incremental thaw."
          }
        ]
      }

    ]
  },

  // ══════════════════════════════════════════════════════════
  // BLOCK 5 — Chapters 23–27
  // The storm. Winn-Dixie missing. The party. The preacher speaks.
  // What it means to hold on and let go at the same time.
  // ══════════════════════════════════════════════════════════
  {
    id: "b5",
    title: "The Storm",
    chapters: "Chapters 23–27",
    locked: true,
    zones: [

      {
        id: "b5z1", type: "vocab",
        title: "Word Wall",
        subtitle: "Chapters 23–27",
        teacherNote: "Several of these words carry double meanings — literal and emotional. Ask students which meaning fits which character.",
        words: [
          { word: "frantic",      hint: "an adjective", def: "In a state of wild panic — moving fast, thinking fast, not in control." },
          { word: "anchor",       hint: "a noun/verb",  def: "Something heavy that holds a ship in place — or a person, a feeling, a relationship that keeps you steady." },
          { word: "acceptance",   hint: "a noun",       def: "The act of coming to terms with something difficult — not liking it, but no longer fighting it." },
          { word: "console",      hint: "a verb",       def: "To comfort someone who is upset — to sit with them in their pain." },
          { word: "resolution",   hint: "a noun",       def: "The moment when a conflict or problem reaches its end — not always the ending you wanted." },
          { word: "endure",       hint: "a verb",       def: "To survive something difficult over time — to keep going through it." },
          { word: "presence",     hint: "a noun",       def: "Being there — physically, emotionally — in a way that another person can feel." },
          { word: "loss",         hint: "a noun",       def: "The experience of no longer having something or someone that mattered." }
        ]
      },

      {
        id: "b5z2", type: "quiz",
        title: "Check-In",
        subtitle: "Chapters 23–27",
        teacherNote: "The last two questions are interpretive as well as factual. Both are worth discussing even after students answer.",
        questions: [
          {
            q: "What happens during the party that changes everything?",
            opts: ["The preacher arrives unexpectedly", "A thunderstorm breaks out and Winn-Dixie disappears", "Opal's mother calls on the phone", "Otis refuses to come to the party"],
            correct: 1,
            explain: "A storm breaks out mid-party. Winn-Dixie — who is terrified of thunder — runs away. Opal is devastated."
          },
          {
            q: "What does Opal do when she can't find Winn-Dixie?",
            opts: ["She gives up and goes home", "She searches everywhere and asks her father for help", "She asks Gloria to use her special sight", "She puts up posters around Naomi"],
            correct: 1,
            explain: "Opal searches desperately, then asks her father to help. It's the first time in the novel she directly turns to him in a crisis — and he comes."
          },
          {
            q: "Where is Winn-Dixie eventually found?",
            opts: ["Hiding under Gloria's porch", "Sheltering in Miss Franny's library", "Under the bed in Opal's room", "In the Winn-Dixie supermarket again"],
            correct: 0,
            explain: "Winn-Dixie is found under Gloria Dump's porch — exactly where the party was. He hadn't gone far. He'd just hidden where it felt safe."
          },
          {
            q: "What does the preacher say to Opal when she is afraid Winn-Dixie is gone forever?",
            opts: ["That dogs always come back", "That they will get a new dog", "That he doesn't want her to lose someone else she loves, and he doesn't want to lose her", "That everything will be fine"],
            correct: 2,
            explain: "The preacher opens up — he tells Opal he doesn't want to lose her the way he lost her mother. It's the most honest thing he says in the novel. The storm breaks something open in him too."
          },
          {
            q: "How does the novel end?",
            opts: ["Opal's mother comes back", "Opal and her friends sit together in Gloria's garden, listening to Otis play guitar", "Opal decides to leave Naomi", "Winn-Dixie wins a competition"],
            correct: 1,
            explain: "The novel ends with the community Opal has gathered, sitting together in the warm dark, with music. Nothing is fixed. But nobody is alone. That's DiCamillo's answer."
          }
        ]
      },

      {
        id: "b5z3", type: "craft",
        title: "Writer's Craft",
        subtitle: "Endings & Meaning",
        teacherNote: "The final block's craft work is about how endings carry meaning — what DiCamillo chooses to leave unresolved, and why.",
        similes: [
          {
            quote: "He was afraid of losing me, the same way I was afraid of losing Winn-Dixie.",
            highlight: "He was afraid of losing me, the same way I was afraid of losing Winn-Dixie.",
            question: "DiCamillo uses a direct comparison here — Opal realises something about her father. What has the storm made visible that was hidden before?",
            answer: "The storm creates the conditions for honesty. Opal sees that her father's guardedness isn't indifference — it's fear. He's been protecting himself the same way she's been protecting herself. The parallel shows us they are more alike than either of them knew. Loss teaches you to be afraid of loving things."
          },
          {
            quote: "I thought about my mama. I missed her, but I didn't feel so alone.",
            highlight: "I missed her, but I didn't feel so alone.",
            question: "The novel ends without Opal's mother returning. Is this a sad ending, a hopeful one, or something harder to name?",
            answer: "It's both — which is exactly the point. DiCamillo refuses to fix what can't be fixed. Opal still misses her mother. That won't go away. But loneliness and loss are not the same thing. She's learned to carry the missing with company. That's the closest thing to resolution the novel offers — and DiCamillo argues it's enough."
          }
        ]
      },

      {
        id: "b5z4", type: "creative",
        title: "Your Turn",
        subtitle: "Writing — Final",
        teacherNote: "This is the final writing task of the unit. Give students space. Encourage them to write something they actually believe, not something they think is expected.",
        mainPrompt: "The novel ends without Opal's mother coming back — but Opal doesn't feel alone. Write a short scene (10–14 sentences) set one year after the end of the novel. What does Opal's life look like now? What has stayed the same? What has changed?",
        chips: [
          "Start with something ordinary — a morning, a meal, a walk",
          "Include Winn-Dixie — what is he doing?",
          "Write a moment between Opal and her father",
          "Include one of the other characters — Franny, Gloria, Otis",
          "Let Opal think briefly about her mother — without resolving it",
          "End with a small moment, not a big one"
        ],
        placeholder: "One year later, in Naomi, Florida…"
      },

      {
        id: "b5z5", type: "extension",
        title: "Go Deeper",
        subtitle: "Block 5 — Full Novel",
        teacherNote: "These are the questions the whole novel has been building toward. They are genuinely hard. Don't rush them.",
        questions: [
          {
            q: "Find one moment of loneliness and one moment of connection from anywhere in the novel. Write one sentence for each. What's actually different between them?",
            reveal: "Push for specificity — which moment, which character, which word. The difference between loneliness and connection in this novel is rarely dramatic. It's usually presence: someone who stays, a story told, a hand on a hand. DiCamillo's loneliness is mostly people facing away from each other. Connection is just the turning."
          },
          {
            q: "Several characters carry something they can't fix — the preacher's guilt, Gloria's past, Otis's record, Opal's missing mother. What do people do with things they can't fix?",
            reveal: "This is the novel's spine. The preacher tells ten things. Gloria hangs bottles on a tree. Miss Franny tells her bear story again and again. Otis plays guitar for animals that don't judge him. DiCamillo's answer: you don't fix the unfixable. You find a form for it. You carry it with company. You let it be part of you without letting it be all of you."
          },
          {
            q: "By the last page, has anything actually been resolved? What has DiCamillo decided to leave open — and do you think that's the right choice?",
            reveal: "Opal's mother doesn't return. Nobody is fully healed. The preacher is still guarded. Otis still has a record. But the community has formed, and that formation is the resolution. DiCamillo's argument — quiet but consistent — is that the presence of other people is what makes unresolvable things bearable. The open ending isn't a failure. It's the truth."
          }
        ]
      }

    ]
  }

];

const blocks = BLOCKS;
