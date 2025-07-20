import React, { useState, useEffect } from 'react';
import { BookOpen, Coffee, AlertTriangle, Share2 } from 'lucide-react';

const TiSveloUnSegretoApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentExample, setCurrentExample] = useState(0);
  const [savedSouls, setSavedSouls] = useState(() => {
    // Genera un numero casuale tra 15 e 150 all'avvio
    return Math.floor(Math.random() * 136) + 15;
  });
  const [bartLines, setBartLines] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [customText, setCustomText] = useState('');
  const [generatedBart, setGeneratedBart] = useState('');
  const [shuffledExamples, setShuffledExamples] = useState([]);
  const [shuffledQuizzes, setShuffledQuizzes] = useState([]);
  const [showBartSection, setShowBartSection] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentBartPhrase, setCurrentBartPhrase] = useState('');

  // Frasi ironiche random
  const ironicPhrases = [
    "Piuttosto che non è un 'oppure' per snob.",
    "Ti piace complicarti la vita? Usa 'piuttosto che' a caso.",
    "'Piuttosto che' trendy? Solo per chi ama i malintesi.",
    "Preferisci confondere tutti? Piuttosto che… usa 'oppure'.",
    "'Piuttosto che': effetto raffinato, risultato disastroso.",
    "Vuoi sembrare colto? Meglio tacere che dire 'piuttosto che'.",
    "'Piuttosto che' non ti salva dal ridicolo.",
    "Con 'piuttosto che' sbagliato, sembri solo incerto.",
    "'Oppure' funziona, 'piuttosto che'… boh.",
    "'Piuttosto che' usato male: il modo più veloce per perdere punti.",
    "Ma oppure vi fa così schifo?"
  ];

  // Funzione per ottenere una frase ironica random
  const getRandomIronicPhrase = () => {
    return ironicPhrases[Math.floor(Math.random() * ironicPhrases.length)];
  };

  const changeBartPhrase = () => {
    setCurrentBartPhrase(getRandomIronicPhrase());
  };

  const shareBartPhrase = () => {
    navigator.clipboard.writeText(currentBartPhrase);
    alert('Frase copiata! Mandale ai tuoi amici e salva un\'anima!');
  };

  // Gestione swipe per mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe da sinistra a destra = torna indietro
    if (isRightSwipe && currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  };

  // Funzione per mescolare un array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inizializza gli array mescolati quando il componente si monta
  useEffect(() => {
    setShuffledExamples(shuffleArray(wrongExamples));
    setShuffledQuizzes(shuffleArray(quizzes));
    setCurrentBartPhrase(getRandomIronicPhrase());
  }, []);

  // Incremento automatico anime salvate
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementa di 1-4 anime salvate ogni minuto
      const increment = Math.floor(Math.random() * 4) + 1;
      setSavedSouls(prev => prev + increment);
    }, 60000); // 60 secondi = 1 minuto

    return () => clearInterval(interval);
  }, []);

  // Funzione per rimescolare esempi e quiz
  const reshuffleContent = () => {
    const newExamples = shuffleArray(wrongExamples);
    const newQuizzes = shuffleArray(quizzes);
    
    setShuffledExamples(newExamples);
    setShuffledQuizzes(newQuizzes);
    setCurrentExample(0);
    setCurrentQuiz(0);
    setSelectedAnswer('');
    setShowResult(false);
    setCurrentBartPhrase(getRandomIronicPhrase()); // Rigenera anche la frase di Bart
  };

  // Esempi di "piuttosto che" usato male (con più opzioni)
  const wrongExamples = [
    {
      wrong: "Stasera possiamo mangiare pizza piuttosto che pasta piuttosto che sushi piuttosto che hamburger.",
      correct: "Stasera possiamo mangiare pizza, pasta, sushi O hamburger.",
      explanation: "Quando elenchi opzioni, usa 'o' o le virgole. Il 'piuttosto che' non è un jolly universale!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Puoi chiamarmi piuttosto che scrivermi piuttosto che venire a casa piuttosto che non fare nulla.",
      correct: "Puoi chiamarmi, scrivermi, venire a casa O non fare nulla.",
      explanation: "'Piuttosto che' significa 'anziché' (preferenza), non è una lista della spesa!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Andiamo al mare piuttosto che in montagna piuttosto che al lago piuttosto che in città?",
      correct: "Andiamo al mare, in montagna, al lago O in città?",
      explanation: "Per le domande con scelte multiple, 'piuttosto che' è fuori luogo come un pinguino nel Sahara!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Esco con Marco piuttosto che Luca piuttosto che Sara piuttosto che resto a casa.",
      correct: "Esco con Marco, Luca, Sara O resto a casa.",
      explanation: "I tuoi amici non sono alternative da scartare, sono opzioni tra cui scegliere!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Compro il vestito rosso piuttosto che blu piuttosto che verde piuttosto che nero.",
      correct: "Compro il vestito rosso, blu, verde O nero.",
      explanation: "I colori non si escludono a vicenda, si scelgono! Il 'piuttosto che' non è un arcobaleno grammaticale!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Studio matematica piuttosto che italiano piuttosto che storia piuttosto che scienze.",
      correct: "Studio matematica, italiano, storia O scienze.",
      explanation: "Le materie scolastiche meritano rispetto grammaticale! Non sono nemiche tra loro!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Guardo Netflix piuttosto che YouTube piuttosto che Amazon Prime piuttosto che vado a dormire.",
      correct: "Guardo Netflix, YouTube, Amazon Prime O vado a dormire.",
      explanation: "Lo streaming non è una guerra! Sono opzioni per il tuo tempo libero!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Bevo caffè piuttosto che tè piuttosto che acqua piuttosto che succo di frutta.",
      correct: "Bevo caffè, tè, acqua O succo di frutta.",
      explanation: "Le bevande non sono in competizione! Il 'piuttosto che' non è un barista!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Lavoro in ufficio piuttosto che da casa piuttosto che in co-working piuttosto che al bar.",
      correct: "Lavoro in ufficio, da casa, in co-working O al bar.",
      explanation: "I luoghi di lavoro sono opzioni, non battaglie territoriali!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    },
    {
      wrong: "Parto lunedì piuttosto che martedì piuttosto che mercoledì piuttosto che non parto.",
      correct: "Parto lunedì, martedì, mercoledì O non parto.",
      explanation: "I giorni della settimana non sono in conflitto! Sono solo... giorni!",
      bartText: "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
    }
  ];

  // Quiz interattivi
  const quizzes = [
    {
      question: "Come correggeresti: 'Mangio pizza piuttosto che pasta piuttosto che insalata'?",
      options: [
        "Mangio pizza ANZICHÉ pasta e insalata",
        "Mangio pizza, pasta O insalata",
        "Mangio pizza piuttosto che tutto il resto",
        "Non correggo, è perfetto così"
      ],
      correct: 1,
      explanation: "Quando elenchi opzioni, 'piuttosto che' è come mettere il ketchup sulla carbonara: tecnicamente possibile, ma NO!",
      sarcasm: "Bravo! Hai salvato la pizza dalla guerra grammaticale! 🍕"
    },
    {
      question: "Qual è il vero significato di 'piuttosto che'?",
      options: [
        "È il jolly universale della lingua italiana",
        "Significa 'anziché' (preferenza netta)",
        "È sinonimo di 'oppure' in tutti i contesti",
        "Serve per fare liste infinite"
      ],
      correct: 1,
      explanation: "'Piuttosto che' = 'anziché' = preferenza forte. Non è il coltellino svizzero della grammatica!",
      sarcasm: "Esatto! Finalmente qualcuno che conosce il significato originale! 🎯"
    },
    {
      question: "Quando si può usare 'piuttosto che' correttamente?",
      options: [
        "Preferisco guardare TV piuttosto che studiare",
        "Vuoi pasta piuttosto che pizza?",
        "Andiamo al mare piuttosto che in montagna?",
        "Tutte le opzioni precedenti"
      ],
      correct: 0,
      explanation: "Solo quando esprimi una preferenza netta! Le domande vogliono 'o', non 'piuttosto che'!",
      sarcasm: "Perfetto! Hai usato il 'piuttosto che' nel suo habitat naturale! 🌟"
    },
    {
      question: "Come reagisci quando senti: 'Esco con Marco piuttosto che Luca piuttosto che Sara'?",
      options: [
        "Chiamo la Crusca immediatamente",
        "Fingo di non aver sentito",
        "Sorrido e muoio dentro",
        "Mando questa app all'interessato"
      ],
      correct: 3,
      explanation: "L'opzione migliore: condividi la saggezza con stile! L'educazione grammaticale è un atto d'amore!",
      sarcasm: "Saggio! Diventa un missionario della grammatica corretta! 📱"
    },
    {
      question: "Il 'piuttosto che' moltiplicato è:",
      options: [
        "Una strategia per confondere l'interlocutore",
        "Un virus grammaticale contagioso",
        "L'evoluzione naturale della lingua",
        "Una moda che passerà"
      ],
      correct: 1,
      explanation: "È proprio un virus! Si diffonde, muta e infetta ogni conversazione. Fortunatamente abbiamo l'antidoto!",
      sarcasm: "Esatto! Sei un epidemiologo della grammatica! 🦠➡️💊"
    }
  ];

  const generateBart = () => {
    if (!customText.trim()) return;
    
    let result = '';
    for (let i = 1; i <= 100; i++) {
      result += `${i}. ${customText}\n`;
    }
    result += '\n...e altre 900 volte per completare le 1000!\n\n';
    result += '📝 Generato da "Ti Svelo Un Segreto" - L\'app che salva il "piuttosto che"';
    
    setGeneratedBart(result);
    setBartLines(bartLines + 1);
  };

  const renderHome = () => (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto text-white py-6 px-4">
        {/* Header */}
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold mb-2">🔥 NUOVO! Piuttosto che? 😨</h1>
          <p className="text-xl text-cyan-200">"Piuttosto che" NON significa "oppure"</p>
          <p className="text-sm text-cyan-300 opacity-75">🚀 v2.1 - Deploy Test Live!</p>
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 mt-4">
            <p className="text-lg">📊 Anime salvate: <span className="font-bold text-cyan-300">{savedSouls}</span></p>
            <p className="text-xs text-cyan-400 mt-2">📱 Swipe da sinistra a destra per tornare al menu</p>
          </div>
        </div>

        {/* Sezione Bart alla lavagna */}
        <div className="mx-6 mb-6">
          <button
            onClick={() => setShowBartSection(!showBartSection)}
            className="w-full bg-slate-800 rounded-xl p-4 border-4 border-cyan-400 hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-3xl mr-3">👦</div>
                <h3 className="text-xl font-bold">Bart scrive alla lavagna</h3>
              </div>
              <div className="text-2xl">{showBartSection ? '▼' : '▶'}</div>
            </div>
          </button>

          {showBartSection && (
            <div className="bg-slate-800 rounded-b-xl p-4 border-l-4 border-r-4 border-b-4 border-cyan-400 border-t-0">
              <div className="bg-black/20 rounded-lg p-4 mb-4 text-center">
                <p className="text-cyan-200 italic text-lg">"{currentBartPhrase}"</p>
              </div>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={changeBartPhrase}
                  className="flex-1 bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-cyan-400"
                >
                  Cambia frase
                </button>
                <button
                  onClick={shareBartPhrase}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-400"
                >
                  <Share2 size={20} />
                </button>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-slate-300 text-xs leading-tight max-h-48 overflow-y-auto">
                {Array.from({ length: 50 }, (_, i) => (
                  <p key={i} className="mb-1">
                    {i + 1}. Usare piuttosto che al posto di oppure non mi farà sembrare intelligente.
                  </p>
                ))}
                <p className="text-slate-400 mt-3 font-bold">...e altre 950 volte per completare le 1000! 📝</p>
              </div>
              <button
                onClick={() => setCurrentScreen('bartGenerator')}
                className="mt-3 w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400"
              >
                📝 Genera il tuo Bart personalizzato!
              </button>
            </div>
          )}
        </div>

        {/* Menu Principale */}
        <div className="px-6 space-y-4 pb-8">
          <button
            onClick={() => {
              reshuffleContent();
              setCurrentScreen('examples');
            }}
            className="w-full bg-gradient-to-r from-indigo-700 to-blue-600 p-4 rounded-xl flex items-center space-x-4 hover:scale-105 transition-transform"
          >
            <div className="text-3xl">🤦‍♂️</div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Orrori Grammaticali</h3>
              <p className="text-indigo-200">Esempi casuali di "piuttosto che" selvaggio</p>
            </div>
            <AlertTriangle className="ml-auto text-cyan-300" />
          </button>

          <button
            onClick={() => {
              reshuffleContent();
              setCurrentScreen('quiz');
            }}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-600 p-4 rounded-xl flex items-center space-x-4 hover:scale-105 transition-transform"
          >
            <div className="text-3xl">🧠</div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Test Anti-Virus</h3>
              <p className="text-slate-200">Quiz casuali per testare la tua immunità</p>
            </div>
            <Coffee className="ml-auto" />
          </button>

          <button
            onClick={() => setCurrentScreen('about')}
            className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 p-4 rounded-xl flex items-center space-x-4 hover:scale-105 transition-transform"
          >
            <div className="text-3xl">🤫</div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Il Grande Segreto</h3>
              <p className="text-blue-200">Scopri la verità sul "piuttosto che"</p>
            </div>
            <BookOpen className="ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderExamples = () => {
    // Se non ci sono esempi mescolati ancora, usa l'array originale
    const examplesArray = shuffledExamples.length > 0 ? shuffledExamples : wrongExamples;
    const example = examplesArray[currentExample];
    
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 text-white"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="bg-white/20 p-2 rounded-lg"
            >
              Menu
            </button>
            <div className="text-center">
              <p className="text-sm">Orrore {currentExample + 1}/{examplesArray.length}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-blue-300">ERRORE RILEVATO!</h2>
              </div>
              
              <div className="bg-red-500/20 p-4 rounded-lg mb-4">
                <p className="text-lg font-bold">❌ SBAGLIATO:</p>
                <p className="text-red-200 italic">"{example.wrong}"</p>
              </div>

              <div className="bg-green-500/20 p-4 rounded-lg mb-4">
                <p className="text-lg font-bold">✅ CORRETTO:</p>
                <p className="text-green-200 italic">"{example.correct}"</p>
              </div>

              <div className="bg-blue-500/20 p-4 rounded-lg">
                <p className="text-sm font-bold mb-2">💡 PERCHÉ:</p>
                <p className="text-blue-200">{example.explanation}</p>
              </div>
            </div>

            {/* Bart Section */}
            <div className="bg-slate-700 rounded-xl p-4 border-2 border-slate-500">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-2">👦</div>
                <p className="text-slate-200 font-bold">Bart deve scrivere:</p>
              </div>
              <div className="bg-slate-800 p-3 rounded font-mono text-slate-300 text-sm">
                {example.bartText}
              </div>
              <p className="text-xs text-slate-400 mt-2">...100 volte alla lavagna (come ai bei tempi!) 📝</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (currentExample > 0) {
                    setCurrentExample(currentExample - 1);
                  }
                }}
                disabled={currentExample === 0}
                className="flex-1 bg-gray-600 p-3 rounded-lg font-bold disabled:opacity-50"
              >
                ← Precedente
              </button>
              
              <button
                onClick={() => {
                  if (currentExample < examplesArray.length - 1) {
                    setCurrentExample(currentExample + 1);
                  } else {
                    setCurrentScreen('home');
                    setSavedSouls(savedSouls + 1);
                    setCurrentExample(0);
                  }
                }}
                className="flex-1 bg-slate-600 text-white p-3 rounded-lg font-bold"
              >
                {currentExample < examplesArray.length - 1 ? 'Prossimo Orrore →' : 'Ho Capito! 🎯'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    // Se non ci sono quiz mescolati ancora, usa l'array originale
    const quizzesArray = shuffledQuizzes.length > 0 ? shuffledQuizzes : quizzes;
    const quiz = quizzesArray[currentQuiz];
    
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-cyan-800 text-white"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="bg-white/20 p-2 rounded-lg"
            >
              Menu
            </button>
            <div className="text-center">
              <p className="text-sm">Test {currentQuiz + 1}/{quizzesArray.length}</p>
            </div>
          </div>

          {!showResult ? (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold">{quiz.question}</h2>
                </div>
                
                <div className="space-y-3 mt-6">
                  {quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        selectedAnswer === index 
                          ? 'bg-slate-600 text-white font-bold' 
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowResult(true)}
                disabled={selectedAnswer === ''}
                className="w-full bg-slate-600 text-white p-4 rounded-lg font-bold text-lg disabled:opacity-50"
              >
                Rivela la Verità! 🕵️
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                {selectedAnswer === quiz.correct ? (
                  <div>
                    <h2 className="text-2xl font-bold text-blue-300 mb-4">CORRETTO!</h2>
                    <p className="text-lg mb-4">{quiz.sarcasm}</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-300 mb-4">Oops!</h2>
                    <p className="text-lg mb-4">Niente panico, anche Dante sbagliava... forse!</p>
                  </div>
                )}
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <p><strong>Spiegazione:</strong> {quiz.explanation}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (currentQuiz < quizzesArray.length - 1) {
                    setCurrentQuiz(currentQuiz + 1);
                    setSelectedAnswer('');
                    setShowResult(false);
                  } else {
                    setCurrentScreen('home');
                    setSavedSouls(savedSouls + 2);
                    setCurrentQuiz(0);
                    setSelectedAnswer('');
                    setShowResult(false);
                  }
                }}
                className="w-full bg-slate-600 text-white p-4 rounded-lg font-bold text-lg"
              >
                {currentQuiz < quizzesArray.length - 1 ? 'Prossimo Test' : 'Sono Illuminato! ✨'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBartGenerator = () => {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-cyan-900 text-white"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="bg-white/20 p-2 rounded-lg"
            >
              Menu
            </button>
            <h2 className="text-xl font-bold">Bart generator</h2>
            <div className="text-2xl">👦</div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">Crea il tuo Bart personalizzato!</h3>
                <p className="text-gray-300">Perfetto da mandare agli amici che abusano del "piuttosto che"</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Cosa deve scrivere Bart?</label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"
                    className="w-full p-3 rounded-lg text-gray-800"
                    maxLength={100}
                  />
                  <p className="text-xs text-gray-400 mt-1">Max 100 caratteri</p>
                </div>

                <button
                  onClick={generateBart}
                  disabled={!customText.trim()}
                  className="w-full bg-slate-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
                >
                  🎯 Genera Bart alla Lavagna!
                </button>
              </div>
            </div>

            {generatedBart && (
              <div className="bg-slate-800 rounded-xl p-4 border-4 border-cyan-400">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">👦</div>
                    <h4 className="text-lg font-bold">Il tuo Bart personalizzato:</h4>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBart);
                      alert('Copiato! Ora puoi mandarlo ai tuoi amici! 📱');
                    }}
                    className="bg-slate-600 text-white px-3 py-1 rounded text-sm font-bold"
                  >
                    📋 Copia e condividi con i bisognosi
                  </button>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg font-mono text-slate-300 text-sm leading-tight max-h-48 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{generatedBart}</pre>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-300">💡 Suggerimenti:</p>
              <p className="text-xs text-gray-400">
                "Usare piuttosto che al posto di oppure non mi farà sembrare intelligente"<br/>
                "Non userò più 'piuttosto che' invece di 'oppure'"<br/>
                "Non userò più 'piuttosto che' come jolly universale"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-cyan-700 text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="bg-white/20 p-2 rounded-lg"
          >
            Menu
          </button>
          <h2 className="text-xl font-bold">La verità rivelata</h2>
          <div className="text-2xl">🤫</div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div className="text-left space-y-4">
              <div className="bg-red-500/20 p-4 rounded-lg">
                <p className="font-bold text-red-300">❌ FALSO:</p>
                <p>"Piuttosto che" = "oppure"</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <p className="font-bold text-green-300">✅ VERO:</p>
                <p>"Piuttosto che" = "anziché" (preferenza netta)</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h4 className="text-lg font-bold mb-3">📚 Esempi corretti:</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-green-500/20 p-3 rounded">
                <p className="font-bold">✅ "Preferisco studiare piuttosto che guardare TV"</p>
                <p className="text-green-300">→ Esprimi una preferenza chiara</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded">
                <p className="font-bold">✅ "Meglio camminare piuttosto che prendere l'auto"</p>
                <p className="text-green-300">→ Indichi cosa preferisci</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded">
                <p className="font-bold">❌ "Vuoi pasta piuttosto che pizza?"</p>
                <p className="text-red-300">→ Qui serve "o", non "piuttosto che"!</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-600/20 backdrop-blur-lg rounded-2xl p-6">
            <h4 className="text-lg font-bold mb-3">🎯 Missione dell'app:</h4>
            <p>Salvare il "piuttosto che" dall'abuso e restituirgli la dignità grammaticale che merita!</p>
            <p className="mt-2 text-sm text-slate-300">Con ironia, sarcasmo e tanto amore per l'italiano corretto ❤️</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render principale
  switch (currentScreen) {
    case 'examples':
      return renderExamples();
    case 'quiz':
      return renderQuiz();
    case 'bartGenerator':
      return renderBartGenerator();
    case 'about':
      return renderAbout();
    default:
      return renderHome();
  }
};

export default TiSveloUnSegretoApp;
