song1 = "";
song2 = "";
lx = 0;
ly = 0;
rx = 0;
ry = 0;
rightwristscore = 0;
leftwristscore = 0;
statusl = "";
statusr = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses)
}
function draw() {
    //creating canvas
    image(video, 0, 0, 600, 500);
    //song1 status + var
    statusl = song1.isPlaying();
    //circle code
    fill("#4230a6");
    stroke("#4230a6");
    //if cond.
    if(leftwristscore > 0.2){
        //circle with X&Y
        circle(lx, ly, 20);
        //stoping song2
        song2.stop();
        //if cond. for playing song1
        if(song1 == false){
            //play song1
            song1.play();
            //update heading w/ song name
            document.getElementById("songname").innerHTML = "Peterpan Song";
        }
    }
    //right wrist code
    //song2 status+var
    statusr = song2.isPlaying();
    //if cond.
    if(rightwristscore > 0.2){
        //circle X&Y
        circle(rx, ry, 20);
        //stop song1
        song1.stop();
        //if cond. play song2
        if(song2 == false){
            //play song2
            song2.play();
            //update song name
            document.getElementById("songname").innerHTML = "Harry Potter Song";
        }
    }
}
function modelLoaded() {
    console.log("model loaded")
}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results)
        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
        results[0].pose.keypoints[10].score;
    }
}