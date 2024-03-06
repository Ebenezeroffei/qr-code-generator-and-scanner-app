class App {

    constructor() {
        this.qrCode;
        this.qrCodeScanner;
        this.generateQRCode();
        this.clearQrCode();
        this.downloadQrCode();
        this.initQrCodeScan();
        this.scanQrCode();
        this.stopQrCodeScanner();
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
        }
    }


    initQrCodeScan = async () => {
        if (await QrScanner.hasCamera()) {
            const cameraList = await QrScanner.listCameras(true);
            cameraList.forEach(ele => {
                document.getElementById('select-camera').appendChild(
                    Object.assign(
                        document.createElement('option'),
                        {
                            value: ele.id,
                            innerHTML: ele.label
                        }
                    )
                )
            })
        }
    }

    scanQrCode = async () => {
        document.getElementById('start-scan').onclick = () => {
            // Show the reader container
            document.getElementById('reader-container').style.display = 'flex';
            // Hide the select camera
            document.getElementById('select-camera-container').style.display = 'none';

            const selectedCamera = document.getElementById('select-camera').value;
            const videoElement = document.getElementById('reader');
            this.qrCodeScanner = new QrScanner(
                videoElement,
                result => {
                    document.getElementById('decoded-text').innerHTML = result.data;
                },
                {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    preferredCamera: selectedCamera,
                }
            );
            this.qrCodeScanner.start();
        }
    }

    stopQrCodeScanner = () => {
        document.getElementById('stop-scan').onclick = () => {
            // Hide the reader container
            document.getElementById('reader-container').style.display = 'none';
            // Show the select camera
            document.getElementById('select-camera-container').style.display = 'flex';

            this.qrCodeScanner.destroy();
            this.qrCodeScanner = null;
        }
    }
}

const app = new App();