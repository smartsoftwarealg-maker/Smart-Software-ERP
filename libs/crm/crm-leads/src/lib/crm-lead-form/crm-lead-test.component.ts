// lead-form.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MaterialModule} from "@ss/common/api-common";
import {CRMLead} from "../lead-api";


@Component({
    selector: 'app-lead-form',
    templateUrl: './crm-lead-test.component.html',
    imports: [
        ReactiveFormsModule,
        MaterialModule
    ],
    styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {
    leadForm: FormGroup;
    campaigns = [
        { id: 1, name: 'Q3 Product Launch' },
        { id: 2, name: 'Webinar Series' }
    ];
    users = [
        { id: 1, name: 'Alex Rivera' },
        { id: 2, name: 'Sam Chen' }
    ];
    teams = [
        { id: 1, name: 'Sales East' },
        { id: 2, name: 'Enterprise Team' }
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.leadForm = this.fb.group({
            // Required fields
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            company: ['', Validators.required],
            source: ['Web Form', Validators.required],
            status: ['New', Validators.required],
            score: [0, [Validators.min(0), Validators.max(100)]],
            priority: ['Medium'],
            createdAt: [new Date()],
            createdBy: [1], // current user
            updatedAt: [new Date()],
            description: [''],
            detail: [''],

            // Optional
            email: [''],
            phone: [''],
            companySite: [''],
            companyIndustry: [''],
            annualRevenue: [null],
            numberOfEmployees: [null],
            jobTitle: [''],
            addressLine1: [''],
            addressLine2: [''],
            city: [null],
            state: [''],
            postalCode: [''],
            country: [''],
            estimatedValue: [null],
            probability: [50],
            expectedCloseDate: [null],
            campaignId: [null],
            ownerId: [1],
            teamId: [null],
            memo: [''],
            companyDescription: [''],
            ownerDescription: [''],
            campaignDescription: ['']
        });
    }

    ngOnInit(): void {}

    hasError(controlName: string, errorName: string): boolean {
        return this.leadForm.controls[controlName]?.hasError(errorName) &&
            this.leadForm.controls[controlName]?.touched;
    }

    onSave(): void {
        if (this.leadForm.valid) {
            const lead: CRMLead = this.leadForm.value;
            console.log('Saving lead:', lead);
            // Call API service here
            this.router.navigate(['/leads']);
        }
    }

    onCancel(): void {
        this.router.navigate(['/leads']).then();
    }
}
