# Translate REST API 😊

This REST API uses allows users to translate text into five languages : 

- English
- Hindi
- Tamil
- Telegu
- Kannada 

***

## Prerequisites

The following actions are needed in order to test out the API

- Install XAMPP
- Have a MySQL  up and running on your device

- Install POSTMAN

***

## Setup 

clone the Repo : 
```
    git clone git@github.com:vijaykrishnadas/translate-restapi.git
```
***

## Usage

- Open the project folder on your computer ( use VS code or any such IDE ) and run the following commands : 

```
    npm install
    nodemon app 
```
## NOTE -
 Have XAMPP running in the background before starting the server.

***

### Open POSTMAN and do the follwoing : 

- Send a POST req to " http://localhost:5000/data "
- Go to the 'body' sub category and :

```
 Key  :  user      (The value for this key should be the text that you want to translate)
 Key : lang     (The value for this key should be the language in which you want the text to be translated to.)
```
***

# Example :

user : "Hello"

lang : "hindi" 

output : "नमस्ते"

#### Visit : http://localhost:5000/data to get your data.

***

# I hope you found this API useful. 



## This is just a test project. No copyright Intended. 😊