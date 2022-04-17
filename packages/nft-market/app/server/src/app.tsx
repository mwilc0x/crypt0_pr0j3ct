export default function App() {
    let items = [];
    for (let i = 0; i < 1000; i++) {
        items.push(<li>hi</li>);
    }
    
    return (
        <ul>{items}</ul>
    );
}
