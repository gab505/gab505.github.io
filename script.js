console.clear();

const sectionBackgrounds = {
    volunteering: 'https://gab505.github.io/pictures/guatemala/IMG_7296.JPG',
    teaching: 'https://images.pexels.com/photos/7095/people-coffee-notes-tea.jpg?h=350&auto=compress&cs=tinysrgb',
    religion: 'https://gab505.github.io/pictures/church/AKUX9aFam4nUWzxIZQTwuqBDbE8HJ0owyrobH5NGWlwJ9pa4Gkm9lNB8_5fljoJXHsRKBIt-gUEZ8A6uAlOp_PdjWDQkQ6-1NGx8tvMY3X9jNE4Tl9FkO7ckdR_J-oNfeA--.jpeg',
    soccer: 'https://gab505.github.io/pictures/soccer/IMG_2676.JPG',
    travel: 'https://gab505.github.io/pictures/family/1471528092674.jpg'
}


$(() => {
   const fixedMenu = $(".topNav .menu.fixed")
   let prevY = 0;
 
   addEventListener('scroll', () => prevY = onScroll(prevY, fixedMenu) );

   // coding skills
   $("#skills .skill").each((i, elem) => {
       var fill = parseFloat($(elem).data("fill"));
       fill = (fill * 0.8 + 0.2) * 100;
       $(elem)
        .css('width', fill + '%')
        .css('animation', 'skillAnimation 3s')
   });
   
   // insert sectionBreaks
   $("section").each((i, elem) => {
       $(elem).after($("<div class='sectionBreak'></div>"));
   })
   
   
});

function onScroll(prevY, fixedMenu) {
    let y = $(window).scrollTop();
    let isDown = prevY < y;
    
    /* menu */
    if (isDown && !fixedMenu.hasClass("show") && y > 300) {
        fixedMenu.addClass("show");
    }
    else if (!isDown && fixedMenu.hasClass("show") && y < 200) {
        fixedMenu.removeClass("show");
    }

    /* background */
    $("section.bgImage").each((index, elem) => {
        let y = getScreenY(elem);
        if (y < 0) {
            $(elem).addClass("transparent");
            if (Math.abs(y) < window.innerHeight) {
                var elemId = $(elem).attr('id');
                if (sectionBackgrounds[elemId]) {
                    $(document.body).css('background-image', 'url("' + sectionBackgrounds[elemId] + '")');
                }
            }
        } else {
            $(elem).removeClass("transparent");
        }
    })
 
    return y;   
}

function getScreenY(elem) {
    elem = $(elem);
    return elem.offset().top - $(window).scrollTop();
}

function scrollToSection(elemId) {
    let target = $("section#"+elemId).get(0);
    console.log(target);

    let prevD;

    let timer = setInterval(() => {
        let distance = getScreenY(target);
        
        if (prevD && prevD == distance) {
            clearInterval(timer);
        }
        prevD = distance;

        if (Math.abs(distance) < 40) {
            window.scrollBy(0, distance);
            clearInterval(timer);
        }
        window.scrollBy(0, distance/8);
        
    }, 1000/60);
}





