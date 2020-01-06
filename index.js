const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const puppeteer = require('puppeteer');
const generateHTML = require ('./generateHTML');

const writeFileAsync = util.promisify(fs.writeFile);

let img = '';
let location = '';
let gitProfile = '';
let userBlog = '';
let userBio = '';
let repo = '';
let followers = 0;
let following = 0;
let starNum = 0;
let color = '';




function init() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Input your GitHub User Name: ',
            name: 'username'
        },
        {
            type: 'input',
            message: 'What color do you want to use as your background?',
            name: 'color'

        }
    ])

    .then(function({ username, color }){
        const config = { headers: { accept: 'application/json' }};
        let queryURL = 'https://api.github.con/users/${username}';
        return axios.get(queryURL, config).then(userData => {
            let newUrl = 'https://api.github.con/users/${username}/starred';

            axios.get(newUrl, config).then(starredRepos => {
                data = {
                    img: userData.data.avatar_url,
                    location: userData.data.location,
                    gitProfile: userData.data.html_url,
                    userBlog: userData.data.blog,
                    userBio: userData.data.bio,
                    repo: userData.data.public_repos,
                    followers: userData.data.followers,
                    following: userData.data.following,
                    starNum: starredRepos.data.length,
                    username: username,
                    color: color
                };
                generateHTML(data);
                writeHTML(generateHTML(data));
                makePdf(username);
            });
        });
    });
}
const questions = [
  
];

function writeToFile(fileName, data) {
 
}
init();