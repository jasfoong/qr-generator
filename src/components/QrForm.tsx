import {useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';

const QrForm: React.FC = () => {
    const [link1Value, setLink1Value] = useState<string>('');
    const [link2Value, setLink2Value] = useState<string>('');
    const [link3Value, setLink3Value] = useState<string>('');
    const [qrCodeValues, setQrCodeValues] = useState<string[]>([]);
    const [paddingValue, setPaddingValue] = useState<boolean>(true);
    const [qrSize, setQrSize] = useState<string>('small');

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

    const handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaddingValue(event.target.checked)
    }

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQrSize(event.target.value)
        console.log(qrSize)
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const links = [link1Value, link2Value, link3Value]
        const qrCodes = links.filter(Boolean)

        setQrCodeValues(qrCodes)
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

            <div>
                <input type="checkbox" id="padding" name="padding" checked={paddingValue} onChange={handlePaddingChange}/>
                <label htmlFor="padding">Include Padding</label>
            </div>

            <div>
                <input type="radio" id="sizeSmall" name="size" value="small" onChange={handleSizeChange}/>
                <label htmlFor="sizeSmall">Small {`(Digital)`}</label>
                <input type="radio" id="sizeLarge" name="size" value="large" onChange={handleSizeChange}/>
                <label htmlFor="sizeLarge">Large {`(Print)`}</label>
            </div>

            <button type="submit">Generate</button>
        </form>

        {qrCodeValues.length > 0 && (
            <div>
                {qrCodeValues.map((value, index) => (
                    <div key={index}>
                        <h3>QR Code {index + 1}</h3>
                        <QRCodeSVG value={value} marginSize={paddingValue ? 4 : 0} size={(qrSize === 'large') ? 1000 : 300}/>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default QrForm;