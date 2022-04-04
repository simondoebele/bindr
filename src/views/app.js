/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX = window.location.toString().includes("react")
  ? "reactjs"
  : "vuejs";

const Summary = require("../" + PREFIX + "/summaryPresenter.js").default;

const Sidebar = require("../" + PREFIX + "/sidebarPresenter.js").default;

const Search = require("../" + PREFIX + "/searchPresenter.js").default;

const Details = require("../" + PREFIX + "/detailsPresenter.js").default;

const Login = require("../" + PREFIX + "/loginPresenter.js").default;

const UserInfo = require("../" + PREFIX + "/userInfoPresenter.js").default;

const Create = require("../" + PREFIX + "/userCreationPresenter.js").default;

const PickGenre = require("../" + PREFIX + "/userCreationGenrePresenter.js").default;

const Swipe = require("../" + PREFIX + "/swipePresenter.js").default;

import Show from "./../vuejs/show.js";

export default function App(props) {
  return (
    <div class="flexParent">
      <div class="mainContent">
        <Show hash="#search">
          {" "}
          <Search model={props.model} />{" "}
        </Show>
        <Show hash="#details">
          {" "}
          <Details model={props.model} />{" "}
        </Show>
        <Show hash="#summary">
          {" "}
          <Summary model={props.model} />{" "}
        </Show>
        <Show hash="#login">
          <Login />{" "}
        </Show>
        <Show hash="#userinfo">
          <UserInfo />{" "}
        </Show>

        <Show hash="#create">
          <Create />{" "}
        </Show>

        <Show hash="#pick">
          <PickGenre />{" "}
        </Show>

        <Show hash="#swipe">
          <Swipe model={props.model}/>{" "}
        </Show>
      </div>
    </div>
  );
}
