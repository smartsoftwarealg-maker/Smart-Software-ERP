import {CanActivateService, CanDeactivateService, LIST_URL, SideNavNode} from '@ss/common/api-common';
import {
    ABS_ADMINISTRATION_USER_DOCUMENT_URL,
    ABS_ADMINISTRATION_USER_MESSAGES_URL, ABS_ADMINISTRATION_USER_RECEIVED_MESSAGES_URL,
    ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
    ABS_ADMINISTRATION_WORKFLOW_URL
} from '../common';


export const workflowNavTree: SideNavNode = {
    name: 'WORKFLOW',
    icon: 'fa-solid fa-water-arrow-up',
    children: [
        {
            name: 'ADMINISTRATION_WORKFLOW_MESSAGES',
            icon: 'fa-solid fa-water',
            route: ABS_ADMINISTRATION_WORKFLOW_URL,
            accessRights: 'Workflow'
        },
        {
            name: 'ADMINISTRATION_USER_DOCUMENTS',
            icon: 'fa-solid fa-id-card',
            route: ABS_ADMINISTRATION_USER_DOCUMENT_URL,
            accessRights: 'UserDocument'
        },
        {
            name: 'ADMINISTRATION_USER_MESSAGES',
            icon: 'fa-regular fa-user-doctor-message',
            route: ABS_ADMINISTRATION_USER_MESSAGES_URL,
            accessRights: 'UserMessage'
        },
        {
            name: 'ADMINISTRATION_USER_RECEIVED_MESSAGES',
            icon: 'fa-regular fa-user-doctor-message',
            route: ABS_ADMINISTRATION_USER_RECEIVED_MESSAGES_URL,
            accessRights: 'UserMessage'
        },
        {
            name: 'ADMINISTRATION_WORKFLOW_INBOX',
            icon: 'fa-solid fa-envelope',
            route: ABS_ADMINISTRATION_WORKFLOW_INBOX_URL,
            accessRights: 'MailBox'
        },
    ],
    accessRights: 'WORKFLOW',
};
