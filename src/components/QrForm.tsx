
const QrForm: React.FC = () => {

    return(
        <form>
            <label htmlFor="link1">Link 1:</label>
            <span>{"(required)"}</span>
            <input type="text" id="link1" required />

            <label htmlFor="link2">Link 2:</label>
            <input type="text" id="link2" />

            <label htmlFor="link3">Link 3:</label>
            <input type="text" id="link3" />

            <button type="submit">Generate</button>
        </form>
    )
}

export default QrForm;