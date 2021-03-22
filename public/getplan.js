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

    if(faculty == "eng"){   // 06
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
    localStorage.clear();
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

var owndt = [];
let selectedFile;
document.getElementById('inputown').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

document.getElementById("cvown").addEventListener("click", () => {
    uploadFile().then(
        setTimeout(() => {  
            cleardt().then(
                sendOwnPlan()
            )
        }, 500)   
    )
})

var refindDT = [];
async function uploadFile(){
    var upload = document.getElementById('inputown');
    var uploadDT = [];
    if(upload){
        if (upload.files.length > 0) 
        {
            var reader = new FileReader(); // File reader to read the file 
            
            reader.onloadend = function(){
            // This event listener will happen when the reader has read the file
                var result = JSON.parse(reader.result); // Parse the result into an object 
                uploadDT = JSON.parse(JSON.stringify(result))
                for(var i=0;i<uploadDT.length;i++){
                    refindDT.push(uploadDT[i])
                }
            };
          
            reader.readAsText(upload.files[0]); // Read the uploaded file
            
        }
    }
    console.log(refindDT)
}

async function cleardt(){
    owndt = refindDT;
    //refindDT = [];
    console.log(owndt);
}

async function sendOwnPlan(){
    localStorage.clear();
    try{
        localStorage.setItem("course","MyPlan");
        localStorage.setItem("own",JSON.stringify(owndt))
        setTimeout(function() {window.location = "/plan"}, 2000);

      
    }
    catch(err){
        alert("Error");
    }
}