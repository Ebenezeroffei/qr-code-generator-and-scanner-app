class App {

    constructor() {
        this.qrCode;
        this.generateQRCode();
        this.clearQrCode();
        this.downloadQrCode();
        this.scanQrCode();
    }

    generateQRCode = () => {
        document.getElementById('generate').onclick = () => {
            const input = $('#qr-input').val();
            const qrCodeContainer = document.getElementById('qr-code')
            if (input) {
                qrCodeContainer.innerHTML = '';
                this.qrCode = new QRCode(qrCodeContainer, {
                    text: input,
                    quietZone: 5,
                });
            }

        }
    }

    clearQrCode = () => {
        document.getElementById('clear').onclick = () => {
            this.qrCode.clear();
            document.getElementById('qr-code').appendChild(
                Object.assign(
                    document.createElement('p'),
                    { 'innerHTML': "Your Qr Code Will Appear Here" }
                )
            )
        }
    }

    downloadQrCode = () => {
        document.getElementById('download').onclick = () => {
            const canvas = document.getElementById('qr-code').firstChild
            const downloadUrl = canvas.toDataURL();

            const download = Object.assign(
                document.createElement('a'),
                {
                    'href': downloadUrl,
                    'download': `QR Code ${new Date().getTime()}`
                }
            )

            download.click();
            download.remove();

            // this.qrCode.download(`QR Code ${new Date().getTime()}`)
        }
    }



    scanQrCode = () => {
        const qrCodeScanner = new Html5QrcodeScanner(
            "reader", {
            fps: 10,
            qrbox: 250,
        }
        );
        qrCodeScanner.render(
            (decodedText, decodedResult) => {
                document.getElementById('decoded-text').innerHTML = decodedText;
            }, (errorMessage) => {
                console.log(errorMessage)
            }
        )
    }
}

const app = new App();