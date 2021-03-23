# Oyesters Training

Simple RestAPi

## Installation


```bash
npm i 
```

### Routes
#### Authentication
1. route: POST https://oyesterstrainings.herokuapp.com/api/auth/register
    - For registering new user
    - add fields: username, email, password

2. route: POST https://oyesterstrainings.herokuapp.com/api/auth/login
    - For login 
    - add fields: email, password

#### Tasks operation
1. route: GET https://oyesterstrainings.herokuapp.com/api/task/
    - Get all tasks

2. route: GET https://oyesterstrainings.herokuapp.com/api/task/:user_id
    - Get task by user id (specific user tasks)

3. route: POST https://oyesterstrainings.herokuapp.com/api/task/    (Private)
    - Create new task
    - Only logged in user can create tasks
    - add fields: taskname, start, end, description

4. route: PUT https://oyesterstrainings.herokuapp.com/api/task/:task_id (Private)
    - update specific task
    - user only update own task

5. route: DELETE https://oyesterstrainings.herokuapp.com/api/task/:task_id (Private)
    - delete specific task
    - only authorized user can delete task
