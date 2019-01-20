import "babel-polyfill"
import "coffeekraken-sugar/js/features/all"
import SGlitchComponent from "../../../dist/index"

setTimeout(() => {
  const $glitch = document.querySelector("s-glitch")
  $glitch.domUpdated().then(() => {
    console.log("updated")
  })
}, 4000)
