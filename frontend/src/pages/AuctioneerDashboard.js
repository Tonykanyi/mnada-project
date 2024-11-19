import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuctioneerDashboard = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImages, setItemImages] = useState([]); // Store multiple images
  const [startingBid, setStartingBid] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]); // List of auction items


  // Categories for auction items
  const categories = [
    'Motor Vehicles',
    'Electronics',
    'Land & Real Estate',
    'Furniture',
    'Art & Collectibles',
    'Jewelry & Watches',
    'Antiques',
    'Machinery',
    'Others'
  ];

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items/item`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); // Fetch items when the component mounts

  // Handle form submission
  const handleAddItem = async (e) => {
    e.preventDefault();

    // Validate image count
    if (itemImages.length < 1 || itemImages.length > 10) {
      alert('Please upload between 1 and 10 images.');
      return;
    }

    const formData = new FormData();
    formData.append('image_url', itemImages); // Assuming image data will be uploaded to the backend separately
    formData.append('title', itemName);
    formData.append('description', itemDescription);
    formData.append('starting_price', startingBid);
    formData.append('category', category);
    formData.append('posted_by', 1); // Assuming the current user ID is 1

    try {
      const response = await axios.post(`${BASE_URL}/items/item`, formData);
      alert(response.data.message);
      fetchItems(); // Refresh the items list after adding a new item
    } catch (error) {
      console.error('Error adding item:', error);
      alert('There was an error adding the item.');
    }

    // Clear form fields
    setItemName('');
    setItemDescription('');
    setItemImages([]);
    setStartingBid('');
    setCategory('');
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('You can upload a maximum of 10 images.');
      return;
    }
    setItemImages(files);
  };

  return (
    <div className="container mx-auto p-6 bg-purple-100">
      <h1 className="text-3xl font-semibold">Auctioneer Dashboard</h1>

      {/* Add Item Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Add Item to Auction</h2>
        <form onSubmit={handleAddItem} className="mt-4">
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-lg font-medium">Item Name</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="hover:shadow-lg w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="itemDescription" className="block text-lg font-medium">Item Description</label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="hover:shadow-lg w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="itemImages" className="block text-lg font-medium">Item Images (1-10)</label>
            <input
              type="file"
              id="itemImages"
              onChange={handleImageChange}
              className=" w-full p-2 border border-gray-300 rounded mt-2"
              accept="image/*"
              multiple
              required
            />
            <p className="text-sm text-gray-500 mt-2">Select up to 10 images.</p>
          </div>

          <div className="mb-4">
            <label htmlFor="startingBid" className=" hover:shadow-md  block text-lg font-medium">Starting Bid</label>
            <input
              type="number"
              id="startingBid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 hover:bg-gray-200"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-medium">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 hover:bg-gray-200"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Add Item</button>
        </form>
      </div>

      {/* Active Auctions */}
      <div className="mt-8">
        <h3 className="text-xl font-medium">Active Auctions</h3>
        <ul className="mt-4">
          {items.length === 0 ? (
            <li>No items added yet.</li>
          ) : (
            items.map((item, index) => (
              <li key={index} className="border p-4 mb-4">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p>{item.description}</p>
                <p><strong>Starting Price:</strong> ${item.starting_price}</p>
                <p><strong>Category:</strong> {item.category}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AuctioneerDashboard;
