## Employee Management Application

- RESTful webservice API (Express)
- JWT Authentication Flow
- Project Structure with middlewares
- Signup/Login process and accessing protected Resources (Authorization)
- Implementing winston apiLogger/trace logs on the production directory ./log/app.log
- Using Mongodb as database (mongoose)
- Get List of Employees
- See details/modify/delete employee
- Leave multiline comments on employee document
- Bulk Import employees through a CSV file



## Requirements
* mongodb `^5.0`
* node `^16.11.0`
* yarn `^1.22.15` or npm `^8.0.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can clone the project by doing the following:

### Install from source

First, clone the project:

```bash
$ git clone https://github.com/KhaliliSadegh/EMA-Backend
$ cd EMA-Backend
```

### Pre setup
You can edit the setup configs at `.env`
In the config file you have to set ***ADMIN_USERNAME,ADMIN_PASSWORD,...*** . This is the default administrator user which will be added on the first run.

### Install project dependencies and launch
Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn start      # Compile and launch (same as `npm start`)
```


### Bulk CSV Import Tips
- CSV content should contain the below items. 
 Vorname	Nachname	Strasse	Nr	PLZ	 Ort	Land	Rolle
- The CSV Sample file is [here](CodingChallenge-Mitarbeiterliste.csv)
- The default username of each user is the combination of the **firstname.lastname** ***i.e: Peter.Meister***
- The default password of imported users is **DEFAULTPASSWORD**
