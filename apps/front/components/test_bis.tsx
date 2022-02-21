function child({ sendDataToParent }) {
    return (
        <button
            onClick={() => {
                sendDataToParent('oui oui');
            }}></button>
    );
}

export default child;
