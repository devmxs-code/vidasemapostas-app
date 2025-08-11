import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Users, BookOpen, Phone, AlertTriangle, Home, 
  Info, HelpCircle, MessageCircle, Calendar, BarChart2, 
  DollarSign, Lock, Smile, Frown, TrendingUp, TrendingDown,
  Clock, ChevronLeft, ChevronRight, X, Check, Plus, Minus
} from 'lucide-react';

// Dados das dicas rotativas
const motivationalTips = [
  "Cada dia sem apostar é uma vitória. Você está mais forte do que imagina.",
  "O dinheiro que você não gastou apostando hoje pode ser investido no seu futuro.",
  "Quando sentir vontade de jogar, pare e respire fundo. A sensação vai passar.",
  "Lembre-se: as casas de apostas sempre ganham no final. Você merece coisa melhor.",
  "Busque atividades que tragam prazer real: exercícios, hobbies, tempo com amigos.",
  "Cada 'não' para o jogo é um 'sim' para sua saúde mental e financeira.",
  "Você não está sozinho nesta luta. Milhões de pessoas conseguiram parar de jogar.",
  "Invista em você mesmo ao invés de investir em jogos que são programados para te fazer perder."
];

// Histórias fictícias baseadas em situações reais
const realStories = [
  {
    id: 1,
    title: "A História de Carlos - Do Vício à Recuperação",
    content: "Carlos, de 28 anos, começou jogando 'só R$ 10' no jogo do tigrinho. Em 6 meses, havia perdido R$ 15.000 e mentido para a família. Hoje, após buscar ajuda nos Jogadores Anônimos, está há 8 meses sem apostar e reconstruindo sua vida financeira.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Maria e os Empréstimos Perigosos",
    content: "Maria, mãe de dois filhos, acreditou que conseguiria 'recuperar as perdas' apostando mais. Chegou a pegar empréstimos com juros altos. Quando procurou ajuda no CAPS, já devia R$ 8.000. Com tratamento psicológico gratuito, aprendeu a controlar os impulsos.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "João e o Isolamento Social",
    content: "João passou a evitar amigos e família por vergonha das perdas no jogo. Perdeu o emprego por faltar devido à ansiedade. O CVV o ajudou nos momentos mais difíceis, e hoje ele participa de grupos de apoio, onde encontrou pessoas que passaram pelo mesmo.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

// Dados de estatísticas
const gamblingStats = [
  { id: 1, title: "Perda média mensal", value: "R$ 2.000-10.000", icon: <DollarSign /> },
  { id: 2, title: "Desempregados", value: "42%", icon: <TrendingDown /> },
  { id: 3, title: "Dívidas acima de R$ 20k", value: "68%", icon: <BarChart2 /> },
  { id: 4, title: "Tentam recuperar perdas", value: "92%", icon: <TrendingUp /> }
];

// Recursos de ajuda
const helpResources = [
  {
    id: 1,
    name: "CVV - Centro de Valorização da Vida",
    phone: "188",
    website: "cvv.org.br",
    description: "Atendimento 24h para crises emocionais e prevenção ao suicídio"
  },
  {
    id: 2,
    name: "Jogadores Anônimos",
    phone: "(11) 96384-0438",
    website: "jogadoresanonimos.org.br",
    description: "Grupos de apoio baseados no método dos 12 passos"
  },
  {
    id: 3,
    name: "CAPS - Centro de Atenção Psicossocial",
    phone: "Procure na sua cidade",
    website: "gov.br/saude",
    description: "Atendimento gratuito pelo SUS para dependências"
  }
];

const GamblingAwarenessApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTip, setCurrentTip] = useState(0);
  const [daysClean, setDaysClean] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [showSavingsCalculator, setShowSavingsCalculator] = useState(false);
  const [dailyAmount, setDailyAmount] = useState(50);
  const [calculatorDays, setCalculatorDays] = useState(30);

  // Rotaciona as dicas a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Carrega dados salvos do localStorage
  useEffect(() => {
    const savedDays = localStorage.getItem('daysClean');
    const savedMoney = localStorage.getItem('moneySaved');
    
    if (savedDays) setDaysClean(parseInt(savedDays));
    if (savedMoney) setMoneySaved(parseFloat(savedMoney));
  }, []);

  // Salva dados no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('daysClean', daysClean.toString());
    localStorage.setItem('moneySaved', moneySaved.toString());
  }, [daysClean, moneySaved]);

  interface ModalContent {
    title: string;
    content: React.ReactNode;
  }

  const openModal = (content: ModalContent) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const incrementDays = () => {
    setDaysClean(daysClean + 1);
  };

  const decrementDays = () => {
    if (daysClean > 0) {
      setDaysClean(daysClean - 1);
    }
  };

  const calculateSavings = () => {
    return (dailyAmount * calculatorDays).toFixed(2);
  };

  const Header = () => (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Shield className="w-8 h-8" />
            <h1 className="text-xl font-bold">Vida Sem Apostas</h1>
          </div>
          
          <nav className="hidden md:flex space-x-2">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'home' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-500 hover:shadow-md'}`}
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>
            <button 
              onClick={() => setCurrentPage('info')} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'info' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-500 hover:shadow-md'}`}
            >
              <Info className="w-5 h-5" />
              <span>Informações</span>
            </button>
            <button 
              onClick={() => setCurrentPage('support')} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'support' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-500 hover:shadow-md'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Apoio</span>
            </button>
            <button 
              onClick={() => setCurrentPage('stories')} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'stories' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-500 hover:shadow-md'}`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Histórias</span>
            </button>
            <button 
              onClick={() => setCurrentPage('tracker')} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === 'tracker' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-500 hover:shadow-md'}`}
            >
              <Calendar className="w-5 h-5" />
              <span>Meu Progresso</span>
            </button>
          </nav>

          <div className="md:hidden">
            <select 
              value={currentPage} 
              onChange={(e) => setCurrentPage(e.target.value)}
              className="bg-blue-700 text-white px-3 py-2 rounded-lg shadow-md"
            >
              <option value="home">Início</option>
              <option value="info">Informações</option>
              <option value="support">Apoio</option>
              <option value="stories">Histórias</option>
              <option value="tracker">Meu Progresso</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold mb-4">⚠️ Este site é apenas informativo. Procure ajuda profissional se sentir necessidade.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <h3 className="font-bold text-red-400 mb-2 flex items-center justify-center"><AlertTriangle className="mr-2" /> Apoio Emocional</h3>
            <p><strong>CVV – Centro de Valorização da Vida</strong></p>
            <p className="flex items-center justify-center"><Phone className="mr-2" /> 188 (24h, gratuito)</p>
            <p className="flex items-center justify-center"><BookOpen className="mr-2" /> cvv.org.br</p>
          </div>
          
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <h3 className="font-bold text-green-400 mb-2 flex items-center justify-center"><Shield className="mr-2" /> Vício em Jogos</h3>
            <p><strong>Jogadores Anônimos Brasil</strong></p>
            <p className="flex items-center justify-center"><Phone className="mr-2" /> (11) 96384-0438</p>
            <p className="flex items-center justify-center"><BookOpen className="mr-2" /> jogadoresanonimos.org.br</p>
          </div>
          
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <h3 className="font-bold text-blue-400 mb-2 flex items-center justify-center"><Heart className="mr-2" /> SUS - Ajuda Gratuita</h3>
            <p><strong>CAPS & UBS</strong></p>
            <p className="flex items-center justify-center"><Info className="mr-2" /> Procure o mais próximo</p>
            <p className="flex items-center justify-center"><Users className="mr-2" /> Atendimento psicológico gratuito</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Vida Sem Apostas - Todos os direitos reservados</p>
          <p className="mt-2">Este é um projeto sem fins lucrativos para conscientização sobre os riscos do vício em jogos de azar</p>
           <p className="text-gray-600 text-sm mt-2 text-center w-full">
            Desenvolvido por <a href="https://devmxs.com.br" className="hover:text-blue-700 font-semibold transition">DEVMXS</a>
          </p>
        </div>
      </div>
    </footer>
  );

  const Modal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{modalContent?.title}</h3>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-gray-700 mb-4">
            {modalContent?.content}
          </div>
          <div className="flex justify-end">
            <button 
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12 pt-8">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">
            🚨 PARE AGORA! 🚨
          </span>
        </h2>
        <h3 className="text-2xl md:text-3xl text-red-600 font-bold mb-4">
          Os Jogos de Azar Online Podem Destruir Sua Vida
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Jogos como o "Jogo do Tigrinho", roleta online e slots virtuais são programados para te fazer perder dinheiro. 
          <strong className="text-red-600"> Eles não são investimentos</strong> - são armadilhas financeiras que podem levar ao vício, 
          endividamento e destruição familiar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            <h3 className="text-xl font-bold text-red-700">Sinais de Alerta</h3>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Pensando em jogos constantemente
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Mentindo sobre gastos
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Tentando "recuperar" perdas
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Negligenciando responsabilidades
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Sentindo ansiedade ou depressão
            </li>
          </ul>
          <button 
            onClick={() => openModal({
              title: "Sinais de Alerta Completo",
              content: (
                <div>
                  <p className="mb-4">O vício em jogos de azar pode se manifestar de várias formas. Aqui estão mais sinais para ficar atento:</p>
                  <ul className="space-y-2">
                    <li>• Usar dinheiro destinado a contas ou necessidades básicas para apostar</li>
                    <li>• Pedir dinheiro emprestado para continuar jogando</li>
                    <li>• Sentir euforia ao pensar em jogar e irritação quando não pode</li>
                    <li>• Mentir sobre o tempo e dinheiro gastos em jogos</li>
                    <li>• Tentar esconder o comportamento de familiares e amigos</li>
                    <li>• Perder o interesse em atividades que antes gostava</li>
                  </ul>
                </div>
              )
            })}
            className="mt-4 text-red-600 hover:text-red-800 text-sm font-semibold transition-colors"
          >
            Ver todos os sinais →
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 text-green-500 mr-3" />
            <h3 className="text-xl font-bold text-green-700">Você Pode Se Recuperar</h3>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Admitir o problema é o primeiro passo
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Existem grupos de apoio gratuitos
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Tratamento psicológico pelo SUS
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Milhares se recuperaram
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Sua família quer te ajudar
            </li>
          </ul>
          <button 
            onClick={() => openModal({
              title: "Caminhos para Recuperação",
              content: (
                <div>
                  <p className="mb-4">A recuperação é possível e milhões de pessoas conseguiram. Veja os passos:</p>
                  <ol className="space-y-3">
                    <li><strong>1. Reconhecimento:</strong> Admita que tem um problema e que precisa de ajuda</li>
                    <li><strong>2. Busque apoio:</strong> Converse com alguém de confiança ou profissional</li>
                    <li><strong>3. Remova tentações:</strong> Delete apps, bloqueie sites, evite ambientes</li>
                    <li><strong>4. Controle financeiro:</strong> Peça ajuda para gerenciar seu dinheiro</li>
                    <li><strong>5. Novos hábitos:</strong> Substitua o vício por atividades saudáveis</li>
                    <li><strong>6. Paciência:</strong> A recuperação é um processo com altos e baixos</li>
                  </ol>
                </div>
              )
            })}
            className="mt-4 text-green-600 hover:text-green-800 text-sm font-semibold transition-colors"
          >
            Como começar a recuperação →
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">💡 Dica Motivacional</h3>
          <p className="text-xl italic mb-4">"{motivationalTips[currentTip]}"</p>
          <div className="flex justify-center space-x-2">
            {motivationalTips.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentTip(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentTip ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {gamblingStats.map(stat => (
          <div 
            key={stat.id} 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer"
            onClick={() => openModal({
              title: `Estatística: ${stat.title}`,
              content: (
                <div>
                  <p className="mb-4">Esta estatística mostra um dos muitos problemas causados pelo vício em jogos de azar. Pesquisas indicam que:</p>
                  <p className="text-lg font-semibold mb-4">{stat.value} dos jogadores problemáticos {stat.title.toLowerCase()}</p>
                  <p>Esses números são baseados em estudos realizados com pessoas que desenvolveram dependência em jogos de azar.</p>
                </div>
              )
            })}
          >
            <div className="text-blue-600 mb-2 flex justify-center">
              <div className="p-2 bg-blue-100 rounded-full">
                {stat.icon}
              </div>
            </div>
            <h4 className="font-bold text-gray-800">{stat.title}</h4>
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          onClick={() => setCurrentPage('info')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center space-x-2"
        >
          <Info className="w-5 h-5" />
          <span>Entenda os Riscos</span>
        </button>
        <button 
          onClick={() => setCurrentPage('support')}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center space-x-2"
        >
          <Phone className="w-5 h-5" />
          <span>Buscar Ajuda Agora</span>
        </button>
        <button 
          onClick={() => setCurrentPage('stories')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center space-x-2"
        >
          <Users className="w-5 h-5" />
          <span>Histórias Reais</span>
        </button>
      </div>
    </div>
  );

  const InfoPage = () => (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center pt-8">
        📚 Informações Importantes sobre Vício em Jogos
      </h2>

      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Como Identificar Sinais de Vício
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Frown className="w-5 h-5 mr-2 text-red-500" />
                Sinais Comportamentais:
              </h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Jogar por períodos cada vez mais longos
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Mentir sobre tempo e dinheiro gastos
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Tentar "recuperar" dinheiro perdido
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Negligenciar trabalho, estudo ou família
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Irritabilidade quando não pode jogar
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
                Sinais Emocionais:
              </h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Ansiedade e depressão
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Sentimentos de culpa e vergonha
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Mudanças bruscas de humor
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Isolamento social
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Pensamentos sobre dinheiro constantemente
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" />
            Impactos Financeiros
          </h3>
          <p className="text-gray-600 mb-6">
            Os jogos online são programados matematicamente para fazer você perder. A "casa sempre ganha" não é apenas um ditado - é uma realidade estatística.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-red-800 text-lg mb-3">
              ⚠️ Dados alarmantes:
            </h4>
            <ul className="text-red-700 space-y-2">
              <li>• Jogadores problemáticos perdem em média R$ 2.000 a R$ 10.000 por mês</li>
              <li>• 78% pegam empréstimos para continuar jogando</li>
              <li>• 63% já usaram dinheiro de contas básicas para apostar</li>
              <li>• 45% já venderam bens pessoais para recuperar perdas</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-bold text-blue-800 text-lg mb-3">
              💡 Como sair das dívidas:
            </h4>
            <ol className="text-blue-700 space-y-3">
              <li><strong>1. Pare imediatamente:</strong> Cada aposta piora a situação</li>
              <li><strong>2. Liste todas as dívidas:</strong> Saiba exatamente quanto deve</li>
              <li><strong>3. Converse com credores:</strong> Muitos oferecem renegociação</li>
              <li><strong>4. Busque ajuda profissional:</strong> Assistentes sociais podem ajudar</li>
              <li><strong>5. Controle financeiro:</strong> Estabeleça um orçamento realista</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2" />
            Impactos Emocionais e Sociais
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Relacionamentos</h4>
              <p className="text-sm text-gray-600 mt-3">
                Mentiras destroem a confiança familiar e podem levar ao isolamento completo e até divórcio.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Frown className="text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Saúde Mental</h4>
              <p className="text-sm text-gray-600 mt-3">
                Ansiedade, depressão e em casos extremos, pensamentos suicidas são comuns entre jogadores problemáticos.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800">Trabalho/Estudos</h4>
              <p className="text-sm text-gray-600 mt-3">
                Perda de foco, faltas constantes e possível demissão ou reprovação acadêmica.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Dicas de Prevenção
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-500" />
                Estratégias Práticas:
              </h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Remova aplicativos de jogos do celular
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Bloqueie sites de apostas no roteador
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Entregue controle financeiro para familiar
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Busque atividades alternativas prazerosas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Estabeleça rotinas saudáveis
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-500" />
                Apoio Social:
              </h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Seja honesto com família e amigos
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Participe de grupos de apoio
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Procure terapia psicológica
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Evite ambientes que estimulem jogos
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Construa uma rede de apoio sólida
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SupportPage = () => (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center pt-8">
        🆘 Onde Buscar Ajuda - Você Não Está Sozinho
      </h2>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">💪 Mensagem de Apoio:</h3>
          <p className="text-xl italic mb-4">"{motivationalTips[currentTip]}"</p>
          <div className="flex justify-center space-x-2">
            {motivationalTips.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentTip(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentTip ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {helpResources.map((resource, index) => (
          <div 
            key={resource.id}
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${index === 0 ? 'border-red-500' : index === 1 ? 'border-green-500' : 'border-blue-500'} hover:shadow-lg transition-shadow`}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              {index === 0 ? (
                <Phone className="w-6 h-6 mr-2 text-red-500" />
              ) : index === 1 ? (
                <Users className="w-6 h-6 mr-2 text-green-500" />
              ) : (
                <Heart className="w-6 h-6 mr-2 text-blue-500" />
              )}
              {index + 1}. {resource.name}
            </h3>
            <div className={`p-6 rounded-lg ${index === 0 ? 'bg-red-50' : index === 1 ? 'bg-green-50' : 'bg-blue-50'}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Contato:</h4>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>{resource.phone}</span>
                  </p>
                  <p className="flex items-center mt-2">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <a 
                      href={`https://${resource.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      {resource.website}
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Descrição:</h4>
                  <p>{resource.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            ⚡ Dicas para Buscar Ajuda:
          </h3>
          <ul className="text-yellow-700 space-y-4">
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <strong>Seja honesto:</strong> Conte a verdade sobre sua situação financeira e emocional para os profissionais de ajuda
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <strong>Leve um acompanhante:</strong> Um familiar ou amigo pode te dar apoio moral na primeira consulta
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <strong>Não desista:</strong> A recuperação é um processo, podem haver recaídas - o importante é continuar tentando
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <strong>Participe ativamente:</strong> Compareça às consultas, siga as orientações e faça sua parte no processo
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <strong>Construa uma rede:</strong> Conecte-se com outras pessoas em recuperação para apoio mútuo
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📅 Marque na Agenda: Primeiro Passo para a Recuperação
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comprometa-se hoje mesmo a dar o primeiro passo. Marque um horário para buscar ajuda profissional ou participar de um grupo de apoio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.open('https://www.cvv.org.br', '_blank')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Ligar para o CVV (188)</span>
            </button>
            <button 
              onClick={() => window.open('https://jogadoresanonimos.org.br', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Contatar Jogadores Anônimos</span>
            </button>
            <button 
              onClick={() => setCurrentPage('tracker')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Começar Meu Diário de Recuperação</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StoriesPage = () => (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center pt-8">
        📖 Histórias de Superação - Eles Conseguiram, Você Também Pode
      </h2>
      
      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        <em>Relatos fictícios baseados em situações reais vividas por pessoas que superaram o vício em jogos de azar. 
        Essas histórias mostram que a recuperação é possível com ajuda adequada e força de vontade.</em>
      </p>

      <div className="mb-8 relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeStory * 100}%)` }}>
            {realStories.map((story, index) => (
              <div key={story.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{story.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{story.content}</p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2">📌 Lição Principal:</h4>
                        <p className="text-blue-700">
                          {index === 0 ? "O vício pode começar pequeno mas crescer rapidamente. Buscar ajuda especializada foi fundamental para a recuperação."
                          : index === 1 ? "A ilusão de 'recuperar as perdas' só leva a mais dívidas. O tratamento psicológico ajudou a quebrar esse ciclo."
                          : "O isolamento social é um efeito comum do vício. Participar de grupos de apoio ajudou a reconstruir relacionamentos."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => setActiveStory(prev => (prev > 0 ? prev - 1 : realStories.length - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 ml-2"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={() => setActiveStory(prev => (prev < realStories.length - 1 ? prev + 1 : 0))}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mr-2"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="flex justify-center mt-6 space-x-2">
          {realStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStory(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === activeStory ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Seu Diário de Recuperação</h3>
          <p className="text-gray-600 mb-6">
            Registrar seus pensamentos e sentimentos pode ajudar no processo de recuperação. Comece seu diário pessoal para acompanhar seu progresso.
          </p>
          <button 
            onClick={() => setCurrentPage('tracker')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
          >
            Acessar Meu Diário
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold mb-4">🌟 Sua História de Superação Pode Começar Hoje</h3>
          <p className="mb-6">
            Cada uma dessas pessoas pensou que era impossível parar. Mas elas descobriram que com ajuda adequada, 
            apoio da família e determinação, é possível reconstruir a vida.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentPage('support')}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex-1"
            >
              Buscar Ajuda Agora
            </button>
            <button 
              onClick={() => setCurrentPage('info')}
              className="bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-colors flex-1"
            >
              Ver Informações
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TrackerPage = () => (
    <div className="max-w-4xl mx-auto px-4 pt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📅 Meu Progresso de Recuperação
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-500" />
            Dias Sem Apostar
          </h3>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={decrementDays}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-600">{daysClean}</p>
              <p className="text-gray-600">dias limpos</p>
            </div>
            <button 
              onClick={incrementDays}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Benefícios já alcançados:</h4>
            <ul className="text-blue-700 space-y-1">
              {daysClean > 0 && <li>✔️ {daysClean} dia(s) de vitória sobre o vício</li>}
              {daysClean > 7 && <li>✔️ 1 semana sem jogar - humor mais estável</li>}
              {daysClean > 30 && <li>✔️ 1 mês limpo - começando a reconstruir finanças</li>}
              {daysClean > 90 && <li>✔️ 3 meses - maior clareza mental e controle</li>}
              {daysClean <= 0 && <li>Comece agora e veja seus benefícios aparecerem aqui</li>}
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-500" />
            Dinheiro Economizado
          </h3>
          <div className="mb-6">
            <p className="text-5xl font-bold text-green-600 mb-2">R$ {(daysClean * dailyAmount).toFixed(2)}</p>
            <p className="text-gray-600">Estimativa baseada em sua economia diária</p>
          </div>
          
          <button 
            onClick={() => setShowSavingsCalculator(!showSavingsCalculator)}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            {showSavingsCalculator ? 'Ocultar calculadora' : 'Configurar calculadora'} 
            {showSavingsCalculator ? <ChevronLeft className="ml-1" /> : <ChevronRight className="ml-1" />}
          </button>
          
          {showSavingsCalculator && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Valor médio que gastava por dia:</label>
                <div className="flex items-center">
                  <span className="mr-2">R$</span>
                  <input 
                    type="number" 
                    value={dailyAmount}
                    onChange={(e) => setDailyAmount(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    min="0"
                    step="5"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Período para calcular:</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    value={calculatorDays}
                    onChange={(e) => setCalculatorDays(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 w-20 mr-2"
                    min="1"
                  />
                  <span>dias</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <p className="font-semibold text-green-800">
                  Em {calculatorDays} dias, você economizaria aproximadamente <span className="text-lg">R$ {calculateSavings()}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
          Meu Diário de Recuperação
        </h3>
        <textarea 
          className="w-full border border-gray-300 rounded-lg p-4 h-40 mb-4"
          placeholder="Como você está se sentindo hoje? Quais foram seus desafios e vitórias? Escreva aqui seus pensamentos..."
        ></textarea>
        <div className="flex justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Limpar
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
            Salvar Entrada
          </button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-8 text-center">
        <h3 className="text-xl font-bold mb-4">Precisa de Ajuda Imediata?</h3>
        <p className="mb-6">
          Se estiver passando por uma crise ou sentindo muita vontade de jogar, não hesite em buscar ajuda.
        </p>
        <button 
          onClick={() => window.open('tel:188')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
        >
          <Phone className="mr-2" />
          Ligar para o CVV (188)
        </button>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'info': return <InfoPage />;
      case 'support': return <SupportPage />;
      case 'stories': return <StoriesPage />;
      case 'tracker': return <TrackerPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-8">
        {renderCurrentPage()}
      </main>
      
      <Footer />
      <Modal />
    </div>
  );
};

export default GamblingAwarenessApp;