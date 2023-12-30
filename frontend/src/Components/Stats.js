import React from 'react';
import avatar from './user_photo.png';
import '../App.css';
import graph from './Graph.png'

const Stats = ({ username, problemsSolved, submissions }) => {
  return (
    <div className="user-statistics">
      <h1>User Statistics for XYZ {username}</h1>
      <div className='text-with-image'>
      <div className="label">
        <h2>Total Problems Solved: 200{problemsSolved}</h2>
        <h2>Total Submissions: 300{submissions}</h2>
        <h2>Easy Submissions: 100</h2>
        <h2>Medium Submissions: 50</h2>
        <h2>Hard Submissions: 50</h2>
      </div>
        <img className='avatar' src={avatar} alt="Failed to Load IMG" />
      </div>
        <div>
          <img className='graph' src={graph} alt="" />
        </div>
    </div>
  );
};

export default Stats;
