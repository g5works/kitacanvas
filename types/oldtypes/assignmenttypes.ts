import { z } from 'zod'
import { Course } from './coursetypes'

export const FileAttachment = z.object({
    "content-type": z.string(),
    url: z.string().url(),
    filename: z.string(),
    display_name: z.string().optional(),
})

export const SubmissionType = z.enum(['basic_lti_launch', 'discussion_topic', 'online_quiz', 'on_paper', 'none', 'external_tool', 'online_text_entry', 'online_url', 'online_upload', 'media_recording', 'student_annotation', 'not_graded'] as const)

export const GradingType = z.enum(['pass_fail', 'percent', 'letter_grade', 'gpa_scale', 'points', 'not_graded'] as const)

export const LockInfo = z.object({
    // Asset string for the object causing the lock
    asset_string: z.string(),
    // (Optional) Time at which this was/will be unlocked. Must be before the due
    // date.
    unlock_at: z.string().datetime().nullish(),
    // (Optional) Time at which this was/will be locked. Must be after the due date.
    lock_at: z.string().datetime().nullish(),
    // (Optional) Context module causing the lock.
    context_module: z.any().nullish(), //////////////////// NEEDS TYPE
    manually_locked: z.boolean().optional()
  })

export const TurnItInSettings = z.object({
    originality_report_visibility: z.string(),
    s_paper_check: z.boolean(),
    internet_check: z.boolean(),
    journal_check: z.boolean(),
    exclude_biblio: z.boolean(),
    exclude_quoted: z.boolean(),
    exclude_small_matches_type: z.string(),
    exclude_small_matches_value: z.number(),
})

export const RubricRating = z.object({
    points: z.number(),
    id: z.string(),
    description: z.string(),
    long_description: z.string(),
})

export const RubricCriteria = z.object({
    points: z.number(),
    // The id of rubric criteria.
    id: z.string(),
    // (Optional) The id of the learning outcome this criteria uses, if any.
    learning_outcome_id: z.number().optional(),
    // (Optional) The 3rd party vendor's GUID for the outcome this criteria
    // references, if any.
    vendor_guid: z.string().optional(),
    description: z.string().nullish().transform((s) => s ?? ''),
    long_description: z.string().nullish().transform((s) => s ?? ''),
    criterion_use_range: z.boolean(),
    ratings: z.array(RubricRating),
    ignore_for_scoring: z.boolean().nullish().transform((s) => s ?? false)
})



export const ExternalToolTag = z.object({
    // URL to the external tool
    url: z.string(),
    // Whether or not there is a new tab for the external tool
    new_tab: z.boolean(),
    // the identifier for this tool_tag
    resource_link_id: z.string(),
})

export const NeedsGradingCount = z.object({
    // The section ID
    section_id: z.number(),
    // Number of submissions that need grading
    needs_grading_count: z.number(),
})

export const ScoreStatistic = z.object({
    // Min score
    min: z.number(),
    // Max score
    max: z.number(),
    // Mean score
    mean: z.number(),
    // Upper quartile score
    upper_q: z.number(),
    // Median score
    median: z.number(),
    // Lower quartile score
    lower_q: z.number(),
})

export const RubricSettings = z.object({
    id: z.number(),
    title: z.string(),
    points_possible: z.number(),
    free_form_criterion_comments: z.boolean().nullish().transform((s) => s ?? false),
    hide_score_total: z.boolean(),
    hide_points: z.boolean(),
})

