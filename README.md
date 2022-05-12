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

# Project Status

## Version 1.000 (current)

Most features from the MVP have been refined and we have also implemented almost all of the features we wanted to implement. Down below we will list key features that have been implemented.

- Navigation bar which can be found in navBarView.js. This is rendered at the bottom to allow the user to keep track of their position.
- Details about a book which can be found in bookDetailsView.js. By clicking a book in the list of books, or clicking a cover when swiping, the user can view more details.
- Authentication. A user can now log in and register themselves which persists in the Firebase. Information stored is what books have already been seen, swiped and liked.
- Error messages. If a user tries to login with wrong credentials they will be advised so has happened.
- Swiping. The user can now drag-and-drop books in conjunction with pressing like/dislike.
- Design overhaul. We changed the colors from earlier blue and orange to a deep dark green color and desgined a new logo.
- Interactive popups. In all views we have implemented so that user gets immeadiate feedback on different actions. Swiped right? We will now tell you that you did in fact do that.

## Version 0.500 (NOT CURRENT, mid project)

- The user can sign in with username and password credentials (which takes the user to his list of liked books).
- The user can choose to sign up, if the user has no account (which takes the user to the User Creation view).
- The user can enter their username, e-mail and password (not connected to firebase, yet).
- After a first sign-up, the user is taken to the User Creation Genre View.
- The user is presented with different book genres (or subjects) that he is interested in.
- This view takes the user to the user (profile) info(rmation) view.
- Information about the user (picture, liked books) is presented to the user.
- The user gets presented with books and gets the options to “like it” or “dislike it”.
- The liked books get added to the liked books list (that can be seen in user info view).
- We are using the following API to get our data: https://openlibrary.org/dev/docs/api/books
- The data currently includes: book title, book cover. 


### Planned changelog for 0.500 ---> 1.000

- Enable user sign up through firebase.
- Enable user authentication through firebase.
- Enable user to login even when password was forgotten.
- The user is able to sign up (with e-mail and password, through firebase).
- The user can add a profile picture.
- The user can pick out of the genres presented to him in order to get suitable book suggestions in binder.
- The user can delete books from the liked books list.
- (Possibly: The user can look at specific book details, i.e. a kind of details view will be needed).
- The interaction is fun for the user (actual swiping will be enabled for smartphone users and something similarly fun for PC users.)
- The data might in the future include: book description, author(s), book genre / subject.
- If there is time, a second, machine-learning-based translation API could be included to enable non-English users to use the app.

## Project file structure

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
│   │   ├── bookDetailsView.js         # (see description of the views above - "What we have done")
│   │   ├── loginView.js               # (see description of the views above - "What we have done")
│   │   ├── navBarView.js              # (see description of the views above - "What we have done")
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
