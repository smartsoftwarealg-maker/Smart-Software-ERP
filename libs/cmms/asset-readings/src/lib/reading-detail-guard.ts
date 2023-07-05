import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CMMSAssetReadingService } from './cmms-asset-reading.service';

export const readingDetailGuard = () => {
    const router = inject(Router);
    const service = inject(CMMSAssetReadingService);
    return service.getParentId() > 0? true : router.navigate(['/app/cmms/cmms-readings']);
};
