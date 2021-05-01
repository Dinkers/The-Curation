import React, { useEffect } from 'react';

function Home () {
  useEffect(() => {
    console.log('Hello from home!')
  });
  
  return (
    <div>
      <p>Hello Home</p>
    </div>
  );
};

export default Home;
