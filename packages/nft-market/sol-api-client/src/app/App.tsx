import React from 'react';

function App() {
    function handleSubmit() {
        console.log('do something');
    }

    return (
        <div>
            <p>yo!</p>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default App;
