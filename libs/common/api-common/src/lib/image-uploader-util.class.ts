export class ImageUploaderUtil {
    private DUMMY = './assets/img/Dummy.png';
    public selectedFile: File = null;
    imgBuff: Uint8Array = null;
    imgSrc: ArrayBuffer | string = this.DUMMY;
    loadingRate = 100;

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (ev: any) => {
            this.imgBuff = new Uint8Array(<ArrayBuffer>(ev.target.result));

            const name = this.selectedFile.name;
            const idx = name.lastIndexOf('.');
            const docType = idx > 0 ? name.substring(idx + 1) : null;
            if (docType) {
                if (docType.indexOf('pdf') >= 0) {
                    this.imgSrc = ('./assets/img/Dummy.png');
                } else {
                    if (docType.indexOf('doc') >= 0) {
                        this.imgSrc = ('./assets/img/word.png');
                    } else {
                        if (docType.indexOf('xls') >= 0) {
                            this.imgSrc = ('./assets/img/excel.png');
                        } else {
                            if (docType.indexOf('mp4') >= 0) {
                                this.imgSrc = ('./assets/img/mp4.png');
                            } else {
                                if (docType.indexOf('mov') >= 0) {
                                    this.imgSrc = ('./assets/img/mov.png');
                                } else {
                                    if (docType.indexOf('mp3') >= 0) {
                                        this.imgSrc = ('./assets/img/mp3.png');
                                    } else {
                                        this.imgSrc = reader.result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        reader.readAsDataURL(this.selectedFile);
    }

}
