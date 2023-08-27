export const uq_data_set = [
    {
      "q": "When was UQ founded?",
      "a": "1909"
    },
    {
      "q": "Where is the main campus?",
      "a": "St Lucia"
    },
    {
      "q": "What is UQ known for?",
      "a": "Research"
    },
    {
      "q": "How many faculties are there?",
      "a": "Six"
    },
    {
      "q": "UQ is located in which Australian city?",
      "a": "Brisbane"
    },
    {
      "q": "What does UQ Gatton focuses on?",
      "a": "Agriculture"
    }
]

export const music_data_set = [
  {
      "q": "Who is often referred to as the 'King of Pop'?",
      "a": "Michael Jackson"
  },
  {
      "q": "What famous rock band performed the song 'Stairway to Heaven'?",
      "a": "Led Zeppelin"
  },
  {
      "q": "Which classical composer is known for composing 'Symphony No. 9 in D minor'?",
      "a": "Ludwig van Beethoven"
  },
  {
      "q": "What genre of music is characterized by its use of electronic instruments and repetitive beats?",
      "a": "Electronic Dance Music (EDM)"
  },
  {
      "q": "Which female artist released the album '1989'?",
      "a": "Taylor Swift"
  },
  {
      "q": "Who was the lead vocalist of the band Queen?",
      "a": "Freddie Mercury"
  },
  {
      "q": "What musical instrument has 88 keys and is often found in concert halls?",
      "a": "Piano"
  },
  {
      "q": "Which reggae legend sang the famous song 'No Woman, No Cry'?",
      "a": "Bob Marley"
  },
  {
      "q": "What genre of music is characterized by its use of fast and aggressive guitar playing, often with distorted tones?",
      "a": "Heavy Metal"
  },
  {
      "q": "Which famous rapper's real name is Marshall Mathers?",
      "a": "Eminem"
  }
]

export const medicine_data_set = [
  {
      "q": "What is the medical term for inflammation of the appendix?",
      "a": "Appendicitis"
  },
  {
      "q": "Which organ in the human body produces insulin?",
      "a": "Pancreas"
  },
  {
      "q": "What is the common name for hypertension?",
      "a": "High blood pressure"
  },
  {
      "q": "Which vitamin deficiency leads to the disease known as 'scurvy'?",
      "a": "Vitamin C deficiency"
  },
  {
      "q": "What is the medical condition characterized by difficulty in breathing while lying down?",
      "a": "Orthopnea"
  },
  {
      "q": "Which field of medicine focuses on the diagnosis and treatment of disorders of the heart?",
      "a": "Cardiology"
  },
  {
      "q": "What is the smallest unit of life in the human body?",
      "a": "Cell"
  },
  {
      "q": "What is the medical term for the collarbone?",
      "a": "Clavicle"
  },
  {
      "q": "Which gas do plants take in during photosynthesis?",
      "a": "Carbon dioxide (CO2)"
  },
  {
      "q": "What is the medical term for the kneecap?",
      "a": "Patella"
  }
]

export const general_data_set = [
  {
      "q": "Which planet is known as the 'Red Planet'?",
      "a": "Mars"
  },
  {
      "q": "Who wrote the play 'Romeo and Juliet'?",
      "a": "William Shakespeare"
  },
  {
      "q": "What is the largest mammal in the world?",
      "a": "Blue whale"
  },
  {
      "q": "What is the currency of Japan?",
      "a": "Japanese yen"
  },
  {
      "q": "In which year did the Titanic sink after hitting an iceberg?",
      "a": "1912"
  },
  {
      "q": "Which famous scientist developed the theory of relativity?",
      "a": "Albert Einstein"
  },
  {
      "q": "What is the tallest mountain in the world?",
      "a": "Mount Everest"
  },
  {
      "q": "What is the chemical symbol for the element gold?",
      "a": "Au"
  },
  {
      "q": "Which country is known as the 'Land of the Rising Sun'?",
      "a": "Japan"
  },
  {
      "q": "What is the capital city of Australia?",
      "a": "Canberra"
  }
]

export const geography_data_set = [
    {
        "q": "What is the world's largest continent?",
        "a": "Asia"
    },
    {
        "q": "Which river is the longest in the world?",
        "a": "Nile River"
    },
    {
        "q": "Which mountain range runs along the west coast of South America?",
        "a": "Andes"
    },
    {
        "q": "What is the capital city of Australia?",
        "a": "Canberra"
    },
    {
        "q": "Which desert is often referred to as the 'Sahara of North America'?",
        "a": "Sonoran Desert"
    },
    {
        "q": "Which country is known as the 'Land of the Rising Sun'?",
        "a": "Japan"
    }
]

export type DeckType = {
    name: string;
    data: {
        q: string;
        a: string;
    }[];
}

export const datasets: DeckType[] = [
  {
    name: "UQ General Knowledge",
    data: uq_data_set
  },
  {
    name: "Music General Knowledge",
    data: music_data_set
  },
  {
    name: "Basic Anatomy",
    data: medicine_data_set
  },
  {
    name: "Pop Quiz",
    data: general_data_set
  }
]

export const importedDeck = {
    name: "Geography Flash Cards",
    data: geography_data_set
}