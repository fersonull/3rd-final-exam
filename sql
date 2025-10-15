// retrieving total task on specific project and status.
SELECT COUNT(*) as total_task FROM `tasks`
WHERE project_id = '9f3a9c1d8e5b41f6a9d01c3e12b4f8d5'
AND status = 'in_progress'
