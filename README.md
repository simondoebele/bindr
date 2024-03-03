<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Bindr</h3>

  <p align="center">
    A book recommender Web App.
    <br />
    <a href="https://github.com/simondoebele/bindr"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/simondoebele/bindr/issues">Report Bug</a>
    ·
    <a href="https://github.com/simondoebele/bindr/issues">Request Feature</a>
  </p>
</div>

![alt text](img/bindr-logo.svg)


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#structure">Repository Structure</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Bindr is Tinder for books. You get suggestions of books based on what genres you like. You swipe left or right in order to add the suggested books to your list in order to save it for future use!

This was a self-directed group project at the Royal Institute of Technology (KTH), Sweden. The overarching purpose of the project was to to create a highly-useable data-persistent interactive web application using the Model-View-Presenter architecture, reading data from web APIs and delivering a good user experience.

There was a deployed version in the past - it is not maintained anymore.

### Authors:
- Elvira Dzidic 
- Simon Döbele
- Emil Lantz
- Mattias Arvidsson

### Current and past features 

We started with a mockup:

![mockup](img/screens.png)

https://miro.com/app/board/uXjVOIKRW6w=/

Current features are described in the repository structure below and the change log of an earlier version of this readme.

### API
- We are using the following API to get our data: https://openlibrary.org/dev/docs/api/books



<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

<!-- USAGE EXAMPLES -->
### Usage

1. Clone the project.
2. Make sure you have Node.js installed. https://nodejs.org/en/
3. Cd into project folder.
4. Run ```npm install```to initiate.
5. Install dependencies. It needs sweetalert, ```npm install sweetalert```
6. Run ```npm run dev```to serve the app locally.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Repository Structure -->
### Repository structure


```
.
├── public
│   └──  style.css          # our CSS style sheet file
├── src                     
│   ├── apiConfig.js           # API configuration file (currently not used)       
│   ├── binderModel.js         # The Model of the MVP architecture
│   ├── bookSource.js          # Functions for API calls
│   ├── firebaseConfig.js      # Firebase configuration file
│   ├── firebaseErrorMsgs.js   # Firebase errors file
│   ├── firebaseModel.js       # Observer functionality (updates from firebase to model & vice versa)
│   ├── index.html             # (Notifies, if you have Javascript disabled.)
│   ├── resolvePromise.js      # Resolves promises
│   ├── utilities.js           # will contain utility functions for the model (currently not used)
|   |   
│   ├── views                  # THE VIEWS of the MVP architecture
│   │   ├── aboutUsView.js             # Is a view about the team and project.
│   │   ├── app.js                     # Displays the different components
│   │   ├── bookDetailsView.js         # renders details about a book.
│   │   ├── loginView.js               # Enable user sign up, sign in (with username and password including forgotten password) and authentication through firebase. The user has "forgot password" functionality.
│   │   ├── navBarView.js              # contains the navigation bar
│   │   ├── navigation.js              # helps navigate at startup (to login view)
│   │   ├── promiseNoData.js           # For user experience (when waiting for promise to be resolved)
│   │   ├── swipeView.js               # The user gets swiping functionality to decide whether to “like” or “dislike" a book. Liked books get added to the liked books list.
│   │   ├── userCreationGenreView.js   # The user can pick out of different book genres in order to get suitable book recommendations in binder.
│   │   ├── userCreationView.js        # Enable user to sign up (with username, e-mail and password, through firebase).
│   │   ├── userInfoView.js            # Information about the user (picture, liked books) is presented to the user. The user can delete books from the liked books list.
│   │   ├── waitUndef.js               # 
│   |
|   └── vuejs                  # THE PRESENTERS of the MVP architecture
│       ├── aboutUsPresenter.js             # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── bookDetailsPresenter.js         # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── index.js                        # Renders the root & Resolves the initial persistence promise
│       ├── loginPresenter.js               # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── navBarPresenter.js              # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── show.js                         # utility for deciding the change to a different view
│       ├── swipePresenter.js               # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── userCreationGenrePresenter.js   # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── userCreationPresenter.js        # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── userInfoPresenter.js            # (Presenter corresponding to the View with same name (MVP architecture))
│       ├── VueRoot.js                      # The Vue Root that ties the bindermodel and app together.
├── user evaluation             # USER EVALUATION midway through and towards the end of the project
│   ├── apiConfig.js           # API configuration file (currently not used)    
└── ...
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- ACKNOWLEDGMENTS 
## Acknowledgments

* []() https://github.com/othneildrew/Best-README-Template/
* []()
* []()


<p align="right">(<a href="#readme-top">back to top</a>)</p>
-->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
