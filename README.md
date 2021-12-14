# nimble-message-app

nimble-message-app is a chat application built by Tejas Rai for nimble.ai's hackathon.

### Tools & Technologies Used:
- Cross Platform native app: Electron with electron-forge
- Frontend: Typescript + React
- UI Framework: MaterialUI
- Backend Language: Python
- Web Framework: Flask
- ORM: peewee
- DB: postgresql
- Deployment: Docker + docker-compose
- API scheme: REST
- Backend Dependency Manager: Pipenv

### Installation
#### Frontend
1. open a terminal in the `frontend` folder
2. run `npm run make`
3. executable will be created in the `frontend/out/nimble-message-app-{arch}` folder

#### Backend
1. open a terminal in the `backend` folder
2. change env variables in `backend/.env` if necessary
3. run `docker-compose up`

## Usage
1. open multiple instances of the frontend's executable
2. register users
3. login with a different user in each window
4. send messages

## License
[MIT](https://choosealicense.com/licenses/mit/)