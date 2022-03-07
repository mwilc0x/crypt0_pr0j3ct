import React from 'react';

type Props = {
    handleSubmitFromParent?: (input: String) => void,
};
const UserInputForm = ({ handleSubmitFromParent }: Props) => {
    const [input, setInput] = React.useState('');

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (handleSubmitFromParent && !!input) {
            handleSubmitFromParent(input);
        } else { 
            // do something else 
        }
    }

    return (
        <>
            <input
                type="text"
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button type="submit" onClick={handleSubmit}>submit</button>
        </>
    )
}

export default UserInputForm;
