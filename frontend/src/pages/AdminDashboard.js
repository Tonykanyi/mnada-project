import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0); // Total users fetched from backend
  const [activeAuctions, setActiveAuctions] = useState(0); // Active auctions fetched from backend
  const [formData, setFormData] = useState({
    auctionDate: "",
    startTime: "",
    endTime: "",
  }); // Form data for new auction
  const [auctions, setAuctions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch data for Total Users and Active Auctions from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.total);

        const auctionsResponse = await fetch("/api/auctions");
        const auctionsData = await auctionsResponse.json();
        const activeAuctionsCount = auctionsData.filter(
          (auction) => auction.status === "ongoing"
        ).length;

        setActiveAuctions(activeAuctionsCount);
        setAuctions(auctionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new auction
  const createAuction = async (e) => {
    e.preventDefault();

    if (!formData.auctionDate || !formData.startTime || !formData.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.auctionDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
        }),
      });

      if (response.ok) {
        const newAuction = await response.json();
        setAuctions([...auctions, newAuction]);
        setFormData({ auctionDate: "", startTime: "", endTime: "" }); // Reset form fields
      } else {
        alert("Failed to create auction. Please try again.");
      }
    } catch (error) {
      console.error("Error creating auction:", error);
    }
  };

  // Filter auctions based on status
  const filterAuctions = (status) => {
    setFilterStatus(status);
  };

  const filteredAuctions =
    filterStatus === "all"
      ? auctions
      : auctions.filter((auction) => auction.status === filterStatus);

  return (
    <div className="container mx-auto p-6 bg-purple-100">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

      {/* System Overview Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">System Overview</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-blue-100 p-4 rounded-md hover:shadow-lg">
            <h3 className="font-semibold">Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md hover:shadow-lg">
            <h3 className="font-semibold">Active Auctions</h3>
            <p>{activeAuctions}</p>
          </div>
        </div>
      </div>

      {/* Create Auction Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Create Auction</h2>
        <form onSubmit={createAuction} className="mt-4">
          <div className="mb-4">
            <label className="block font-medium">Date of Auction</label>
            <input
              type="date"
              name="auctionDate"
              value={formData.auctionDate}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Create Auction
          </button>
        </form>
      </div>

      {/* Auction Filter Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Filter Auctions</h2>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => filterAuctions("all")}
            className={`p-2 rounded ${
              filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => filterAuctions("upcoming")}
            className={`p-2 rounded ${
              filterStatus === "upcoming" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => filterAuctions("ongoing")}
            className={`p-2 rounded ${
              filterStatus === "ongoing" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Ongoing
          </button>
          <button
            onClick={() => filterAuctions("closed")}
            className={`p-2 rounded ${
              filterStatus === "closed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Display Filtered Auctions */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Filtered Auctions</h2>
        {filteredAuctions.length === 0 ? (
          <p>No auctions found.</p>
        ) : (
          <ul>
            {filteredAuctions.map((auction) => (
              <li key={auction.id} className="border p-4 mb-4">
                <h4 className="font-bold">{auction.name}</h4>
                <p>Status: {auction.status}</p>
                <p>Date: {auction.date}</p>
                <p>
                  Time: {auction.startTime} - {auction.endTime}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
