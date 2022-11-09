// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if(entry.isIntersecting)
//         {
//             document.querySelector("#enviro").classList.add("fadeBot")
//             document.querySelector("#social").classList.add("fadeBot")
//             document.querySelector("#govern").classList.add("fadeBot")
//             document.querySelector("#aniEvan").classList.add("fadeBot")
//             document.querySelector("#aniYoung").classList.add("fadeBot")
//         }
//     })
// })
// observer.observe(document.querySelector("#enviro"))
// observer.observe(document.querySelector("#social"))
// observer.observe(document.querySelector("#govern"))
// observer.observe(document.querySelector("#aniEvan"))
// observer.observe(document.querySelector("#aniYoung"))

var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".tag");
  
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if ($(tag).position().top < pageBottom) {
        $(tag).addClass("fadeBot");
        $(tag).removeClass("invis");
      }
    }
$(document).on("scroll", function() {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".tag");
  
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      if ($(tag).position().top < pageBottom) {
        $(tag).addClass("fadeBot");
        $(tag).removeClass("invis");
      }
    }
  });