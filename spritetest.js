$('.dude').animateSprite({
        fps: 12,
        loop: true,
        animations: {
            walk: [0, 1, 2, 3, 4, 5],
            run: [11, 10, 9, 8, 7, 6]
        },
        complete: function(){
            alert('Sprite animation complete!');
        }
    });

$(".dude").animateSprite('play', 'walkLeft');   
$(".dude").animateSprite('play', 'walkRight');