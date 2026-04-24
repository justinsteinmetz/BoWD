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
            name: "Opal", initial: "O",
            role: "Our narrator",
            traits: ["Lonely but brave", "Asks big questions", "Collects people like treasures"],
            think: "Opal talks to strangers, animals, and the sky. What does that tell us about her?"
          },
          {
            name: "Winn-Dixie", initial: "W",
            role: "The dog",
            traits: ["Smiles with all his teeth", "Afraid of thunder", "Brings people together"],
            think: "Winn-Dixie can't speak — but how does DiCamillo make him feel like a character with feelings?"
          },
          {
            name: "The Preacher", initial: "P",
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
          
