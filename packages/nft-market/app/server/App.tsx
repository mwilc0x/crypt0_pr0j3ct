export function App() {
    let items = [];
    for (let i = 0; i < 1000; i++) {
        items.push('hello!');
    }
    
    return (
        <ul>{items}</ul>
    );
}
