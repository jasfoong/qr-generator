import {useState, useRef} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import './QrForm.css'

const QrForm: React.FC = () => {
    const [link1Value, setLink1Value] = useState<string>('');
    const [link2Value, setLink2Value] = useState<string>('');
    const [link3Value, setLink3Value] = useState<string>('');
    const [paddingValue, setPaddingValue] = useState<boolean>(true);
    const [qrSize, setQrSize] = useState<string>('small');
    const [qrCodeValues, setQrCodeValues] = useState<string[]>([]);
    const qrRefs = useRef<Array<SVGSVGElement | null>>([]);

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

        setQrCodeValues([link1Value, link2Value, link3Value].filter(Boolean))
    }

    const handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaddingValue(event.target.checked)
    }

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQrSize(event.target.value)
    }

    const handleSVGDownload = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        qrRefs.current.forEach((svgElement, index) => {
            if (!svgElement) return;

            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement)

            const blob = new Blob([svgString], {type: 'image/svg+xml'})
            const url = URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url;
            link.download = `qr-code-${index+1}.svg`

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        })

        setQrCodeValues([])
    }

    return(
        <>
        <div className="qr-container">
            <form onSubmit={handleSVGDownload} className="form-container">
                <div className="form-label-input-container">
                    <label htmlFor="link1" className="form-label">Link 1:</label>
                    <span className="form-label-required">*required</span>
                </div>
                <input type="text" id="link1" value={link1Value} onChange={handleInputChange} className="form-input" placeholder="https://" required />

                <label htmlFor="link2" className="form-label">Link 2:</label>
                <input type="text" id="link2" value={link2Value} onChange={handleInputChange} className="form-input" placeholder="https://"/>

                <label htmlFor="link3" className="form-label">Link 3:</label>
                <input type="text" id="link3" value={link3Value} onChange={handleInputChange} className="form-input" placeholder="https://"/>

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

                <button type="submit" className="form-button">Download QR Code {"(SVG)"}</button>
            </form>
        

            {qrCodeValues.length > 0 && (
                <div className="qr-code-container">
                    {qrCodeValues.map((value, index) => (
                        <div key={index} className="qr-code-item">
                            <h3>QR Code {index + 1}</h3>
                            <QRCodeSVG 
                                value={value}  
                                marginSize={paddingValue ? 2 : 0}    
                                size={100}
                                level={(qrSize === 'large') ? 'H' : 'M'}
                                ref={(r) => (qrRefs.current[index] = r)}
                                className="qr-code"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}

export default QrForm;