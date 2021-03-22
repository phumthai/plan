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
    else if(faculty == "human"){    //01
        var be = [
            "Psychology",
            "Tourism",
            "Chinese",
            "Thai",
            "Thai as a Foreign Language",
            "Home and Community",
            "History",
            "Philosophy",
            "Japanese",
            "French",
            "Myanmar Language and Culture",
            "English",
            "Information Studies"
        ]
        var shbe = [
            "psy",
            "tour",
            "china",
            "thai",
            "thaifore",
            "hnc",
            "his",
            "phi",
            "jp",
            "fr",
            "myan",
            "eng",
            "info"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "edu"){  //02
        var be = [
            "Elementary Education",
            "Early Childhood Education-Special Education",
            "Mathematics",
            "Chemistry",
            "Biology",
            "Physical Education",
            "Physics",
            "Thai",
            "English",
            "Art Education",
            "Social Studies"
        ]
        var shbe = [
            "elementedu",
            "earlychild",
            "math",
            "chemi",
            "bio",
            "physicaledu",
            "phy",
            "th",
            "eng",
            "art",
            "socedu"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "fineart"){  //03
        var be = [
            "Creative Photography",
            "Design",
            "Painting",
            "Sculpture",
            "Performing Arts",
            "Thai Art",
            "Printmaking",
            "Multidisciplinary Art",
            "Media Arts and Design"
        ]
        var shbe = [
            "crephoto",
            "design",
            "paint",
            "sculpture",
            "perart",
            "thaiart",
            "printmake",
            "multiart",
            "mediaart"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "soc"){  //04
        var be = [
            "Geography",
            "Sociology and Anthropology",
            "Social Science (International Program)",
            "ASEAN Studies"
        ]
        var shbe = [
            "geo",
            "socandant",
            "socsci",
            "asean"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "sci"){  //05
        var be = [
            "Chemistry",
            "Industrial Chemistry",
            "Microbiology",
            "Biochemistry and Biochemical Technology",
            "Biology",
            "Geology",
            "Physics",
            "Materials Science",
            "Zoology",
            "Mathematics",
            "Data Science",
            "Computer Science",
            "Environmental Science (International Program)",
            "Statistics",
            "Gemology"
        ]
        var shbe = [
            "chemi",
            "induschemi",
            "microbio",
            "biochemi",
            "bio",
            "geo",
            "physic",
            "material",
            "zoo",
            "math",
            "data",
            "com",
            "envi",
            "stat",
            "gem"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "med"){  //07
        var be = [
            "Doctor of Medicine Program"
        ]
        var shbe = [
            "doc"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "agri"){  //08
        var be = [
            "Agriculture",
            "Agricultural Economics",
        ]
        var shbe = [
            "argi",
            "argieco"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "dent"){  //09
        var be = [
            "Doctor of Dental Surgery Program"
        ]
        var shbe = [
            "dent"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "phama"){  //10
        var be = [
            "Doctor of Pharmacy Program"
        ]
        var shbe = [
            "phama"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "medtec"){  //11
        var be = [
            "Physical Therapy",
            "Occupational Therapy",
            "Radiologic Technology"
        ]
        var shbe = [
            "phy",
            "occ",
            "redio"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "nurse"){  //12
        var be = [
            "Nursing",
            "Nursing (International Program)"
        ]
        var shbe = [
            "nurse",
            "nurseinter"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "argo"){  //13
        var be = [
            "Packaging Technology",
            "Product Development Technology",
            "Agro-Industrial Biotechnology",
            "Marine Product Technology",
            "Food Science and Technology",
            "Food Process Engineering"
        ]
        var shbe = [
            "pack",
            "productdev",
            "biotec",
            "marine",
            "foodsci",
            "foodproc"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "vet"){  //14
        var be = [
            "Veterinary"
        ]
        var shbe = [
            "vet"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "accba"){  //15
        var be = [
            "Business Administration",
            "Service Business Management",
            "Accountancy"
        ]
        var shbe = [
            "bus",
            "service",
            "account"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "econ"){  //16
        var be = [
            "Economics",
            "Economics (International Program)"
        ]
        var shbe = [
            "eco",
            "ecointer"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "arch"){  //17
        var be = [
            "Landscape Architectur",
            "Integrated Design in Emerging Architecture (International Program)",
            "Architecture"
        ]
        var shbe = [
            "landarch",
            "interdesign",
            "arch"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "masscom"){  //18
        var be = [
            "Mass Communication",
            "Digital Film (Bilingual Program)"
        ]
        var shbe = [
            "masscom",
            "digfilm"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "polsci"){  //19
        var be = [
            "Public Administration",
            "Politics and Government",
            "International Affairs"
        ]
        var shbe = [
            "public",
            "politic",
            "inter"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "law"){  //20
        var be = [
            "Laws"
        ]
        var shbe = [
            "law"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
        }
    }
    else if(faculty == "camt"){  //21
        var be = [
            "Camp"
        ]
        var shbe = [
            "camp"
        ]
        for(var i=0;i<be.length;i++){
            var opts = document.createElement("option");
            opts.value = shbe[i];
            opts.text = be[i];
            bachelor.appendChild(opts);
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