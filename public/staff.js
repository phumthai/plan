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

let selectedFile;
console.log(window.XLSX);
document.getElementById('inputexcel').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
    // changeExcel();
})

let data = [];

var dt;
document.getElementById('convert').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet],{defval:""});
              console.log(rowObject);
              dt = rowObject;
              //document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
            
         });
        }
    }

    // var fac = document.getElementById("faculty");
    // var ba = document.getElementById("bachelor");
    // var cou = document.getElementById("cos");
    // var st = document.getElementById('send')
    // if(fac.style.display = "none"){
    //     fac.style.display = "block";
    // }
    // if(ba.style.display = "none"){
    //     ba.style.display = "block";
    // }
    // if(cou.style.display = "none"){
    //     cou.style.display = "block";
    // }
    // if(st.style.display = "none"){
    //     st.style.display = "block";
    // }
    
});

document.getElementById('send').addEventListener("click",() =>{
    sendToFirebase();
});

function sendToFirebase(){
    var fac = document.getElementById("faculty").value;
    var ba = document.getElementById("bachelor").value;
    var cos = document.getElementById("cos").value;
    var sendcourse = cos
    if(fac != "Select Faculty" && ba != "Select Bachelor" && sendcourse !=""){
        try{
            firebase.database().ref(fac+"/"+ba+"/"+sendcourse).set(dt);
            console.log(cos)
            alert("Complete");
        }
        catch(err){
            alert("เกิดข้อผิดพลาดในระบบ กรุณาตรวจสอบความถูกต้องและลองใหม่อีกครั้ง");
        }
    }
    else{
        alert("กรุณาเติมให้ครบ")
    }
}

function showfaculty(){
    var container = document.querySelector('#bachelor');
    removeAllChildNodes(container);
    var faculty = document.getElementById("faculty").value;
    var bachelor = document.getElementById("bachelor");

    var opts = document.createElement("option");
    opts.text = "Select Bachelor";
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
            var opt = document.createElement("option");
            opt.value = shbe[i];
            opt.text = be[i];
            bachelor.appendChild(opt);
        }
    }
    else{
        var opt = document.createElement("option");
        opt.value = "test";
        opt.text = "test";
        bachelor.appendChild(opt);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// function changeExcel(){
//     var fac = document.getElementById("faculty");
//     var ba = document.getElementById("bachelor");
//     var cou = document.getElementById("cos");
//     var st = document.getElementById('send')
//     if(fac.style.display = "block"){
//         fac.style.display = "none";
//     }
//     if(ba.style.display = "block"){
//         ba.style.display = "none";
//     }
//     if(cou.style.display = "block"){
//         cou.style.display = "none";
//     }
//     if(st.style.display = "block"){
//         st.style.display = "none";
//     }
// }



//----------------------------------------------------------------------------------------------//

var keys = [];
function getData(){
    document.getElementById("keybin").value = "";
    var dfacu = document.getElementById("defaculty").value;
    var dbac = document.getElementById("debachelor").value;
    //check faculty and bachelor
    if(dfacu != "" && dbac != ""){
        var starCountRef = firebase.database().ref(dfacu + "/" + dbac);
    
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
    //course.style.display = "block";
    //console.log("ok")

    //show start botton
    var sta = document.getElementById("deleted");
    //sta.style.display = "block";
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

function deshowfaculty(){
    //delete option in course
    var x = document.querySelector('#course');
    removeAllChildNodes(x);
    //show course list defavl
    var course = document.getElementById("course");
    var opts = document.createElement("option");
    opts.text = "Select Course";
    opts.value = "";
    course.appendChild(opts);
    //course.style.display = "none";
    var sta = document.getElementById("deleted");
    //sta.style.display = "none";


    var container = document.querySelector('#debachelor');
    removeAllChildNodes(container);
    
    var dfaculty = document.getElementById("defaculty").value;
    var dbachelor = document.getElementById("debachelor");
    
    var opts = document.createElement("option");
    opts.text = "Select Bachelor";
    opts.value = "";
    dbachelor.appendChild(opts);

    if(dfaculty == "eng"){
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
            dbachelor.appendChild(opts);
        }
    }
    else{
        var opts = document.createElement("option");
        opts.value = "test";
        opts.text = "test";
        dbachelor.appendChild(opts);
    }
}

function deshowbachelor(){
    //delete option in course
    var x = document.querySelector('#course');
    removeAllChildNodes(x);
    //show course list defavl
    var course = document.getElementById("course");
    var opts = document.createElement("option");
    opts.text = "Select Course";
    opts.value = "";
    course.appendChild(opts);
    //course.style.display = "none";
    var sta = document.getElementById("delete");
    //sta.style.display = "none";
}

document.getElementById('recive').addEventListener("click",() =>{
    getData();
    setTimeout(function() {showcourse();}, 3000);
});

var dt;
document.getElementById('deleted').addEventListener("click",() =>{
    var dfacu = document.getElementById("defaculty").value;
    var dbac = document.getElementById("debachelor").value;
    var cou = document.getElementById("course").value;
    var ref = firebase.database().ref(dfacu + "/" + dbac + "/" + cou);
    
    if(cou!=""){
        try{
            firebase.database().ref(dfacu+"/"+dbac+"/"+cou).set(null);
            console.log(cos)
            alert("Complete");
        }
        catch(err){
            alert("Error");
        }
        
    }
    else{
        alert("กรุณาเลือกหลักสูตร")
    }
});