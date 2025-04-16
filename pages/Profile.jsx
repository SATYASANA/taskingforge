import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Redux/Slices/AuthSlice'

export default function Profile() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
      .unwrap()
      .then((data) => {
        console.log("Profile data:", data)
      })
      .catch((err) => {
        console.error("Error fetching profile:", err)
      })
  }, [dispatch])

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}
