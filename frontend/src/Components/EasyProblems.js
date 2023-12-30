import React from 'react';
import '../App.css';

export default function EasyProblems() {

  const sampleProblems=[
    {
      name: "Sample Problem 1",
      rating: 1500,
      status: "AC",
    },
    {
      name: "Sample Problem 2",
      rating: 1600,
      status: "WA",
    },
    {
      name: "Sample Problem 3",
      rating: 1400,
      status: "TLE",
    },
  ];

  const handleClick = (problem) => {

  };

  return (
    <>
        <h1 className='heading'>PROBLEM SET</h1>
        <div>
            <ul className='subheading'>
                <li><a href="/EasyProblems"><h2 className='category-2'>Easy Problems</h2></a></li>
                <li><h1>|</h1></li>
                <li><a href="/MediumProblems" className='probs'>Medium</a></li>
                <li><h1>|</h1></li>
                <li><a href="/HardProblems" className='probs'>Hard</a></li>
        
            </ul>
        </div>
        <div className='header_underline'></div>

        <div className="row justify-content-center">
      <div className="table">
        <table className="t">
          <thead className="border-bottom">
            <tr>
              <th className="h5 text-center">Index</th>
              <th className="h5 text-center">Problem</th>
              <th className="h5 text-center">Rating</th>
              <th className="h5 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleProblems.map((problem, idx) => (
              <tr
                key={idx}
                onClick={() => handleClick(problem)}
                role="button"
              >
                <td className="text-center">{idx + 1}</td>
                <td className="text-center">{problem.name}</td>
                <td className="text-center">{problem.rating}</td>
                <td className="text-center">{problem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
