import React from 'react'
import { useDispatch } from 'react-redux'
import { getProfile } from '../Redux/Slices/AuthSlice'

export default function Profile() {
    const dispatch = useDispatch()
    const res = dispatch(getProfile())
    console.log(res)
  return (
    <div>
       {/* {res} */}
    </div>
  )
}
