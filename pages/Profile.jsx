import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../Redux/Slices/AuthSlice';

export default function Profile() {
  const dispatch = useDispatch();

  const { profile, error, isLoggedIn, data, role } = useSelector(state => state.auth);
  const profileData = profile?.userInfo

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div class="min-h-screen flex items-center justify-center p-4">
  <div class="max-w-sm w-full bg-white shadow-lg rounded-xl p-6">

    <div class="flex justify-center">
      <img
        src={profileData?.profilePic?.secure_url}
        alt="Profile"
        class="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
      />
    </div>


    <div class="text-center mt-4">
      <h2 class="text-xl font-semibold text-gray-800">{profileData?.userName}</h2>
      <p class="text-gray-600">{profileData?.email}</p>
      <span class="inline-block mt-2 px-3 py-1 text-sm text-white bg-indigo-500 rounded-full">
      {profileData?.role}
      </span>
    </div>
  </div>
</div>
  );
}
