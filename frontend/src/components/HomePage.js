import React, { useState } from 'react';
import auctionData from '../data/AuctionData';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ userRole, handleLogout }) => {
  const [selectedAuction, setSelectedAuction] = useState(null);
  const navigate = useNavigate();

  const handleSelectAuction = (item) => {
    setSelectedAuction(item);
  };

  const handleJoinAuction = () => {
    if (selectedAuction) {
      // Store the selected auction in localStorage
      localStorage.setItem('selectedAuction', JSON.stringify(selectedAuction));
      // Redirect to login/registration page
      navigate('/login');
    } else {
      alert('Please select an auction to join.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Ongoing Auctions
        </h2>

        {!selectedAuction ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auctionData.slice(0, 6).map((item) => (
              <AuctionCard
                key={item.id}
                item={item}
                onSelect={() => handleSelectAuction(item)}
              />
            ))}
          </div>
        ) : (
          <AuctionDetail
            auction={selectedAuction}
            onBack={() => setSelectedAuction(null)}
            onJoinAuction={handleJoinAuction}
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
      src={item.images[0]}
      alt={item.title}
      className="w-full h-56 object-cover"
    />
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-700">{item.shortDescription}</p>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
        View Auction
      </button>
    </div>
  </div>
);

const AuctionDetail = ({ auction, onBack, onJoinAuction }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === auction.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? auction.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg p-8 border border-gray-200"
      style={{ minHeight: '675px' }}
    >
      {/* Carousel */}
      <div className="relative">
        <div className="flex overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {auction.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={auction.title}
                className="w-full h-[28rem] object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
        >
          &lt;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
        >
          &gt;
        </button>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {auction.images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Auction Details */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 text-sm font-semibold mb-6 hover:underline hover:text-blue-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Auctions
        </button>
        <h3 className="text-2xl font-bold mb-2">{auction.title}</h3>
        <p className="text-gray-700 mb-4">{auction.description}</p>
        <div className="flex flex-col space-y-2">
          <p>
            <strong>Starting Bid:</strong> Ksh {auction.startingBid}
          </p>
          <p>
            <strong>Category:</strong> {auction.category}
          </p>
          <p>
            <strong>Posted By:</strong> {auction.postedBy}
          </p>
          <p>
            <strong>Number of Bidders:</strong> {auction.numberOfBidders}
          </p>
          <p>
            <strong>Auction Ends On:</strong>{' '}
            {new Date(auction.endDate).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onJoinAuction}
            className="bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
            style={{ width: '33%' }}
          >
            Join Auction
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
