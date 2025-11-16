import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  BarChart,
  LogOut,
  Upload,
  AlertCircle,
} from "lucide-react";
import { categories } from "../../../data/campaignsData";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [duration, setDuration] = useState("30");
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Campaign submitted for review!");
    navigate("/creator/campaigns");
  };

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create New Campaign
        </h1>
        <p className="text-gray-600">
          Fill in the details below to create your campaign
        </p>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              Campaign Review Process
            </h3>
            <p className="text-sm text-blue-700">
              All campaigns are reviewed by our team before going live. This
              typically takes 1-2 business days.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a clear, descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="6"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell your story and explain how donations will be used"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Minimum 100 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Global, North America"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Funding Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Goal ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1000"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="10000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                required
              />
              <p className="mt-1 text-sm text-gray-500">Minimum: $1,000</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Duration (days) <span className="text-red-500">*</span>
              </label>
              <select
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Campaign Image
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image <span className="text-red-500">*</span>
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Campaign preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview("")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 cursor-pointer"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageUpload}
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="mt-4 inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link to="/creator/campaigns">
            <button
              type="button"
              className="bg-transparent border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-base py-3 px-6 cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md text-base py-3 px-6 cursor-pointer"
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
