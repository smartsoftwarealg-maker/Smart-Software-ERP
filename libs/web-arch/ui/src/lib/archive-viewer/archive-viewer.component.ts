import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ArchiveService} from '../archive.service';
import {of} from 'rxjs';

@Component({
  selector: 'ss-archive-viewer',
  templateUrl: './archive-viewer.component.html',
  styleUrls: ['./archive-viewer.component.css']
})
export class ArchiveViewerComponent implements OnInit {
    imgSrc = null;

  constructor(private router: Router, private route: ActivatedRoute, private service: ArchiveService) {
      this.route
        .params
        .pipe(switchMap(params =>
          params['id'] ? this.service.getImage(params['id']) : of(null)
        ))
        .subscribe(data => {
          this.imgSrc = null;
          if (data) {
            this.imgSrc = 'data:image/jpeg;base64,'  + btoa(
              new Uint8Array(data)
                .reduce((res, byte) => res + String.fromCharCode(byte), '')
            );
          }
      });
  }

  ngOnInit() {
  }

  close() {
      this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
