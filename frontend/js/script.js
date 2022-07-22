/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
}

function switcher(){
    if (document.querySelector("ul").classList.contains("hiddenmobile"))
        document.querySelector("ul").classList.remove("hiddenmobile")
    else
        document.querySelector("ul").classList.add("hiddenmobile")
}

function sendMessage(){ // https://ocfnnj5izfgmkjk7jnlzzum5aa0bkeuh.lambda-url.us-east-1.on.aws
    var xhttp = new XMLHttpRequest()
    xhttp.open("POST", "https://ocfnnj5izfgmkjk7jnlzzum5aa0bkeuh.lambda-url.us-east-1.on.aws", true);
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            document.querySelector("#response").innerHTML='<span class="green">Message sent</span>'
        }
        else if (this.readyState == 4){
            document.querySelector("#response").innerHTML='<span class="red">Message not sent</span>'
        }
    }
    var data = {name:document.querySelector("#name").value,email:document.querySelector("#email").value,phone:document.querySelector("#phone").value,message:document.querySelector("#message").value}
    xhttp.send(JSON.stringify(data))
    return false
}

function formClear(){
    document.querySelector("#transFrame").reset()
}

var extender = 0
var lock = false
function mover(a){
    if (!lock){
        lock=true
        extender=a
        document.body.style.setProperty("--extender", extender)
        setTimeout(()=>{
            document.body.style.setProperty("--transitor", "0s")
            if (extender==-1)
                document.querySelector("#superWide").appendChild(document.querySelectorAll(".testimonial")[0])
            else if (extender==1)
                document.querySelector("#superWide").insertBefore(document.querySelectorAll(".testimonial")[document.querySelectorAll(".testimonial").length-1],document.querySelectorAll(".testimonial")[0])
            extender=0
            document.body.style.setProperty("--extender", extender)
            setTimeout(()=>{
                document.body.style.setProperty("--transitor", "margin-left .5s")
                lock=false
            },100)
        },500)
    }
}

function scroller(){
    const navbarCollapsible = document.querySelector('nav')
    if (window.scrollY === 0 && document.querySelectorAll(".mobile").length === 0) {
        navbarCollapsible.classList.remove('navbar-shrink')
    } else {
        navbarCollapsible.classList.add('navbar-shrink')
    }
    document.querySelector("ul").classList.add("hiddenmobile")
    var top = document.querySelector("#header").getBoundingClientRect().top
	var size = document.querySelector("#header").getBoundingClientRect().bottom - top
	var heig = window.innerHeight
	var percentage = Math.floor(heig-top)/(size+heig)
	document.querySelector('#img1').style.setProperty('top', (percentage*100)+'%') /* 25 to 75*/
    var viewCenter = window.scrollY+window.innerHeight/2
    var elements = ["#services","#about","#testimonials","#contact"]
    var thisOne = null
    for (var i=0;i<=3;i++){
        if (document.querySelector(elements[i]).offsetTop < viewCenter && viewCenter < document.querySelector(elements[i]).offsetHeight+document.querySelector(elements[i]).offsetTop){
            var thisOne = document.querySelectorAll(".nav-link")[i]
        }
    }
    if (thisOne === null){
        try{
            document.querySelector(".selected").classList.remove("selected")
        }catch{}
    }
    else if (!thisOne.classList.contains("selected")){
        try{
            document.querySelector(".selected").classList.remove("selected")
        }catch{}
        thisOne.classList.add("selected")
    }
}
function resizer(){
    (isMobile.any()||innerWidth<775)?document.querySelector("body").classList.add("mobile"):document.querySelector("body").classList.remove("mobile")
    scroller()
}

window.onload = function(){
    (isMobile.any()||window.innerWidth<650)?document.querySelector("body").classList.add("mobile"):0
    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', scroller)
    addEventListener('resize', resizer)
    resizer()
    document.body.style.setProperty("--tentitionalsEven", Math.abs(document.querySelectorAll(".testimonial").length%2-1))
}

// Collapse responsive navbar when toggler is visible
const navbarToggler = document.body.querySelector('.navbar-toggler')
const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
)
responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click()
        }
    })
})
