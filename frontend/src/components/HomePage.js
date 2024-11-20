import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const HomePage = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAuctions = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auctions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to fetch auctions.");
        return;
      }

      const data = await response.json();
      setAuctions(data);
    } catch (err) {
      setError("An error occurred while fetching auctions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleSelectAuction = (item) => {
    setSelectedAuction(item);
  };

  const handleBackToAuctions = () => {
    setSelectedAuction(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Ongoing Auctions
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading auctions...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : !selectedAuction ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auctions.length > 0 ? (
              auctions.map((item) => (
                <AuctionCard
                  key={item.auction_id}
                  item={item}
                  onSelect={() => handleSelectAuction(item)}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">
                No auctions available.
              </p>
            )}
          </div>
        ) : (
          <AuctionDetail
            auction={selectedAuction}
            onBack={handleBackToAuctions}
          />
        )}
      </div>
    </div>
  );
};

const AuctionCard = ({ item, onSelect }) => (
  <div
    className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden group cursor-pointer transition hover:shadow-lg"
    onClick={onSelect}
  >
    <img
      src={item.images[0]} // First image from the "images" array
      alt={item.title}
      className="w-full h-56 object-cover"
    />
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-700">{item.description}</p>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
        View Auction
      </button>
    </div>
  </div>
);

const AuctionDetail = ({ auction, onBack }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200"
      style={{ minHeight: "675px" }}
    >
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 text-sm font-semibold mb-6 hover:underline hover:text-blue-800 transition"
        >
          Back to Auctions
        </button>
        <h3 className="text-2xl font-bold mb-2">{auction.title}</h3>
        <p className="text-gray-700 mb-4">{auction.description}</p>
        <div className="flex flex-col space-y-2">
          <p>
            <strong>Starting Bid:</strong> ${auction.startingBid}
          </p>
          <p>
            <strong>Category:</strong> {auction.category}
          </p>
          <p>
            <strong>Posted By:</strong> {auction.postedBy}
          </p>
          <p>
            <strong>Auction Ends On:</strong>{" "}
            {new Date(auction.endDate).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
