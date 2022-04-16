export function App() {
    let items = [];
    for (let i = 0; i < 1000; i++) {
        items.push(<li>hello!</li>);
    }
    
    return (
        <ul>{items}</ul>
    );
}
