import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const AdminDashboard = () => {
  const [pendingItems, setPendingItems] = useState([]); // List of pending items
  const [approvedItems, setApprovedItems] = useState([]); // List of approved items
  const [auctions, setAuctions] = useState([]); // List of all auctions
  const [filterStatus, setFilterStatus] = useState("all"); // Current filter status
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


  //fetch auctions data and set it to state
  useEffect(()=>{
    fetch(`${BASE_URL}/auctions`)
     .then((response) => response.json())
     .then((data) => setAuctions(data))
     .catch((error) => console.error('Error fetching auctions:', error));
  },[])
  console.log(auctions)
  const [formData, setFormData] = useState({
    auctionName:"",
    auctionDate: "",
    startTime: "",
    endTime: "",
  }); // Form data for new auction

  // Approve an item
  const approveItem = (item) => {
    setApprovedItems([...approvedItems, item]);
    setPendingItems(pendingItems.filter((i) => i.id !== item.id)); // Remove item from pending
  };

  // Reject an item
  const rejectItem = (item) => {
    setPendingItems(pendingItems.filter((i) => i.id !== item.id)); // Remove item from pending
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new auction
  const createAuction = (e) => {
    e.preventDefault();

    if (!formData.auctionDate || !formData.startTime || !formData.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const newAuction = {
      name:  formData.auctionName,
      date: formData.auctionDate,
      start_time: formData.startTime,
      end_time: formData.endTime,
      status: "upcoming",
    };
    fetch(`${BASE_URL}/auctions`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newAuction)
    })
    .then(res=>{
      if(res.ok){
        return res.json().then((data)=>{toast.success("Auction created successfully");setAuctions([...auctions, data])});
      }else{
        toast.error("Failed to create auction")
        return res.json()
      }
    })
    setFormData({ auctionDate: "", startTime: "", endTime: "" }); // Reset form fields
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
      <h1 className="text-3xl font-semibold hover:shadow-inner">Admin Dashboard</h1>

      {/* System Overview Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">System Overview</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-blue-100 p-4 rounded-md hover:shadow-lg">
            <h3 className="font-semibold">Total Users</h3>
            <p>100</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md hover:shadow-lg">
            <h3 className="font-semibold">Active Auctions</h3>
            <p>5</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md hover:shadow-lg">
            <h3 className="font-semibold">Total Bids</h3>
            <p>350</p>
          </div>
        </div>
      </div>

      {/* Create Auction Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Create Auction</h2>
        <form onSubmit={createAuction} className="mt-4">
  <div className="mb-4">
    <label className="block font-medium">Auction Name</label>
    <input
      type="text"
      name="auctionName"
      value={formData.auctionName}
      onChange={handleInputChange}
      placeholder="Enter the name of the auction"
      className="border p-2 w-full rounded"
    />
  </div>
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
            onClick={() => filterAuctions("Upcoming")}
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
                  Time: {auction.start_time} - {auction.end_time}
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
