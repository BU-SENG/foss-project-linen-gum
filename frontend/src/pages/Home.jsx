import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These campaigns are making a real impact. Your contribution, no
            matter how small, can help them reach their goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
              alt="Clean Water for Rural Communities"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clean Water for Rural Communities
              </h3>
              <p className="text-gray-600 mb-4">
                Help us provide clean drinking water to rural communities in
                need. Your donation will fund well construction and water
                purification systems.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                By Water Aid Foundation
              </p>
              <div className="text-sm text-gray-700 font-medium">
                Goal: $50,000 | Raised: $32,450
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80"
              alt="Education for Underprivileged Children"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Education for Underprivileged Children
              </h3>
              <p className="text-gray-600 mb-4">
                Support our mission to provide quality education to
                underprivileged children. Your donation will fund school
                supplies, teacher salaries, and infrastructure improvements.
              </p>
              <p className="text-sm text-gray-500 mb-2">By Education First</p>
              <div className="text-sm text-gray-700 font-medium">
                Goal: $75,000 | Raised: $45,200
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80"
              alt="Emergency Relief for Natural Disaster Victims"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Relief for Natural Disaster Victims
              </h3>
              <p className="text-gray-600 mb-4">
                Provide immediate assistance to victims of recent natural
                disasters. Your donation will help with food, shelter, medical
                care, and rebuilding efforts.
              </p>
              <p className="text-sm text-gray-500 mb-2">By Global Relief</p>
              <div className="text-sm text-gray-700 font-medium">
                Goal: $100,000 | Raised: $87,500
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
              alt="Medical Supplies for Rural Clinics"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Medical Supplies for Rural Clinics
              </h3>
              <p className="text-gray-600 mb-4">
                Help us provide essential medical supplies to understaffed and
                under-resourced rural clinics. Your donation will save lives.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                By Healthcare for All
              </p>
              <div className="text-sm text-gray-700 font-medium">
                Goal: $30,000 | Raised: $12,750
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1634&q=80"
              alt="Animal Shelter Renovation"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Animal Shelter Renovation
              </h3>
              <p className="text-gray-600 mb-4">
                Our animal shelter needs urgent repairs and upgrades to continue
                providing safe housing for abandoned pets. Help us create a
                better environment for animals awaiting their forever homes.
              </p>
              <p className="text-sm text-gray-500 mb-2">
                By Animal Rescue League
              </p>
              <div className="text-sm text-gray-700 font-medium">
                Goal: $25,000 | Raised: $8,300
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/campaigns">
            <button className="inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 text-base py-3 px-6">
              View All Campaigns
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