export const AssignmentOverride = z.object({
    // the ID of the assignment override
    id: z.number(),
    // the ID of the assignment the override applies to (present if the override
    // applies to an assignment)
    assignment_id: z.number().optional(),
    // the ID of the quiz the override applies to (present if the override applies
    // to a quiz)
    quiz_id: z.number().optional(),
    // the ID of the module the override applies to (present if the override applies
    // to a module)
    context_module_id: z.number().optional(),
    // the ID of the discussion the override applies to (present if the override
    // applies to an ungraded discussion)
    discussion_topic_id: z.number().optional(),
    // the ID of the page the override applies to (present if the override applies
    // to a page)
    wiki_page_id: z.number().optional(),
    // the ID of the file the override applies to (present if the override applies
    // to a file)
    attachment_id: z.number().optional(),
    // the IDs of the override's target students (present if the override targets an
    // ad-hoc set of students)
    student_ids: z.array(z.number()).optional(),
    // the ID of the override's target group (present if the override targets a
    // group and the assignment is a group assignment)
    group_id: z.number().optional(),
    // the ID of the overrides's target section (present if the override targets a
    // section)
    course_section_id: z.number().optional(),
    // the title of the override
    title: z.string(),
    // the overridden due at (present if due_at is overridden)
    due_at: z.string().datetime().optional(),
    // the overridden all day flag (present if due_at is overridden)
    all_day: z.boolean().optional(),
    // the overridden all day date (present if due_at is overridden)
    all_day_date: z.string().datetime().optional(),
    // the overridden unlock at (present if unlock_at is overridden)
    unlock_at: z.string().datetime().optional(),
    // the overridden lock at, if any (present if lock_at is overridden)
    lock_at: z.string().datetime().optional(),
})

export const GroupDiscussion = z.object({
    id: z.number(),
    group_id: z.number(),
})

export const DiscussionTopic = z.object({
    // discussion id
    id: z.number(),
    // title of the discussion
    title: z.string(),
    // the html for the message at the top of the discussion topic
    message: z.string(),
    //url of the discussion post 
    html_url: z.string().url(),
    // The datetime the topic was posted. If it is null it hasn't been posted yet.
    // (see delayed_post_at)
    posted_at: z.string().datetime().nullish(),
    // The datetime for when the last reply was in the topic.
    last_reply_at: z.string().datetime().nullish(),
    // If true then a user may not respond to other replies until that user has made
    // an initial reply. Defaults to false.
    require_initial_post: z.boolean().nullish().transform((s) => s ?? false),
    // Whether or not posts in this topic are visible to the user.
    user_can_see_posts: z.boolean(),
    // The count of entries in the topic.
    discussion_subentry_count: z.number(),
    // The read_state of the topic for the current user, 'read' or 'unread'.
    read_state: z.enum(['read', 'unread'] as const),
    // The count of unread entries of this topic for the current user.
    unread_count: z.number(),
    // Whether or not the current user is subscribed to this topic.
    subscribed: z.boolean(),
    // (Optional) Why the user cannot subscribe to this topic.
    subscription_hold: z.enum(['not_in_group_set', 'initial_post_required', 'not_in_group', 'topic_is_announcement'] as const).nullish(),
    // The unique identifier of the assignment if the topic is for grading,
    // otherwise null.
    assignment_id: z.number().nullish(),
    // The datetime to publish the topic (if not right away).
    delayed_post_at: z.string().datetime().nullish(),
    // Whether this discussion topic is published (true) or draft state (false)
    published: z.boolean(),
    // The datetime to lock the topic (if ever).
    lock_at: z.string().datetime().nullish(),
    // Whether or not the discussion is 'closed for comments'.
    locked: z.boolean(),
    // Whether or not the discussion has been 'pinned' by an instructor
    pinned: z.boolean(),
    // Whether or not this is locked for the user.
    locked_for_user: z.boolean(),
    // (Optional) Information for the user about the lock. Present when
    // locked_for_user is true.
    lock_info: LockInfo.nullish(),
    // (Optional) An explanation of why this is locked for the user. Present when
    // locked_for_user is true.
    lock_explanation: z.string().nullish(),
    // The username of the topic creator.
    user_name: z.string().nullish(),
    // An array of group discussions the user is a part of. Fields include: id,
    // group_id
    group_topic_children: z.array(GroupDiscussion),
    // If the topic is for grading and a group assignment this will point to the
    // original topic in the course.
    root_topic_id: z.any().nullish(),
    // If the topic is a podcast topic this is the feed url for the current user.
    podcast_url: z.string().url().nullish(),
    // The type of discussion. Values are 'side_comment', for discussions that only
    // allow one level of nested comments, and 'threaded' for fully threaded
    // discussions.
    discussion_type: z.enum(['side_comment', 'threaded'] as const),
    // The unique identifier of the group category if the topic is a group
    // discussion, otherwise null.
    group_category_id: z.number().nullish().nullish(),
    // Array of file attachments.
    attachments: z.array(FileAttachment).nullish(),
    // The current user's permissions on this topic.
    permissions: z.record(z.enum(['attach', 'update', 'reply', 'delete', 'manage_assign_to'] as const), z.boolean()),
    // Whether or not users can rate entries in this topic.
    allow_rating: z.boolean(),
    // Whether or not grade permissions are required to rate entries.
    only_graders_can_rate: z.boolean(),
    // Whether or not entries should be sorted by rating.
    sort_by_rating: z.boolean(),
})

