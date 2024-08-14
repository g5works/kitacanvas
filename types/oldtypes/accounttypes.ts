import { z } from "zod"
import { FileAttachment } from "./assignmenttypes"

export const ReportParameters = z.object({
    // The canvas id of the term to get grades from
    enrollment_term_id: z.number(),
    // If true, deleted objects will be included. If false, deleted objects will be
    // omitted.
    include_deleted: z.boolean(),
    // The id of the course to report on
    course_id: z.number(),
    // The sort order for the csv, Options: 'users', 'courses', 'outcomes'.
    order: z.enum(['users', 'courses', 'outcomes'] as const),
    // If true, user data will be included. If false, user data will be omitted.
    users: z.boolean(),
    // If true, account data will be included. If false, account data will be
    // omitted.
    accounts: z.boolean(),
    // If true, term data will be included. If false, term data will be omitted.
    terms: z.boolean(),
    // If true, course data will be included. If false, course data will be omitted.
    courses: z.boolean(),
    // If true, section data will be included. If false, section data will be
    // omitted.
    sections: z.boolean(),
    // If true, enrollment data will be included. If false, enrollment data will be
    // omitted.
    enrollments: z.boolean(),
    // If true, group data will be included. If false, group data will be omitted.
    groups: z.boolean(),
    // If true, data for crosslisted courses will be included. If false, data for
    // crosslisted courses will be omitted.
    xlist: z.boolean(),
    sis_terms_csv: z.number(),
    sis_accounts_csv: z.number(),
    // If true, enrollment state will be included. If false, enrollment state will
    // be omitted. Defaults to false.
    include_enrollment_state: z.boolean(),
    // Include enrollment state. Defaults to 'all' Options: ['active'| 'invited'|
    // 'creation_pending'| 'deleted'| 'rejected'| 'completed'| 'inactive'| 'all']
    enrollment_state: z.string().array(),
    // The beginning date for submissions. Max time range is 2 weeks.
    start_at: z.string().datetime(),
    // The end date for submissions. Max time range is 2 weeks.
    end_at: z.string().datetime(),
})

export const CanvasDomain = z.object({
    name: z.string(),
    domain: z.string(),
    distance: z.null(),
    authentication_provider: z.string().nullish()
})

export const Account = z.object({
    // the ID of the Account object
    id: z.number(),
    // The display name of the account
    name: z.string(),
    // The UUID of the account
    uuid: z.string(),
    // The account's parent ID, or null if this is the root account
    parent_account_id: z.number().optional(),
    // The ID of the root account, or null if this is the root account
    root_account_id: z.number().optional(),
    // The storage quota for the account in megabytes, if not otherwise specified
    default_storage_quota_mb: z.number(),
    // The storage quota for a user in the account in megabytes, if not otherwise
    // specified
    default_user_storage_quota_mb: z.number(),
    // The storage quota for a group in the account in megabytes, if not otherwise
    // specified
    default_group_storage_quota_mb: z.number(),
    // The default time zone of the account. Allowed time zones are
    // {http://www.iana.org/time-zones IANA time zones} or friendlier
    // {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails
    // time zones}.
    default_time_zone: z.string(),
    // The account's identifier in the Student Information System. Only included if
    // the user has permission to view SIS information.
    sis_account_id: z.string(),
    // The account's identifier in the Student Information System. Only included if
    // the user has permission to view SIS information.
    integration_id: z.string(),
    // The id of the SIS import if created through SIS. Only included if the user
    // has permission to manage SIS information.
    sis_import_id: z.string(),
    // The account's identifier that is sent as context_id in LTI launches.
    lti_guid: z.string(),
    // The state of the account. Can be 'active' or 'deleted'.
    workflow_state: z.enum(['active', 'deleted'] as const),
})

export const LTIAccount = z.object({
    // the ID of the Account object
    id: z.number(),
    // The display name of the account
    name: z.string(),
    // The UUID of the account
    uuid: z.string(),
    // The account's parent ID, or null if this is the root account
    parent_account_id: z.number().optional(),
    // The ID of the root account, or null if this is the root account
    root_account_id: z.number().optional(),
    // The state of the account. Can be 'active' or 'deleted'.
    workflow_state: z.enum(['active', 'deleted'] as const),
})

export const TermsOfService = z.object({
    // Terms Of Service id
    id: z.number(),
    // The given type for the Terms of Service
    terms_type: z.string(),
    // Boolean dictating if the user must accept Terms of Service
    passive: z.boolean(),
    // The id of the root account that owns the Terms of Service
    account_id: z.number(),
    // Content of the Terms of Service
    content: z.string(),
    // The type of self registration allowed
    self_registration_type: z.string().array(),
})

export const HelpLink = z.object({
    // The ID of the help link
    id: z.number(),
    // The name of the help link
    text: z.string(),
    // The description of the help link
    subtext: z.string(),
    // The URL of the help link
    url: z.string().url(),
    // The type of the help link
    type: z.string(),
    // The roles that have access to this help link
    available_to: z.string().array(),
})

export const HelpLinks = z.object({
    // Help link button title
    help_link_name: z.string(),
    // Help link button icon
    help_link_icon: z.string(),
    // Help links defined by the account. Could include default help links.
    custom_help_links: HelpLink.array(),
    // Default help links provided when account has not set help links of their own.
    default_help_links: HelpLink.array(),
})

export const AccountNotifications = z.object({
    // The subject of the notifications
    subject: z.string(),
    // The message to be sent in the notification.
    message: z.string(),
    // When to send out the notification.
    start_at: z.string().datetime(),
    // When to expire the notification.
    end_at: z.string().datetime(),
    // The icon to display with the message.  Defaults to warning.
    icon: z.string(),
    // (Deprecated) The roles to send the notification to.  If roles is not passed
    // it defaults to all roles
    roles: z.string().array().optional(),
    // The roles to send the notification to.  If roles is not passed it defaults to
    // all roles
    role_ids: z.number().array(),
})

export const Report = z.object({
    // The unique identifier for the report.
    id: z.number(),
    // The type of report.
    report: z.string(),
    // The url to the report download.
    file_url: z.string().url().optional(),
    // The attachment api object of the report. Only available after the report has
    // completed.
    attachment: FileAttachment,
    // The status of the report
    status: z.string(),
    // The date and time the report was created.
    created_at: z.string().datetime(),
    // The date and time the report started processing.
    started_at: z.string().datetime(),
    // The date and time the report finished processing.
    ended_at: z.string().datetime(),
    // The report parameters
    parameters: ReportParameters,
    // The progress of the report
    progress: z.number(),
    // This is the current line count being written to the report. It updates every
    // 1000 records.
    current_line: z.number(),
})

export const Admins = z.object({
    // The unique identifier for the account role/user assignment.
    id: z.number(),
    // The account role assigned. This can be 'AccountAdmin' or a user-defined role
    // created by the Roles API.
    role: z.string(),
    // The user the role is assigned to. See the Users API for details.
    user: z.number(),
    // The status of the account role/user assignment.
    workflow_state: z.string().optional()
})