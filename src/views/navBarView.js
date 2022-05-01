function NavBarView(props) {
  return (
    <div class="topnav">
      <button class="navbutton"
          onClick={function () {
            window.location.hash = "#userinfo";
          }}
        >User Profile</button>

      <button class="navbutton"
          onClick={function () {
            window.location.hash = "#swipe";
          }}
        >Swipe</button>
    </div>
  )
}

export default NavBarView;
