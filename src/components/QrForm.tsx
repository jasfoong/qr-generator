import {useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';

const QrForm: React.FC = () => {
    const [link1Value, setLink1Value] = useState<string>('');
    const [link2Value, setLink2Value] = useState<string>('');
    const [link3Value, setLink3Value] = useState<string>('');
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

    const inputHandlers: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
        link1: setLink1Value,
        link2: setLink2Value,
        link3: setLink3Value,
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target
        
        const handler = inputHandlers[id]
        if (handler) {
            handler(value); 
        }
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const combinedLinks = [link1Value, link2Value, link3Value].filter(Boolean).join('\n');
        setQrCodeValue(combinedLinks);
    }

    return(
        <>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="link1">Link 1:</label>
            <span>{"(required)"}</span>
            <input type="text" id="link1" value={link1Value} onChange={handleInputChange} required />

            <label htmlFor="link2">Link 2:</label>
            <input type="text" id="link2" value={link2Value} onChange={handleInputChange} />

            <label htmlFor="link3">Link 3:</label>
            <input type="text" id="link3" value={link3Value} onChange={handleInputChange} />

            <button type="submit">Generate</button>
        </form>

        {qrCodeValue && (
            <div>
                <h3>QR Code:</h3>
                <QRCodeSVG value={qrCodeValue} />
            </div>
        )}
        </>
    )
}

export default QrForm;