export const Announcement = z.object({
    id: z.number(),
    title: z.string(),
    message: z.string(),
    posted_at: z.string().datetime(),
    delayed_post_at: z.string().datetime().nullish(),
    context_code: z.string()
})

export const Assignment = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    due_at: z.string().datetime().nullish(),
    lock_at: z.string().datetime().nullish(),
    unlock_at: z.string().datetime().nullish(),
    has_overrides: z.boolean().nullish(),
    all_dates: z.string().datetime().nullish(),
    course_id: z.number(),
    html_url: z.string().url(),
    submissions_download_url: z.string().url().nullish(),
    assignment_group_id: z.number(),
    due_date_required: z.boolean(),
    allowed_extensions: z.string().array().nullish(),
    max_name_length: z.number(),
    turnitin_enabled: z.boolean().nullish(),
    vericite_enabled: z.boolean().nullish(),
    turnitin_settings: TurnItInSettings.nullish(),
    grade_group_students_individually: z.boolean(),
    external_tool_tag_attributes: ExternalToolTag.nullish(),
    peer_reviews: z.boolean(),
    automatic_peer_reviews: z.boolean(),
    peer_review_count: z.number().nullish(),
    peer_reviews_assign_at: z.string().datetime().nullish(),
    intra_group_peer_reviews: z.boolean(),
    group_category_id: z.number().nullish(),
    needs_grading_count: z.number().nullish(),
    needs_grading_count_by_section: NeedsGradingCount.array().nullish(),
    position: z.number(),
    post_to_sis: z.boolean().nullish(),
    integration_id: z.string().nullish(),
    integration_data: z.record(z.string()).nullish(),
    points_possible: z.number().nullish().transform((s) => s ?? 0),
    submission_types: SubmissionType.array(),
    has_submitted_submissions: z.boolean(),
    grading_type: GradingType,
    grading_standard_id: z.number().nullish(),
    published: z.boolean(),
    unpublishable: z.boolean().nullish(),
    only_visible_to_overrides: z.boolean(),
    locked_for_user: z.boolean(),
    lock_info: LockInfo.nullish(),
    lock_explanation: z.string().nullish(),
    quiz_id: z.number().nullish(),
    anonymous_submissions: z.boolean().nullish(),
    discussion_topic: DiscussionTopic.nullish(),
    freeze_on_copy: z.boolean().nullish(),
    frozen: z.boolean().nullish(),
    frozen_attributes: z.string().array().nullish(),
    submission: z.any(),
    use_rubric_for_grading: z.boolean().nullish(),
    rubric_settings: RubricSettings.nullish(),
    rubric: RubricCriteria.array().nullish(),
    assignment_visibility: z.number().array().nullish(),
    overrides: AssignmentOverride.array().nullish(),
    omit_from_final_grade: z.boolean().nullish(),
    hide_in_gradebook: z.boolean().nullish(),
    moderated_grading: z.boolean(),
    grader_count: z.number(),
    final_grader_id: z.number().nullish(),
    grader_comments_visible_to_graders: z.boolean(),
    graders_anonymous_to_graders: z.boolean(),
    grader_names_visible_to_final_grader: z.boolean(),
    anonymous_grading: z.boolean(),
    allowed_attempts: z.number(),
    post_manually: z.boolean(),
    score_statistics: ScoreStatistic.nullish(),
    can_submit: z.boolean().nullish(),
    ab_guid: z.string().array().nullish(),
    require_lockdown_browser: z.boolean().nullish(),
    important_dates: z.boolean().nullish(),
    anonymous_peer_reviews: z.boolean(),
    anonymous_instructor_annotations: z.boolean(),
    graded_submissions_exist: z.boolean(),
    is_quiz_assignment: z.boolean(),
    in_closed_grading_period: z.boolean(),
    can_duplicate: z.boolean(),
    original_course_id: z.number().nullish(),
    original_assignment_id: z.number().nullish(),
    original_lti_resource_link_id: z.number().nullish(),
    original_assignment_name: z.string().nullish(),
    original_quiz_id: z.number().nullish(),
    workflow_state: z.string().nullish(),
})

