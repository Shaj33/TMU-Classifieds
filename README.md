# TMU-Classifieds
Course Project for CPS630

Hosted Link: https://cps-630-cps630.koyeb.app/

## Build Notes
- Uses Node v20.11.0


## Install Instructions

- Create a venv in the source folder using `python -m venv venv/.`
- Activate the venv by running `source venv/bin/activate` OR `./venv/Scripts/activate.bat` (Windows)
- Install python requirements using `pip install -r requirements.txt`

- Install Mongo (Fill in Details Later)

- Run `npm install` in main directory.

## Run Project Locally

### Use 3 Terminals

- Run Mongo (Fill in Details Later)
- Activate the venv by running `source venv/bin/activate` OR  `./venv/Scripts/activate.bat` (Windows)
- Run Server using `python /server/manage.py runserver` (you may have to run `python .\server\manage.py migrate` if it tells you to)
- Run `npm start`

## Deploying to a web host


1. Add the web host's public URL to the allowed hosts array in the `./server/settings.py` file.

2. In the `/server/app/views.py` file, locate the line where the MongoDB client is initialized (`client = pymongo.MongoClient("mongodb://localhost:27017/mainDB)`). Replace `"mongodb://localhost:27017/mainDB"` with this: `f"mongodb+srv://username:{db_password}@url"`. Remember to store the password of the database (`DB_PASSWORD`) in an `.env` file at the root of the project directory or add it to your environment variables.

3. Update all API URLs in the frontend to start with the web host's public URL. For example, change `127.0.0.1:8000/app/get_most_recent_all/?userId=${userId}` to `(web host's URL)/app/get_most_recent_all/?userId=${userId}`.

4. Navigate to the project root and run `npm install && npm run build`.

5. Commit all these changes to a new branch named `"DeploymentBranch"`.

6. On the web host, link your GitHub account and deploy from the `"DeploymentBranch"`.

7. Before deploying on the web host, navigate to the root directory and install all Python modules using `pip install -r requirements.txt` Ensure that you're using Python version 3.11 or later.

8. To deploy on the web host, run the command `python ./server/manage.py runserver 0.0.0.0:(port)`, where `(port)` refers to the open web port on the host.

9. Navigate to the public URL to see the working website.
