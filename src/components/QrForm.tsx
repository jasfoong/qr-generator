import {useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import './QrForm.css'

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
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const links = [link1Value, link2Value, link3Value]
        const qrCodes = links.filter(Boolean)

        setQrCodeValues(qrCodes)
    }

    return(
        <>
        <div className="form-container">
            <form onSubmit={handleFormSubmit}>
                <div className="form-label-input-container">
                    <label htmlFor="link1" className="form-label">Link 1:</label>
                    <span className="form-label-required">{"*required"}</span>
                </div>
                <input type="text" id="link1" value={link1Value} onChange={handleInputChange} className="form-input" required />

                <label htmlFor="link2" className="form-label">Link 2:</label>
                <input type="text" id="link2" value={link2Value} onChange={handleInputChange} className="form-input"/>

                <label htmlFor="link3" className="form-label">Link 3:</label>
                <input type="text" id="link3" value={link3Value} onChange={handleInputChange} className="form-input"/>

                <div className="form-checkbox">
                    <input type="checkbox" id="padding" name="padding" checked={paddingValue} onChange={handlePaddingChange}/>
                    <label htmlFor="padding">Include Padding</label>
                </div>

                <div className="form-radio">
                    <input type="radio" id="sizeSmall" name="size" value="small" onChange={handleSizeChange}/>
                    <label htmlFor="sizeSmall">Small {`(Digital)`}</label>
                    <input type="radio" id="sizeLarge" name="size" value="large" onChange={handleSizeChange}/>
                    <label htmlFor="sizeLarge">Large {`(Print)`}</label>
                </div>

                <button type="submit" className="form-button">Generate</button>
            </form>
        </div>

        {qrCodeValues.length > 0 && (
            <div className="qr-code-container">
                {qrCodeValues.map((value, index) => (
                    <div key={index} className="qr-code-item">
                        <h3>QR Code {index + 1}</h3>
                        <QRCodeSVG 
                            value={value}  
                            marginSize={paddingValue ? 2 : 0}    
                            size={(qrSize === 'large') ? 1000 : 300}
                            level={(qrSize === 'large') ? 'H' : 'M'}
                        />
                        <button></button>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default QrForm;