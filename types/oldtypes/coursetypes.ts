
import { z } from "zod";

export const CalendarLinkType = z.object({
    ics: z.string().url()
})

export const BlueprintRestrictionsType = z.object({
    content: z.boolean(),
    points: z.boolean(),
    due_dates: z.boolean(),
    availability_dates: z.boolean()
})

export const CourseProgressType = z.object({
    // total number of requirements from all modules
    requirement_count: z.number(),
    // total number of requirements the user has completed from all modules
    requirement_completed_count: z.number(),
    // url to next module item that has an unmet requirement. null if the user has
    // completed the course or the current module does not require sequential
    // progress
    next_requirement_url: z.string().optional(),
    // date the course was completed. null if the course has not been completed by
    // this user
    completed_at: z.string().datetime().optional()
})

export const TermType = z.object({
    id: z.number(),
    name: z.string(),
    start_at: z.string().datetime(),
    end_at: z.string().datetime()
})

export const GradingPeriodType = z.object({
    // The unique identifier for the grading period.
    id: z.number(),
    // The title for the grading period.
    title: z.string(),
    // The start date of the grading period.
    start_date: z.string().datetime(),
    // The end date of the grading period.
    end_date: z.string().datetime(),
    // Grades can only be changed before the close date of the grading period.
    close_date: z.string().datetime(),
    // A weight value that contributes to the overall weight of a grading period set
    // which is used to calculate how much assignments in this period contribute to
    // the total grade
    weight: z.number(),
    // If true, the grading period's close_date has passed.
    is_closed: z.boolean()
})

export const CourseType = z.object({
    // the unique identifier for the course
    id: z.number(),
    // the SIS identifier for the course, if defined. This field is only included if
    // the user has permission to view SIS information.
    sis_course_id: z.number().nullish(),
    // the UUID of the course
    uuid: z.string(),
    // the integration identifier for the course, if defined. This field is only
    // included if the user has permission to view SIS information.
    integration_id: z.number().nullish(),
    // the unique identifier for the SIS import. This field is only included if the
    // user has permission to manage SIS information.
    sis_import_id: z.number().nullish(),
    // the full name of the course. If the requesting user has set a nickname for
    // the course, the nickname will be shown here.
    name: z.string(),
    // the course code
    course_code: z.string(),
    // the actual course name. This field is returned only if the requesting user
    // has set a nickname for the course.
    original_name: z.string().nullish(),
    // the current state of the course one of 'unpublished', 'available',
    // 'completed', or 'deleted'
    workflow_state: z.enum(['available', 'unpublished', 'completed', 'deleted'] as const),
    // the account associated with the course
    account_id: z.number(),
    // the root account associated with the course
    root_account_id: z.number(),
    // the enrollment term associated with the course
    enrollment_term_id: z.number(),
    // A list of grading periods associated with the course
    grading_periods: GradingPeriodType.array().nullish(),
    // the grading standard associated with the course
    grading_standard_id: z.number().nullish(),
    // the grade_passback_setting set on the course
    grade_passback_setting: z.string().nullish(),
    // the date the course was created.
    created_at: z.string().datetime(),
    // the start date for the course, if applicable
    start_at: z.string().datetime().nullish(),
    // the end date for the course, if applicable
    end_at: z.string().datetime(),
    // the course-set locale, if applicable
    locale: z.string().nullish(),
    // A list of enrollments linking the current user to the course. for student
    // enrollments, grading information may be included if include[]=total_scores
    enrollments: z.any(), //////////////////////////////////////////////////////NOT PROPERLY TYPED
    // optional: the total number of active and invited students in the course
    total_students: z.number().nullish(),
    // course calendar
    calendar: z.any(),
    // the type of page that users will see when they first visit the course -
    // 'feed': Recent Activity Dashboard - 'wiki': Wiki Front Page - 'modules':
    // Course Modules/Sections Page - 'assignments': Course Assignments List -
    // 'syllabus': Course Syllabus Page other types may be added in the future
    default_view: z.enum(['feed', 'wiki', 'modules', 'assignments', 'syllabus']),
    // optional: user-generated HTML for the course syllabus
    syllabus_body: z.string().nullish(),
    // optional: the number of submissions needing grading returned only if the
    // current user has grading rights and include[]=needs_grading_count
    needs_grading_count: z.number().nullish(),
    // optional: the enrollment term object for the course returned only if
    // include[]=term
    term: TermType.nullish(),
    // optional: information on progress through the course returned only if
    // include[]=course_progress
    course_progress: CourseProgressType.nullish(),
    // weight final grade based on assignment group percentages
    apply_assignment_group_weights: z.boolean(),
    // optional: the permissions the user has for the course. returned only for a
    // single course and include[]=permissions
    permissions: z.record(z.string(), z.boolean()).nullish(),
    is_public: z.boolean().nullish(),
    is_public_to_auth_users: z.boolean().nullish(),
    public_syllabus: z.boolean().nullish(),
    public_syllabus_to_auth: z.boolean().nullish(),
    // optional: the public description of the course
    public_description: z.string().nullish(),
    storage_quota_mb: z.number().nullish(),
    storage_quota_used_mb: z.number().nullish(),
    hide_final_grades: z.boolean().nullish(),
    license: z.string().nullish(),
    allow_student_assignment_edits: z.boolean().nullish(),
    allow_wiki_comments: z.boolean().nullish(),
    allow_student_forum_attachments: z.boolean().nullish(),
    open_enrollment: z.boolean().nullish(),
    self_enrollment: z.boolean().nullish(),
    restrict_enrollments_to_course_dates: z.boolean().nullish(),
    course_format: z.string().nullish(),
    // optional: this will be true if this user is currently prevented from viewing
    // the course because of date restriction settings
    access_restricted_by_date: z.boolean().nullish(),
    // The course's IANA time zone name.
    time_zone: z.string(),
    // optional: whether the course is set as a Blueprint Course (blueprint fields
    // require the Blueprint Courses feature)
    blueprint: z.boolean().nullish(),
    // optional: Set of restrictions applied to all locked course objects
    blueprint_restrictions: BlueprintRestrictionsType.nullish(),
    // optional: Sets of restrictions differentiated by object type applied to
    // locked course objects
    blueprint_restrictions_by_object_type: z.record(z.string(), BlueprintRestrictionsType).nullish(),
    // optional: whether the course is set as a template (requires the Course
    // Templates feature)
    template: z.boolean().nullish()
})
