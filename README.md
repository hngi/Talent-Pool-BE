# TalentPool-API

![Talentpool CI](https://github.com/hngi/TalentPool-API/workflows/Talentpool%20CI/badge.svg)

## DATABASE SETUP

-Setup the env file

-Mail setup

```
Create a mailtrap account,
Inport the SMTP_PORT,USERNAME.PASSWORD & HOST in your environmental variables.
```

-create a database
-Create roles under roles table by running the query below.

```
INSERT INTO `roles` (`id`, `role_name`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 'admin', 'ROL-ADMIN-adio3092ru22', '2020-06-21 10:54:50', '2020-06-21 10:54:50', NULL),
(1, 'employee', 'ROL-EMPLOYEE-EM8hu7', '2020-06-21 10:52:22', '2020-06-21 10:52:22', NULL),
(2, 'employer', 'ROL-EMPLOYER-8hhfbhf', '2020-06-21 10:52:22', '2020-06-21 10:52:22', NULL),
(4, 'super_admin', 'ROL-SUPERADMIN-SPA389y32fh', '2020-06-21 10:54:50', '2020-06-21 10:54:50', NULL);
```

-Ensure your follow the linting, or else your pr wont be merged.
-Check Utlis for resuable functions
