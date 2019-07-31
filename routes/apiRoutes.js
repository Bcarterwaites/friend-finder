//Load API Data
//=====================================

var friends = require('../app/data/friends');


//Routing 
//========================================

module.exports = function(app) {


app.get("/api/friends", function(req, res) {
    res.json(friends);



});

app.post("/api/friends", function(req, res) {
    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: Infinity
    };

    // Takes the result of the user's survey POST and parse it 
    var userData = req.body;
    var userScores = userData.userScores;

    // This variable calculates the difference between the user's scores and the scores of
    // each user in the database

    var totalDifference; 

    // Loops through all the friend possibilities in the database
    for (var i = 0; i < friends.length; i ++) {
        var currentFriend = friends[i];
        totalDifference = 0;

        console.log(currentFriend.name)

        // We then loop through all the scores of each friend
        for (var j = 0; j < currentFriend.scores.length; j++) {
            var currentFriendScore = currentFriend.scores[j];
            var currentUserScore = userScores[j];

            // We calculate the difference between the scores and sum them into the totalDifference
            totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }

        if (totalDifference <= bestMatch.friendDifference) {
            // Reset the bestMatch to be the new friend.
            bestMatch.name = currentFriend.name;
            bestMatch.photo = currentFriend.photo;
            bestMatch.friendDifference = totalDifference;
        }
    }

    // Finally save the user's data to the database 
    // the database will always return that the user is the user's best friend
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch)

});
};