import React from 'react';

export default function App() {
    const components = [];
  
    for (let i = 0; i <= 1000; i++) {
      components.push(<HeavyComponent />);
    }
  
    return (
      <>
        <h1>React 18 stream</h1>
        {components}
      </>
    );
  }
  
  function HeavyComponent() {
    return (
      <>
        <ul>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
        <article>
          <h1>Title</h1>
          <p>Content</p>
          <div>
            <div>
              <div>
                <div>
                  <div>12345</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }