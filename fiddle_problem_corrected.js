var request, answer, GOOD = 'good', BAD = 'bad';

function createRequest(str) {

    return $.ajax({
        dataType: "json",
        url: '/echo/json/',
        type: 'POST',
        data: {
            json: JSON.stringify({
                text: str
            }),
            delay: 1
        },
    });
}

function isGood(obj) {
    var isOk = false;

    if (obj && obj.text) {
        if (obj.text === GOOD) {
            isOk = true;
        }
    }

    return isOk;
}

request = createRequest(BAD);

request.done(function(response) {
    var _request = createRequest(GOOD);
    setTimeout(function() {
        _request.done(function(response2) {
            answer = isGood(response2);
            alert(answer);
        });
    }, 1000);
});
