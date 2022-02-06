import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ArchiveDocument, ARCHIVE_URL, UPDocInfo} from './archive-document';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';


@Injectable({
  providedIn: 'root'
})

export class ArchiveService extends BaseEntityService<ArchiveDocument> {
  public itemCount = 0;
  private center = 0;
  public page = 1;
  public size = 4;
  private filter: string = null;
  private defImage = ('./assets/img/Dummy.png');
  private PDF = ('./assets/img/pdf.png');
  private XLS = ('./assets/img/excel.png');
  private WRD = ('./assets/img/word.png');
  private MP4 = ('./assets/img/mp4.png');
  private MP3 = ('./assets/img/mp3.png');
  private MOV = ('./assets/img/mov.png');
  private ODT = ('./assets/img/odt.png');
  private ODS = ('./assets/img/ods.png');
  lastSavedImage: Observable<string> = of(null);

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, ARCHIVE_URL);
    }

  private reload(): Observable<ArchiveDocument[]> {
    const page0 = Math.max(0, this.page - 1);

    return this.getList(page0, this.size, this.filter)
      .pipe(
        tap(res => {
          this.itemCount = res.itemCount;
          res.body.forEach(e => {
            e.imageStr = this.toBase64FromDoc(e);
          })
        }),
        map(res => res.body));
  }

  load(page: number,
       size: number,
       filter: string): Observable<ArchiveDocument[]> {
    this.page = page;
    this.size = size;
    this.filter = filter;
    if (filter && typeof filter !== 'string') {
      throw new Error('Invalid***********');
    }
    return this.reload();
  }

  private toBase64FromDoc(doc: ArchiveDocument): string {
    const docType = doc.metadata.get('docType');
    if (!docType) {
      return ('');
    }
    if (docType.indexOf('pdf') >= 0) {
      return this.PDF;
    }
    if (docType.indexOf('odt') >= 0) {
      return this.ODT;
    }
    if (docType.indexOf('ods') >= 0) {
      return this.ODS;
    }
    if (docType.indexOf('xls') >= 0) {
      return this.XLS;
    }
    if (docType.indexOf('doc') >= 0) {
      return this.WRD;
    }
    if (docType.indexOf('mp4') >= 0) {
      return this.MP4;
    }
    if (docType.indexOf('mp3') >= 0) {
      return this.MP3;
    }
    if (docType.indexOf('mov') >= 0) {
      return this.MOV;
    }

    // if (doc.docImage) {
    //     const docType = doc.metadata.get('docType') || '';
    //   if (docType.indexOf('png') >= 0 ||
    //     docType.indexOf('jpeg') >= 0 ||
    //     docType.indexOf('jpg') >= 0 ||
    //     docType.indexOf('bmp') >= 0 ||
    //     docType.indexOf('tif') >= 0 ||
    //     docType.indexOf('gif') >= 0) {
    //     return this.toBase64(doc.docImage);
    //   }
    // }
    return this.defImage;
  }

  asPDFBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/pdf'});
  }

  asXLSBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/vnd.ms-excel'});
  }

  asXLSXBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  }

  asODTBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/vnd.oasis.opendocument.text'});
  }

  asODSBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/vnd.oasis.opendocument.spreadsheet'});
  }

  asDOCBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/msword'});
  }

  asMP4Blob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'video/mp4'});
  }

  asMP3Blob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'audio/mp3'});
  }

  asMOVBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'video/quicktime'});
  }

  asOctetBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/octet-stream'});
  }

  asDOCXBlob(numb: number[]): Blob {
    return new Blob([new Uint8Array(numb)], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  }

// // ************************
  public toBase64(arr: string[]): string {
    return window.atob(arr.reduce((p, c) => p + c));
  }

  deleteById(id: string): Observable<any> {
    return this.httpSrv.remove(`/warch?id=${id}`);
  }

  getArchiveById(id: string): Observable<ArchiveDocument[]> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id);
    }
    return id  && id !== '0'?
      this
      .httpSrv
      .get<ArchiveDocument[]>(`/warch`, params)
      .pipe(
        switchMap((res: ArchiveDocument[]) => {
          return this.getImage(id)
            .pipe(map(data => {
              if (data && res[0]) {
                res[0].imgSrc = 'data:image/jpeg;base64,'  + btoa(
                        new Uint8Array(data)
                          .reduce((acc, byte) => acc + String.fromCharCode(byte), '')
                      );
                return res;
              } else {
                return null;
              }
            }));
        })
      ) : of([]);
  }
//
//   get currentCenter() {
//     return this.center;
//   }
//
  upload(fd: FormData): Observable<any> {
    return this.httpSrv.upload(`/warch`, fd);
  }
//
//   // private upload(file: File, imgStr: Observable<string>): Observable<any> {
//   //     if (!file) {
//   //         return of(null);
//   //     }
//   //     this.lastSavedImage = imgStr;
//   //     const fd = new FormData();
//   //     fd.append('file', file, file.name);
//   //     return this.http
//   //                .upload(`/warch`, fd);
//   // }
//
  getImage(id: string): Observable<number[]> {
    const url = `/warch/image?id=${id}`;
    return id ? this
      .httpSrv
      .get<{ image: any }>(url)
      .pipe(map(res => res.image ? res.image.map((e: string) => +e) : null)) : of(null);
    // new Blob([data], { type: "application/octet-stream" }
  }

  updateMetadata(data: UPDocInfo): Observable<any> {
        return this.httpSrv.put('/warch', data);
  }
}
