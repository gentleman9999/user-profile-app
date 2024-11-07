import React, { useState, useEffect } from 'react';

// User Profile Page Component
function UserProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    interest1: '',
    interest2: '',
    email: '',
    username: '',
    displayName: '',
    avatarURI: ''
  });
  const [errors, setErrors] = useState({});

  // Load saved profile from local storage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Validation functions
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!profile.name) {
      isValid = false;
      formErrors.name = 'Name cannot be empty';
    }
    if (!profile.age) {
      isValid = false;
      formErrors.age = 'Age cannot be empty';
    }
    if (!profile.gender || (profile.gender !== 'male' && profile.gender !== 'female')) {
      isValid = false;
      formErrors.gender = 'Gender must be either male or female';
    }
    if (!profile.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      isValid = false;
      formErrors.email = 'Invalid email format';
    }

    setErrors(formErrors);
    return isValid;
  };

  // Save profile to local storage
  const handleSave = () => {
    if (validateForm()) {
      localStorage.setItem('profile', JSON.stringify(profile));
      alert('Profile saved successfully');
    }
  };

  // Fetch user location using the IP geolocation API
  const fetchLocation = async () => {
    try {
      const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}`);
      const data = await response.json();
      const location = `${data.city}, ${data.country}`;
      setProfile((prevProfile) => ({ ...prevProfile, location }));
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://api-staging-0.gotartifact.com/v2/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
  
      // Set the profile state with the data from the API
      setProfile((prevProfile) => ({
        ...prevProfile,
        email: data.profile.email,
        username: data.profile.username,
        displayName: data.profile.display_name,
        avatarURI: data.profile.avatar_uri,
        location: `${data.profile.location || ''}` // Use location if available, otherwise empty
      }));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchUserProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            placeholder="Age"
            min="0"  // This sets the minimum value to 0
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <input
            type="text"
            name="interest1"
            value={profile.interest1}
            onChange={handleChange}
            placeholder="Interest 1"
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <input
            type="text"
            name="interest2"
            value={profile.interest2}
            onChange={handleChange}
            placeholder="Interest 2"
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleChange}
            placeholder="Display Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          
          <input
            type="url"
            name="avatarURI"
            value={profile.avatarURI}
            onChange={handleChange}
            placeholder="Avatar URI"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;
