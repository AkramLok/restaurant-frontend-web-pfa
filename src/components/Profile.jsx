import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container mx-auto">
      <header className="bg-blue-500 text-white text-center py-4">
        <h3 className="text-xl font-bold">
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div className="p-6">
        <p>
          <strong className="text-gray-800">Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong className="text-gray-800">Email:</strong> {currentUser.email}
        </p>
        <strong className="text-gray-800">Authorities:</strong>
        <ul className="list-disc ml-6">
          {currentUser.roles &&
            currentUser.roles.map((role, index) => (
              <li key={index} className="text-gray-800">
                {role}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