export const Submission = z.object({
    // The submission's assignment id
    assignment_id: z.number(),
    // The submission's assignment (see the assignments API) (optional)
    assignment: Assignment.nullish(),
    // The submission's course (see the course API) (optional)
    course: Course.nullish(),
    // This is the submission attempt number.
    attempt: z.number().nullish().transform((s) => s ?? 0),
    // The content of the submission, if it was submitted directly in a text field.
    body: z.string().nullish(),
    // The grade for the submission, translated into the assignment grading scheme
    // (so a letter grade, for example).
    grade: z.string().nullish(),
    // A boolean flag which is false if the student has re-submitted since the
    // submission was last graded.
    grade_matches_current_submission: z.boolean(),
    // URL to the submission. This will require the user to log in.
    html_url: z.string().url().nullish(),
    // URL to the submission preview. This will require the user to log in.
    preview_url: z.string().url(),
    // The raw score
    score: z.number().nullish().transform((s) => s ?? 0),
    // Associated comments for a submission (optional)
    submission_comments: z.string().array().nullish(),
    // The types of submission ex:
    // ('online_text_entry'|'online_url'|'online_upload'|'online_quiz'|'media_record
    // ing'|'student_annotation')
    submission_type: SubmissionType.nullish().transform((s) => s ?? 'none'),
    // The timestamp when the assignment was submitted
    submitted_at: z.string().datetime().nullish(),
    // The URL of the submission (for 'online_url' submissions).
    url: z.string().url().nullish(),
    // The id of the user who created the submission
    user_id: z.number(),
    // The id of the user who graded the submission. This will be null for
    // submissions that haven't been graded yet. It will be a positive number if a
    // real user has graded the submission and a negative number if the submission
    // was graded by a process (e.g. Quiz autograder and autograding LTI tools). 
    // Specifically autograded quizzes set grader_id to the negative of the quiz id.
    // Submissions autograded by LTI tools set grader_id to the negative of the tool
    // id.
    grader_id: z.number().nullable(),
    graded_at: z.string().datetime().nullable(),
    // The submissions user (see user API) (optional)
    user: z.any().nullish(),
    // Whether the submission was made after the applicable due date
    late: z.boolean(),
    // Whether the assignment is visible to the user who submitted the assignment.
    // Submissions where `assignment_visible` is false no longer count towards the
    // student's grade and the assignment can no longer be accessed by the student.
    // `assignment_visible` becomes false for submissions that do not have a grade
    // and whose assignment is no longer assigned to the student's section.
    assignment_visible: z.boolean().nullish().transform((s) => s ?? true),
    // Whether the assignment is excused.  Excused assignments have no impact on a
    // user's grade.
    excused: z.boolean().nullish().transform((s) => s ?? false),
    // Whether the assignment is missing.
    missing: z.boolean(),
    // The status of the submission in relation to the late policy. Can be late,
    // missing, extended, none, or null.
    late_policy_status: z.enum(['late', 'missing', 'extended', 'none'] as const).nullable(),
    // The amount of points automatically deducted from the score by the
    // missing/late policy for a late or missing assignment.
    points_deducted: z.number().nullable(),
    // The amount of time, in seconds, that an submission is late by.
    seconds_late: z.number(),
    // The current state of the submission
    workflow_state: z.enum(['submitted', 'unsubmitted', 'graded', 'pending_review'] as const),
    // Extra submission attempts allowed for the given user and assignment.
    extra_attempts: z.number().nullish().transform((s) => s ?? 0),
    // A unique short ID identifying this submission without reference to the owning
    // user. Only included if the caller has administrator access for the current
    // account.
    anonymous_id: z.number().nullish(),
    // The date this submission was posted to the student, or nil if it has not been
    // posted.
    posted_at: z.string().datetime().nullable(),
    // The read status of this submission for the given user (optional). Including
    // read_status will mark submission(s) as read.
    read_status: z.string().nullish(),
    // This indicates whether the submission has been reassigned by the instructor.
    redo_request: z.boolean(),
    // A list of attachment objects
    attachments: FileAttachment.array().nullish()
})