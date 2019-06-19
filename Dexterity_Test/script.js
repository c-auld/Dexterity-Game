var gameStarted = false;
var misclicked = false;
var allClicked = false;

var start = new Date().getTime();

//initial shape values
var shapesClicked = 0;
var shapeSize = 100;
var shapeOpacity = 1;

//set up user preference variables
var exerciseTime = 0;
var chosenClicks = 0;

function positionShape(){
    //determine viewport size to place shapes in appropriate positions
    var w = window.innerWidth;
    var h = window.innerHeight;

    var leftPosition = Math.floor(Math.random() * (w-shapeSize));
    var topPosition = Math.floor(Math.random() * (h-shapeSize));

    $("#shape").css("left", leftPosition);
    $("#shape").css("top", topPosition);
    $("#shape").fadeIn("fast");
}

function changeSize(){
    //decrease shape 10px per every 5 times a shape is selected to increase challange
    shapeSize -= 5;
    $("#shape").css("height", shapeSize);
    $("#shape").css("width", shapeSize);
}

function changeOpacity(){
    //decrease opacity to increase challange
    shapeOpacity -= 0.05;
    $("#shape").fadeTo("fast", shapeOpacity);
}

function showResults(){
    var end = new Date().getTime();
    //calculate the time taken to click the shape;
    var timeTaken = (end - start) / 1000;

    gameStarted = false;
    $("#score").html("You managed to click " + shapesClicked + " circles withnin " + timeTaken + " seconds").fadeIn();
    
}

function taskFailed(){
    $("#shape").css("background-color", "red");
    $("#shape").fadeOut();

    if(misclicked){
        $("#misclickMessage").fadeIn();
    }else{
        $("#timeoutMessage").fadeIn();
    }
    showResults();
}


$("#submitPreferences").click(function(){
    exerciseTime = $("#exerciseTime").val();
    chosenClicks = $("#clicks").val();

    console.log("exerciseTime " + exerciseTime);
    console.log("chosenClicks " + chosenClicks);

    $("#settings").fadeOut(function(){
        //start game
        $("#shape").fadeIn();
        gameStarted = true;

        //keep track of users time
        start = new Date().getTime();

        //begin countdown
        setTimeout(taskFailed, 1000 * ( exerciseTime * 60));
    });
});

$(this).click(function(e){

    console.log("Shapes clicked: " + shapesClicked);
    console.log("Opacity level: " + shapeOpacity);
    console.log("shape Size: " + shapeSize);

    //If game has started respond to user clicks
    if(gameStarted){
        //if selected object is shape
        if($(e.target).is($("#shape"))){
            shapesClicked++;

            if(shapesClicked == chosenClicks){
                $("#shape").css("background-color", "green");
                $("#shape").fadeOut();
                $("#succsessMessage").fadeIn();

                showResults();
            }else{

                $("#shape").fadeOut("fast","linear", function(){
                    //callback function is used to modify shape after fadeOut is complete
                    if(shapesClicked % 5 == 0){

                        if(shapeSize > 50){
                            changeSize();
                        }
                        if(shapeOpacity > 0.05){
                            changeOpacity();
                        }
                    }
                    positionShape();
                });
            }
        }else{
            //If user miss clicks
            misclicked = true;
            taskFailed();
        }
    }
});