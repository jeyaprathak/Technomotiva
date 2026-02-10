import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Avatar */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>
          </div>

          {/* Personal Information */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 font-medium">{user?.email}</p>
                </div>
              </div>

              {user?.phone && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              {user?.address && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 font-medium">{user.address}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Security</p>
                <p className="text-sm text-gray-600">Password settings</p>
              </div>
            </div>
          </button>

          <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Addresses</p>
                <p className="text-sm text-gray-600">Manage addresses</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}