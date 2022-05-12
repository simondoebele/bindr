# What is Binder?

Binder is basically Tinder for books. You get suggestions of books based on what genres you like. You swipe left or right in order to add the suggested book to your list in order to save them for future use!

## Authors

- Emil Lantz, 77314
- Mattias Arvidsson, 77973
- Elvira Dzidic, 77673 
- Simon Döbele, 121732

# How to setup?

1. Clone the project.
2. Make sure you have Node.js installed. https://nodejs.org/en/
3. Cd into project folder.
4. Run ```npm install```to initiate.
5. Run ```npm run dev```to serve the app locally.

# Is there a deployed version?

There sure is. Right here https://binder-e215b.web.app/vue/index.html#login


## Our project file structure (with short description/purpose of each file)
```
.
├── public
│   └──  style.css          # our CSS style sheet file
├── src                     
│   ├── apiConfig.js           # API configuration file (currently not used)       
│   ├── binderModel.js         # Our Model for the MVP architecture
│   ├── bookSource.js          # Functions for API calls
│   ├── firebaseConfig.js      # Firebase configuration file
│   ├── firebaseErrorMsgs.js   # Firebase errors file
│   ├── firebaseModel.js       # Observer functionality (updates from firebase to model & vice versa)
│   ├── index.html             # (Notifies, if you have Javascript disabled.)
│   ├── resolvePromise.js      # Resolves promises (just like in TW3)
│   ├── utilities.js           # will contain utility functions for the model (currently not used)
|   |   
│   ├── views                  # THE VIEWS
│   │   ├── aboutUsView.js             # (see description of the views above - "What we have done")
│   │   ├── app.js                     # Displays the different components
│   │   ├── bookDetailsView.js               # (see description of the views above - "What we have done")
│   │   ├── loginView.js               # (see description of the views above - "What we have done")
│   │   ├── navBarView.js               # (see description of the views above - "What we have done")
│   │   ├── navigation.js              # helps navigate at startup (to login view)
│   │   ├── promiseNoData.js           # For user experience (when waiting for promise to be resolved)
│   │   ├── swipeView.js               # (see description of the views above - "What we have done")
│   │   ├── userCreationGenreView.js   # (see description of the views above - "What we have done")
│   │   ├── userCreationView.js        # (see description of the views above - "What we have done")
│   │   ├── userInfoView.js            # (see description of the views above - "What we have done")
│   │   ├── waitUndef.js               # (see description of the views above - "What we have done")
│   |
|   └── vuejs                  # THE PRESENTERS
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
└── ...
```
