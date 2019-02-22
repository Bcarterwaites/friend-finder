//Load API Data
//=====================================

var friendData = require('../app/data/friend');


//Routing 
//========================================

module.exports = function(app) {


app.get("/api/friend", function(req, res) {
    res.json(friendData);



});

app.post("/api/friend", function(req, res) {
    var totalDifference = 0;
    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: 100
    }

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.userScores;

    var b = userScores.map(function(item) {
        return parseInt(item, 10);
    });
    userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
    };
    console.log("Name: " + userName);
    console.log("User Score: " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);
    console.log("Some of users score " + sum);
    console.log("Best match friend diff " + bestMatch.friendDifference)
    
    for (var i = 0; i < friendData.length; i++) {
        console.log(friendData[i].name);
        totalDifference = 0;
        console.log("Total Diff " + totalDifference);
        console.log("Best match friend diff " + bestMatch.friendDifference);

        var bfriendScore = friendData[i].scores.reduce((a, b) => a + b, 0);
        console.log("Total friend score " + bfriendScore);
        console.log("============================>" + totalDifference)


        if(totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = friendData[i].name;
            bestMatch.photo = friendData[i].photo;
            bestMatch.friendDifference = totalDifference;
        }

        console.log(totalDifference + " Total Difference");
    }

    console.log(bestMatch);
    friendData.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestMatch);
});
};