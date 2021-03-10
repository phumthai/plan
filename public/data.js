var firebaseConfig = {
    apiKey: "AIzaSyDpwoFkLynt7DjrO-ErBtSG1Qe7gq6FeCo",
    authDomain: "plan491-eba08.firebaseapp.com",
    databaseURL: "https://plan491-eba08.firebaseio.com",
    projectId: "plan491-eba08",
    storageBucket: "plan491-eba08.appspot.com",
    messagingSenderId: "142254690586",
    appId: "1:142254690586:web:bdafa6fbe8af8a35f9dca3",
    measurementId: "G-LFQ53NVP2G"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



var keys = [];
function getData(){
    document.getElementById("keybin").value = "";
    var facu = document.getElementById("faculty").value;
    var bac = document.getElementById("bachelor").value;
    //check faculty and bachelor
    if(facu != "" && bac != ""){
        var starCountRef = firebase.database().ref(facu + "/" + bac);
    
        // get key from firebase
        starCountRef.on('value', function (snapshot){
            snapshot.forEach(function (child){
            document.getElementById("keybin").value += child.key + " ";
            })
        });
    
    }

    else{
        alert("กรุณากรอกข้อมูลให้ครบ");
    }
    
}

function showcourse(){
    //delete option in course
    var x = document.querySelector('#course');
    removeAllChildNodes(x);
    

    //show course list defavl
    var course = document.getElementById("course");
    var opts = document.createElement("option");
    opts.text = "Select Course";
    opts.value = "";
    course.appendChild(opts);
    
    //console.log("ok")

    //show start botton
    var sta = document.getElementById("start");
    var c = document.getElementById("keybin").value;
    var text = c.split(' ');
    ///console.log(text)

    //add course
    for(var i=0;i<text.length-1;i++){
        var opts = document.createElement("option");
        opts.value = text[i];
        opts.text = text[i];
        course.appendChild(opts);
    }
    
}


function showfaculty(){
    //delete option in course
    var x = document.querySelector('#course');
    removeAllChildNodes(x);
    //show course list defavl
    var course = document.getElementById("course");
    var opts = document.createElement("option");
    opts.text = "Select Course";
    opts.value = "";
    course.appendChild(opts);
    var sta = document.getElementById("start");

    var container = document.querySelector('#bachelor');
    removeAllChildNodes(container);
    
    var faculty = document.getElementById("faculty").value;
    var bachelor = document.getElementById("bachelor");
    
    var opts = document.createElement("option");
    opts.text = "Select Bachelor";
    opts.value = "";
    bachelor.appendChild(opts);

    if(faculty == "eng"){
        var be = [
            "Computer Engineering",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Civil Engineering",
            "Information Systems and Network Engineering",
            "Environmental Engineering",
            "Mining Engineering",
            "Industrial Engineering"
        ]
        var shbe = [
            "cpe",
            "me",
            "ee",
            "ce",
            "isne",
            "envi",
            "mine",
            "ie"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else{
        var opts = document.createElement("option");
        opts.value = "test";
        opts.text = "test";
        bachelor.appendChild(opts);
    }
}

function showbachelor(){
    //delete option in course
    var x = document.querySelector('#course');
    removeAllChildNodes(x);
    //show course list defavl
    var course = document.getElementById("course");
    var opts = document.createElement("option");
    opts.text = "Select Course";
    opts.value = "";
    course.appendChild(opts);
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.getElementById('recive').addEventListener("click",() =>{
    getData();
    setTimeout(function() {showcourse();}, 3000);
});




var dt;
document.getElementById('start').addEventListener("click",() =>{
    var facu = document.getElementById("faculty").value;
    var bac = document.getElementById("bachelor").value;
    var cou = document.getElementById("course").value;
    var ref = firebase.database().ref(facu + "/" + bac + "/" + cou);
    
    if(cou!=""){
        try{
            ref.on('value', (snapshot) => {
            dt = snapshot.val();
            localStorage.setItem("Data", JSON.stringify(dt));
            localStorage.setItem("course",cou);
            setTimeout(function() {window.location = "/plan"}, 2000);
            
            });
          
        }
        catch(err){
            alert("Error");
        }
        console.log(dt)
    }
    else{
        alert("กรุณาเลือกหลักสูตร")
    }
});



//Get own plan
var input = document.querySelector('input#inputown');
//let textarea = document.querySelector('textarea');
var owndt = [];
// input.addEventListener('change', () => {
//     let files = input.files;
 
//     if(files.length == 0) return;
 
//     const file = files[0];

//     let reader = new FileReader();
 
//     reader.onload = (e) => {
//         const file = e.target.result;
//         const lines = file.split(/\r\n|\n/);
//         //textarea.value = lines.join('\n');
//         //console.log(lines)
//         owndt += lines
//     };
 
//     reader.onerror = (e) => alert(e.target.error.name);
 
//     reader.readAsText(file); 
//     console.log(owndt);
// });
let selectedFile;
// document.getElementById('inputown').addEventListener("change", (event) => {
//     selectedFile = event.target.files[0];
//     // changeExcel();
// })

document.getElementById("cvown").addEventListener("click", () => {
   
})


window.addEventListener('load', function() {
    var upload = document.getElementById('inputown');
    
    // Make sure the DOM element exists
    if (upload) 
    {
      upload.addEventListener('change', function() {
        // Make sure a file was selected
        if (upload.files.length > 0) 
        {
          var reader = new FileReader(); // File reader to read the file 
          
          // This event listener will happen when the reader has read the file
          reader.addEventListener('load', function() {
            var result = JSON.parse(reader.result); // Parse the result into an object 
            
            console.log(result);
            console.log(result.name);
            console.log(result.age);
            console.log(result.occupation);
          });
          
          reader.readAsText(upload.files[0]); // Read the uploaded file
        }
      });
    }
  });
