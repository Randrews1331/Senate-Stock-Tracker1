import { useState } from 'react';

function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`);


      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Senate Stock Tracker</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a stock..."
          className="border border-gray-400 p-2 rounded-md w-64"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Search
        </button>
      </form>

      <ul className="w-full max-w-md space-y-4">
        {results.map((stock) => (
          <li key={stock.symbol} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">{stock.name}</h2>
            <p>Symbol: {stock.symbol}</p>
            <p>Exchange: {stock.exchangeShortName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
