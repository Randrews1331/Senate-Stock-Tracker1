import { useState } from 'react';

function SenateSearch() {
  const [senator, setSenator] = useState('');
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!senator) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/senate-trading?apikey=${process.env.REACT_APP_API_KEY}`
      );
      
      const data = await response.json();

      // Filter trades by senator's name (case-insensitive)
      const filteredTrades = data.filter((trade) =>
        trade.senator.toLowerCase().includes(senator.toLowerCase())
      );

      setTrades(filteredTrades);
    } catch (error) {
      console.error('Error fetching senator trades:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Senate Trade Tracker</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={senator}
          onChange={(e) => setSenator(e.target.value)}
          placeholder="Enter senator's name..."
          className="border border-gray-400 p-2 rounded-md w-64"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading trades...</p>
      ) : (
        <ul className="w-full max-w-2xl space-y-4">
          {trades.map((trade, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">{trade.senator}</h2>
              <p>
                <strong>Transaction Date:</strong> {trade.transactionDate}
              </p>
              <p>
                <strong>Asset:</strong> {trade.asset}
              </p>
              <p>
                <strong>Amount:</strong> {trade.amount}
              </p>
              <p>
                <strong>Price per Share:</strong> {trade.price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SenateSearch;
