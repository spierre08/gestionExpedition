let slideBar = document.querySelector(".sliderBar")
let menuIcon = document.querySelector(".menu")
let menuIcon1 = document.querySelector(".menu1")
let main = document.querySelector(".main")

menuIcon.addEventListener("click", function(){
      slideBar.classList.toggle("slideActive")
      main.classList.toggle("mainResponsive")
})

menuIcon1.addEventListener("click", function(){
      slideBar.classList.toggle("slideResponsive")
})

slideBar.addEventListener("click", function(){
      slideBar.classList.remove("slideResponsive")
})
