$(function () {
    let timerStarted = 0;
    let bg;
    let checked = 0;
    const arr = $('#left>li');
    $('.list').sortable({});

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];


    //start game functions
    $('#start').on('click', function () {
        $('#checkResult').attr('disabled', false);
        if (timerStarted == 0) {
            startTimer();
            timerStarted = 1;
            $(this).attr('disabled', true);
        }
    });
    //end start game functions
    $('#checkResult').click(function () {
        $('#cancel').css('display', 'inline');
        $('#check').css('display', 'inline');
        $('.modal-container').fadeIn(300);
        $('#haveTime').css('display', 'block');
        if (checked == 0) {
            $('#haveTime').css('display', 'block');
        }
    });

    $('#cancel').click(function () {
        $('.modal-container').fadeOut(300);
    });

    $('#close').click(function(){
        $('.timer').text('01:00');
        $('#checkResult').attr('disabled', true);
        $('#start').attr('disabled', false);
        clearInterval(timerId);
        $('#success').css('display', 'none');
        $('#lost').css('display', 'none');
        $(this).css('display', 'none');
        $('.modal-container').fadeOut(300);
    })

    $('#check').on('click', function () {
        $('#close').css('display', 'block');
        $('#cancel').css('display', 'none');
        $(this).css('display', 'none');
        let arr = $('#right>li');
        if (arr.length == numbers.length && checked == 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr.eq(i).text() == numbers[i]) {
                    checked = 1;
                } else {
                    checked = 0;
                }
            }
        }
        if (checked == 0) {
            $('#success').css('display', 'none');
            $('#haveTime').css('display', 'none');
            $('#lost').css('display', 'block');
            clearInterval(timerId);
            timerStarted = 0;
            timer = 59;
            checked = 0;
        } else {
            $('#success').css('display', 'block');
            $('#close').css('display', 'block');
            $('#cancel').css('display', 'none');
            $('#check').css('display', 'none');
            $('#haveTime').css('display', 'none');
            $('#lost').css('display', 'none');
            clearInterval(timerId);
            timerStarted = 0;
            timer = 59;
            checked = 0;
        }

    })

    // start new game and random list function    
    $('#new').on('click', function () {
        $('#left>li').css('opacity', 1)
        $('#left>li').css('background', '')
        $('#start').attr('disabled', false);
        $('#checkResult').attr('disabled', true);
        $('.timer').text('01:00');
        clearInterval(timerId);
        timerStarted = 0;
        timer = 59;
        checked = 0;
        let random = arr.sort(() => {
            return (Math.random() - 0.5)
        });
        for (let i = 0; i < random.length; i++) {
            $('#left').append(random[i]);
        }
        for (let i = 0; i < $('#left>li').length; i++) {
            $('#right>li').eq(i).css('background', 'none');
            $('#right>li').eq(i).text('');
        }
    });
    // end new game and random list function

    // set values to variables start draggable functions
    $('#left>li').draggable({
        revert: true,
        distance: 100,
        start: function () {
            checked = 0;
            $('#checkResult').attr('disabled', false);
            if (timerStarted == 0) {
                startTimer();
                timerStarted = 1;
                $('#start').attr('disabled', true);
            }
            bg = $(this).css('background');
            textContent = $(this).text();
            console.log('bg=', bg);
        }
    });
    // set values to variables start draggable function

    // set values to variables start drroppable function
    $('#right>li').droppable({
        accept: '#left>li',
        hoverClass: 'active',
        drop: function (event, ui) {
            if ($(this).css('background').includes("none")) {
                console.log('cell is empty')
                ui.draggable[0].style.opacity = '0';
                ui.draggable[0].style.background = 'none';
                event.target.style.background = bg;
                event.target.textContent = textContent;
            } else {
                console.log('isnt empty');
                for (let i = 0; i < $('#right>li').length; i++) {
                    if ($('#right>li').eq(i).css('background').includes("none")) {
                        ui.draggable[0].style.background = 'none';
                        ui.draggable[0].style.opacity = '0';
                        $('#right>li').eq(i).css('background', bg);
                        $('#right>li').eq(i).text(textContent);
                        break;
                    }
                }
            }

        }
    })
    // end seting values to variables start drroppable function

    // timer function start
    let timer = 59;
    let timerId;

    function startTimer() {
        timerId = setInterval(function () {
            if (timer >= 60) {
                $('.timer').html('00:' + timer);
                $('.haveTime').html('00:' + timer);
                timer--;
            } else {
                $('.timer').html('00:' + timer);
                timer--;
            };
            if (timer < 0 || checked == 1) {
                clearInterval(timerId);
                $('.modal-container').fadeIn(300);
                $('#success').css('display', 'none');
                $('#haveTime').css('display', 'none');
                $('#lost').css('display', 'block');
                clearInterval(timerId);
                timerStarted = 0;
                timer = 59;
                checked = 0;
            };
            if (checked == 1) {
                clearInterval(timerId);
            }

        }, 1000);
    }
    // timer function end


});