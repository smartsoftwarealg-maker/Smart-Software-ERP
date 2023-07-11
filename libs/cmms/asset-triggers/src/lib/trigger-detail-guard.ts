import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CMMSAssetTriggerService } from './cmms-asset-trigger.service';

export const triggerDetailGuard = () => {
    const router = inject(Router);
    const service = inject(CMMSAssetTriggerService);
    return service.getParentId() > 0? true : router.navigate(['/app/cmms/cmms-triggers']);
};
