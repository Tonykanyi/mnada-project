import React, { useState, useEffect } from 'react';

const ClientDashboard = () => {
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  // Retrieve the selected auction from localStorage on mount
  useEffect(() => {
    const auction = localStorage.getItem('selectedAuction');
    if (auction) {
      setSelectedAuction(JSON.parse(auction));
    }
  }, []);

  // Handle placing a bid
  const handlePlaceBid = () => {
    if (bidAmount && parseFloat(bidAmount) > 0) {
      setBids((prevBids) => [...prevBids, parseFloat(bidAmount)]);
      setBidAmount('');
    } else {
      alert('Please enter a valid bid amount.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-purple-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Client Dashboard</h1>

      {selectedAuction ? (
        <div>
          <h2 className="text-2xl font-medium mb-4">{selectedAuction.title}</h2>

          {/* Auction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            {/* Carousel */}
            <div className="relative">
              <div className="flex overflow-hidden relative">
                <div className="flex transition-transform duration-500 ease-in-out">
                  {selectedAuction.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={selectedAuction.title}
                      className="w-full h-[28rem] object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Auction Information */}
            <div>
              <p>
                <strong>Starting Bid:</strong> Ksh {selectedAuction.startingBid}
              </p>
              <p>
                <strong>Category:</strong> {selectedAuction.category}
              </p>
              <p>
                <strong>Number of Bidders:</strong> {selectedAuction.numberOfBidders}
              </p>
              <p>
                <strong>Auction Ends On:</strong>{' '}
                {new Date(selectedAuction.endDate).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              {/* Bidding Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Place Your Bid</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your bid"
                  />
                  <button
                    onClick={handlePlaceBid}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    Place Bid
                  </button>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-medium">Your Bids:</h4>
                  <ul className="list-disc list-inside mt-2">
                    {bids.length > 0 ? (
                      bids.map((bid, index) => (
                        <li key={index}>Ksh {bid}</li>
                      ))
                    ) : (
                      <p className="text-gray-600">No bids placed yet.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No auction selected. Please return to the homepage and select an auction.</p>
      )}
    </div>
  );
};

export default ClientDashboard;
