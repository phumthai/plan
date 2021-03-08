var dt;
var vecdt = [];
var cou;
var arrterm = ["1/1","1/2","S1","2/1","2/2","S2","3/1","3/2","S3","4/1","4/2","S4","5/1","5/2","S5","6/1","6/2","S6","7/1","7/2","S7","8/1","8/2","S8"];
var locterm = [0.5,99.5,198.5,297.5,396.5,495.5,594.5,693.5,792.5,891.5,990.5,1089.5,1188.5,1287.5,1386.5,1485.5,1584.5,1683.5,1782.5,1881.5,1980.5,2079.5,2178.5,2277.5];
var term = [];
var gradeA = ["-","A","B+","B","C+","C","D+","D","F","S","U"];
var gradeVal = [0,4,3.5,3,2.5,2,1.5,1,0,0,0];
var gradeS = ["-","S","U"];
var snarr = [];
var arrposterm = [0,3,6,9,12,15,18,21,24,27,30,33,36];

window.addEventListener('load',() =>{
    dt = JSON.parse(localStorage.getItem('Data'))
    cou = localStorage.getItem('course');
    console.log(dt,cou);
    jsontovec().then(
        writegraph().then(
            load()
        )
    )
    //setTimeout(function() {addRow('mytable')}, 100);
    //addRow('mytable');
    //writegraph();
})
//create graph format by json

async function jsontovec(){
    var l = dt.length; // length of data
    
    for(var i=0;i<l;i++){
        var nextpos = [];
        var wi = [];
        for(var j=0;j<l;j++){
            if(dt[j]["Prerequisite"].includes("with")==false){
                if(dt[j]["Prerequisite"]!=""&&dt[j]["Prerequisite"].includes(dt[i]["ShortName"])==true&&dt[j]["Prerequisite"].includes("with")==false){
                    nextpos.push(j)
                }
            }
            else if(dt[j]["Prerequisite"].includes("with")==true){
                var pre = dt[j]["Prerequisite"].split(' ')
                if(pre[1]==dt[i]["ShortName"]){
                    wi.push(j);
                }
            }
        }
        snarr.push(dt[i]["ShortName"])
        vecdt.push([dt[i]["ID"],dt[i]["ShortName"],dt[i]["Name"],dt[i]["Credits"],dt[i]["Prerequisite"],dt[i]["Semester"],dt[i]["Grade"],nextpos,"notdone",wi,"-",dt[i]["Semester"]]);
        // 0 id    1 shrotname    2 name    3 credit   4 pre    5 semester    6 gradetype   7 nextpos   8 writecheck  9 labcheck  10 grade 11 semesterbackup
     }
     console.log(vecdt);
     return vecdt;
}

async function writegraph(){

    var l = dt.length; // length of data
    
    //jsontovec();
 
 
    var abc ="123",x;
    var node = "";
    var link = "],\n\"linkDataArray\": [\n";
    var lenlocx = 0.5;
    var lenlocy = 53.122;
    var lens = 0;
    var keylocx = 12.5;
    var keylocy = 70;
    term = [];
    var termindex = [];
    var keylastx = [];
    var keylasty = [];
    var firstposx = -86.5;
    var firstposy = 70;
    var lastposx = -86.5;
    var lastposy = 70;
    //abc += dt[0]["ID"];
    x = dt.length;
    var fulltxt = "{\n\"class\": \"GraphLinksModel\",\n";
    fulltxt += "\"nodeDataArray\": [\n";
    //check json have data
    if(x!=0){
        fulltxt += "{\"key\":\"Pool1\", \"text\":\""+cou+"\", \"\isGroup\":true, \"category\":\"Pool\", \"loc\":\"0.5 26.59846649169922\",\"color\":\"lightgray\"},\n";
    }
    // make term lens
    // make index of termarr pos
    for(var i=0;i<dt.length;i++){
        if(termindex.includes(arrterm.indexOf(vecdt[i][5]))==false){
            termindex.push(arrterm.indexOf(vecdt[i][5]));
            term.push("");
        }
    }
    termindex.sort(function(a, b){return a - b}) // sort index of termarr pos
    // collect term exit in term[]
    for(var i=0;i<dt.length;i++){
        if(term.includes(vecdt[i][5])==false){
            var atermpos = arrterm.indexOf(vecdt[i][5]);
            var teindx = termindex.indexOf(atermpos);
            term[teindx] = vecdt[i][5];
        }
    }
    // createlens
    for(var i=0;i<term.length;i++){
        lens += 1;
        node += "{\"key\":\"Lane"+ lens + "\",\"text\":\""+ term[i] + "\",\"isGroup\":true, \"group\":\"Pool1\", \"color\":\"#D2DD81\", \"size\":\"130 1000\", \"loc\":\""+ lenlocx + " "+ lenlocy + "\"},\n";
        lenlocx += 99;
        keylastx.push(keylocx)
        keylasty.push(keylocy);
        keylocx += 99;
    }

    //make node
    for(var i=0;i<vecdt.length;i++){
        if(vecdt[i][8]=="notdone"){
            var lens = term.indexOf(vecdt[i][5]) + 1;

            node += "{\"key\":\""+ vecdt[i][1] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylastx[lens-1] + " " + keylasty[lens-1] + "\"},\n";
            //keylasty[lens-1] += 75;
            vecdt[i][8] = "done";
            keylasty[lens-1] += 75;

            if(vecdt[i][7].length!=0||vecdt[i][9].length!=0){
                var ntle = vecdt[i][7].length;
                var nextnode = [];
                for(var j=0;j<ntle;j++){
                    nextnode.push(vecdt[i][7][j]);
                }
                while(nextnode.length!=0){
                    var valnexnode = nextnode[0];
                    var semt = vecdt[valnexnode][5];
                    var lennext = term.indexOf(semt) + 1;
                    if(vecdt[valnexnode][8]=="notdone"){
                        node += "{\"key\":\""+ vecdt[valnexnode][1] +"\", \"group\":\"Lane"+ lennext + "\", \"loc\":\"" + keylastx[lennext-1] + " " + keylasty[lennext-1] + "\"},\n";
                        keylasty[lennext-1] += 75;
                        vecdt[valnexnode][8] = "done";
                    }
                    nextnode.shift();
                    if(lastposy<keylasty[lennext-1]){
                        lastposy = keylasty[lennext-1]
                    }
                    if(vecdt[valnexnode][7].length!=0){
                        var le = vecdt[valnexnode][7].length;
                        for(var k=0;k<le;k++){
                            nextnode.unshift(vecdt[valnexnode][7][k]);
                        }
                    }
                    if(vecdt[valnexnode][9].length!=0){
                        nextnode.push(vecdt[valnexnode][9][0]);
                    }

                
                }
                for(var j=0;j<keylasty.length;j++){
                    if(keylasty[j]<lastposy){
                        keylasty[j] = lastposy;
                    }
                }
            }

        }
    }
    //make link
    for(var i=0;i<vecdt.length;i++){
        if(vecdt[i][4]!=""){
            var checkpre = vecdt[i][4];
            if(checkpre.includes("in")==true){
                var tor = checkpre.split(' ');
                if(parseInt(tor[0])==tor.length-2){
                    for(var j=2;j<tor.length;j++){
                        link += "{\"from\":\"" + tor[j] + "\", \"to\":\"" + vecdt[i][1] +"\" ,\"color\":\"black\"},\n";
                    }
                }
                else{
                    for(var j=2;j<tor.length;j++){
                        link += "{\"from\":\"" + tor[j] + "\", \"to\":\"" + vecdt[i][1] +"\" ,\"color\":\"blue\"},\n";
                    }
                }
                
            }
            else if(checkpre.includes("with")==true){
                var tor = checkpre.split(' ');
                link += "{\"from\":\"" + tor[1] + "\", \"to\":\"" + vecdt[i][1] +"\" , \"color\":\"red\"},\n";
            }
        }
    }

    var newnode,newlink;
    newnode = node.slice(0,-2);
    newlink = link.slice(0,-2);
    newlink += "\n]}";
     
    fulltxt += newnode;
    fulltxt += newlink;
     
     
    document.getElementById("mySavedModel").value = fulltxt;

}


// add table
async function addRow(tableID,index) {
    
    var table = document.getElementById(tableID);
    var idx = index;
    var rowCount = table.rows.length;
    if(rowCount>1){
        table.deleteRow(1);
    }
    rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.id = 'id_id' + rowCount;
    element1.value = vecdt[idx][0]; // id
    element1.type = 'text'
    element1.readOnly = true;
    cell1.appendChild(element1);

    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.id = 'id_sn' + rowCount;
    element2.value = vecdt[idx][1]; // shortname
    element2.type = 'text'
    element2.readOnly = true;
    cell2.appendChild(element2);
    
    var cell3 = row.insertCell(2);
    var element3 = document.createElement("input");
    element3.id = 'id_name' + rowCount;
    element3.value = vecdt[idx][2]; // name
    element3.type = 'text'
    element3.readOnly = true;
    cell3.appendChild(element3); 

    var cell4 = row.insertCell(3);
    var element4 = document.createElement("input");
    element4.id = 'id_credit' + rowCount;
    element4.value = vecdt[idx][3]; // credit
    element4.type = 'text'
    element4.readOnly = true;
    cell4.appendChild(element4);

    var cell5 = row.insertCell(4);
    var element5 = document.createElement("input");
    element5.id = 'id_pre' + rowCount;
    element5.value = vecdt[idx][4]; // pre
    element5.type = 'text'
    element5.readOnly = true;
    cell5.appendChild(element5);

    
    var cell6 = row.insertCell(5);
    var element6 = document.createElement("select");
    element6.id = 'id_term' + rowCount;
    for(var k=0;k<arrterm.length;k++){
        var option = document.createElement("option");
        if(arrterm[k]==vecdt[idx][5]){
            option.value = arrterm[k];
            option.selected = arrterm[k];
        }
        else{
            option.value = arrterm[k];
        }
        option.text = arrterm[k];
        element6.appendChild(option);
        cell6.appendChild(element6);
    }
    

}

// gojs write graph function
async function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
    myDiagram.delayInitialization(relayoutDiagram);
}

//rewrite graph
document.getElementById('regraph').addEventListener("click",() => {
    document.getElementById('mySavedModel').value = "";
    termchange().then(
        writegraph().then(
            load(),toggleRowTable(),
            console.log(term)
        )
    )

})

async function termchange(){
    //clear writecheck
    for(var i=0;i<vecdt.length;i++){
        vecdt[i][8] = "notdone"
    }

    var table = document.getElementById("mytable");
    var totalRowCount = table.rows.length;
    var sndx = "id_sn1";
    var snvl = document.getElementById(sndx).value;
    if(snarr.includes(snvl)==true){
        var snidx = snarr.indexOf(snvl);
        var sedx = "id_term1";
        var sevl = document.getElementById(sedx).value;
        var indexofsevl = arrterm.indexOf(sevl);
        var indexofsemester = arrterm.indexOf(vecdt[snidx][5])
        if(indexofsevl-indexofsemester>0&&vecdt[snidx][8]=="notdone"){
            var nextnd = [];
            
            vecdt[snidx][5] = sevl;
            vecdt[snidx][8] = "done";
            if(vecdt[snidx][7].length!=0){
                for(var j=0;j<vecdt[snidx][7].length;j++){
                    nextnd.push(vecdt[snidx][7][j]);
                }
            }
            while(nextnd.length!=0){
                var valnxnode = nextnd[0];
                var pre = vecdt[valnxnode][4];
                var presplit = pre.split(' ');
                var allprenode = [];
                for(var i=2;i<presplit.length;i++){
                    for(var j=0;j<vecdt.length;j++){
                        if(vecdt[j][1]==presplit[i]){
                            allprenode.push(j);
                            break;
                        }
                    }
                }
                var prenode = Math.max.apply(Math,allprenode);
                var dif = arrterm.indexOf(vecdt[prenode][5]) - arrterm.indexOf(vecdt[valnxnode][5]);
                if(dif>=0){
                    var oripreT = vecdt[prenode][11];
                    var oriT = vecdt[valnxnode][11];
                    var modoripreT = (arrterm.indexOf(oripreT)+1)%3;
                    var modoriT = (arrterm.indexOf(oriT)+1)%3;
                    var modpreT = (arrterm.indexOf(vecdt[prenode][5])+1)%3
                    var diforiterm = arrterm.indexOf(oriT)-arrterm.indexOf(oripreT);
                    var oripreY = ~~((arrterm.indexOf(vecdt[prenode][11])+1)/3);
                    var oriY = ~~((arrterm.indexOf(vecdt[valnxnode][11])+1)/3);
                    var preY = ~~((arrterm.indexOf(vecdt[prenode][5])+1)/3);
                    var difY = oriY-oripreY;
                    var nextY = preY + difY;
                    var TnextY = arrposterm[nextY];
                    var idxT = arrterm[TnextY];
                    var ck = true;
                    while(ck==true){
                        if(arrterm.indexOf(vecdt[prenode][5])<arrterm.indexOf(idxT)){
                            if((arrterm.indexOf(idxT)+1)%3==modoriT){
                                vecdt[valnxnode][5] = idxT;
                                vecdt[valnxnode][8] = "done";
                                ck = false;
                            }
                            else{
                                TnextY++;
                                idxT = arrterm[TnextY];
                            }
                        }
                        else{
                            TnextY++;
                            idxT = arrterm[TnextY];
                        }
                    }
                }
                if(vecdt[valnxnode][7].length!=0){
                    for(var j=0;j<vecdt[valnxnode][7].length;j++){
                        nextnd.push(vecdt[valnxnode][7][j]);
                    }
                }
                nextnd.shift();
            }
        }
        else if(indexofsevl-indexofsemester<=0&&vecdt[snidx][8]=="notdone"){
            if(vecdt[snidx][4].includes("in")==true){
                var pre = vecdt[snidx][4];
                var presplit = pre.split(' ');
                var allprenode = [];
                for(var i=2;i<presplit.length;i++){
                    for(var j=0;j<vecdt.length;j++){
                        if(vecdt[j][1]==presplit[i]){
                            allprenode.push(j);
                            break;
                        }
                    }
                }
                var prenode = Math.max.apply(Math,allprenode);
                if(indexofsevl>arrterm.indexOf(vecdt[prenode][5])){
                    vecdt[snidx][5] = sevl;
                    vecdt[snidx][8] = "done";
                    //////
                    var nextnd = [];
                    if(vecdt[snidx][7].length!=0){
                        for(var j=0;j<vecdt[snidx][7].length;j++){
                            nextnd.push(vecdt[snidx][7][j]);
                        }
                    }
                    var lastT = snidx;
                    while(nextnd.length!=0){
                        var valnxnode = nextnd[0];
                        var pre = vecdt[valnxnode][4];
                        var presplit = pre.split(' ');
                        var allprenode = [];
                        for(var i=2;i<presplit.length;i++){
                            for(var j=0;j<vecdt.length;j++){
                                if(vecdt[j][1]==presplit[i]){
                                    allprenode.push(j);
                                    break;
                                }
                            }
                        }
                        var prenode = Math.max.apply(Math,allprenode);
                        var dif = arrterm.indexOf(vecdt[prenode][5]) - arrterm.indexOf(vecdt[valnxnode][5]);
                        if(dif<0){
                            var oripreT = vecdt[prenode][11];
                            var oriT = vecdt[valnxnode][11];
                            var modoripreT = (arrterm.indexOf(oripreT)+1)%3;
                            var modoriT = (arrterm.indexOf(oriT)+1)%3;
                            var modpreT = (arrterm.indexOf(vecdt[prenode][5])+1)%3
                            var diforiterm = arrterm.indexOf(oriT)-arrterm.indexOf(oripreT);
                            var oripreY = ~~((arrterm.indexOf(vecdt[prenode][11])+1)/3);
                            var oriY = ~~((arrterm.indexOf(vecdt[valnxnode][11])+1)/3);
                            var preY = ~~((arrterm.indexOf(vecdt[prenode][5])+1)/3);
                            var difY = oriY-oripreY;
                            var nextY = preY + difY;
                            var TnextY = arrposterm[nextY];
                            console.log(arrterm[TnextY])
                            var idxT = arrterm[TnextY];
                            var ck = true;
                            while(ck==true){
                                if(arrterm.indexOf(vecdt[prenode][5])<arrterm.indexOf(idxT)){
                                    if((arrterm.indexOf(idxT)+1)%3==modoriT){
                                        console.log((arrterm.indexOf(idxT)+1)%3,modoriT);
                                        vecdt[valnxnode][5] = idxT;
                                        vecdt[valnxnode][8] = "done";
                                        ck = false;
                                    }
                                    else{
                                        TnextY++;
                                        idxT = arrterm[TnextY];
                                    }
                                }
                                else{
                                    TnextY++;
                                    idxT = arrterm[TnextY];
                                }
                            }
                        }
                        if(vecdt[valnxnode][7].length!=0){
                            for(var j=0;j<vecdt[valnxnode][7].length;j++){
                                nextnd.push(vecdt[valnxnode][7][j]);
                            }
                        }
                        nextnd.shift();
                    }
                }
            }
            else{
                vecdt[snidx][5] = sevl;
                vecdt[snidx][8] = "done";
                var nextnd = [];
                if(vecdt[snidx][7].length!=0){
                    for(var j=0;j<vecdt[snidx][7].length;j++){
                        nextnd.push(vecdt[snidx][7][j]);
                    }
                }
                while(nextnd.length!=0){
                    var valnxnode = nextnd[0];
                    var pre = vecdt[valnxnode][4];
                    var presplit = pre.split(' ');
                    var allprenode = [];
                    for(var i=2;i<presplit.length;i++){
                        for(var j=0;j<vecdt.length;j++){
                            if(vecdt[j][1]==presplit[i]){
                                allprenode.push(j);
                                break;
                            }
                        }
                    }
                    var prenode = Math.max.apply(Math,allprenode);
                    var dif = arrterm.indexOf(vecdt[prenode][5]) - arrterm.indexOf(vecdt[valnxnode][5]);
                    if(dif<0){
                        var oripreT = vecdt[prenode][11];
                        var oriT = vecdt[valnxnode][11];
                        var modoripreT = (arrterm.indexOf(oripreT)+1)%3;
                        var modoriT = (arrterm.indexOf(oriT)+1)%3;
                        var modpreT = (arrterm.indexOf(vecdt[prenode][5])+1)%3
                        var diforiterm = arrterm.indexOf(oriT)-arrterm.indexOf(oripreT);
                        var oripreY = ~~((arrterm.indexOf(vecdt[prenode][11])+1)/3);
                        var oriY = ~~((arrterm.indexOf(vecdt[valnxnode][11])+1)/3);
                        var preY = ~~((arrterm.indexOf(vecdt[prenode][5])+1)/3);
                        var difY = oriY-oripreY;
                        var nextY = preY + difY;
                        var TnextY = arrposterm[nextY];
                        var idxT = arrterm[TnextY];
                        var ck = true;
                        while(ck==true){
                            if(arrterm.indexOf(vecdt[prenode][5])<arrterm.indexOf(idxT)){
                                if((arrterm.indexOf(idxT)+1)%3==modoriT){
                                    vecdt[valnxnode][5] = idxT;
                                    vecdt[valnxnode][8] = "done";
                                    ck = false;
                                }
                                else{
                                    TnextY++;
                                    idxT = arrterm[TnextY];
                                }
                            }
                            else{
                                TnextY++;
                                idxT = arrterm[TnextY];
                            }
                        }
                    }
                    if(vecdt[valnxnode][7].length!=0){
                        for(var j=0;j<vecdt[valnxnode][7].length;j++){
                            nextnd.push(vecdt[valnxnode][7][j]);
                        }
                    }
                    nextnd.shift();
                }
            }
        }
    }

    for(var i=0;i<vecdt.length;i++){
        vecdt[i][8] = "notdone"
    }
    table.deleteRow(1);
}


// enter when key
document.getElementById('shName').addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
     e.preventDefault();
     document.getElementById("shNameSearch").click();
    }
})

document.getElementById('shNameSearch').addEventListener("click", () => {
    var ipn = document.getElementById('shName').value;
    var uipn = ipn.toUpperCase();
    var idx;
    var idxck;
    if(ipn!=""){
        for(var i=0;i<vecdt.length;i++){
            if(uipn==vecdt[i][1]){
                idx = i;
                idxck = true;
                break;
            }
        }
        if(idxck==true){
            addRow('mytable',idx)
            toggleRowTable();
        }
    }
})

function toggleRowTable() {
    var x = document.getElementById("mytable");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


// show grade
document.getElementById('shGrade').addEventListener("click", () => {
    showGrade();
    toggleRowGrade();
})

function toggleRowGrade() {
    var x = document.getElementById("gradetable");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

function showGrade(){
    var cradit = 0;
    var sumgrade = 0;
    var AverageGrade = 0;
    var allsuCradit = 0;
    var detable = document.getElementById("gradetable");
    var derowCount = detable.rows.length;
    if(derowCount>1){
        for(var i=derowCount-1;i>0;i--){
            detable.deleteRow(i);
        }
    }
    for(var i=0;i<term.length;i++){
        var subject = [];
        var sumTgrade = 0;
        var sumTcredit = 0;
        var suCredit = 0;
        for(var j=0;j<vecdt.length;j++){
            if(vecdt[j][5]==term[i]){
                subject.push(j);
            }
        }
        for(var j=0;j<subject.length;j++){
            var table = document.getElementById("gradetable");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.value = vecdt[subject[j]][0]; // id
            element1.type = 'text'
            element1.readOnly = true;
            cell1.appendChild(element1);

            var cell2 = row.insertCell(1);
            var element2 = document.createElement("input");
            element2.value = vecdt[subject[j]][1]; // shortname
            element2.type = 'text'
            element2.readOnly = true;
            cell2.appendChild(element2);

            var cell3 = row.insertCell(2);
            var element3 = document.createElement("input");
            element3.value = vecdt[subject[j]][2]; // name
            element3.type = 'text'
            element3.readOnly = true;
            cell3.appendChild(element3);

            var cell4 = row.insertCell(3);
            var element4 = document.createElement("input");
            element4.value = vecdt[subject[j]][3]; // credit
            element4.type = 'text'
            element4.readOnly = true;
            cell4.appendChild(element4);
            
            var cell5 = row.insertCell(4);
            var element5 = document.createElement("input");
            element5.value = vecdt[subject[j]][10]; // grade
            element5.type = 'text'
            element5.readOnly = true;
            cell5.appendChild(element5);
            var g = vecdt[subject[j]][10];
            if(g=="A"){
                sumTgrade += 4*vecdt[subject[j]][3];
                sumgrade += 4*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="B+"){
                sumTgrade += 3.5*vecdt[subject[j]][3];
                sumgrade += 3.5*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="B"){
                sumTgrade += 3*vecdt[subject[j]][3];
                sumgrade += 3*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="C+"){
                sumTgrade += 2.5*vecdt[subject[j]][3];
                sumgrade += 2.5*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="C"){
                sumTgrade += 2*vecdt[subject[j]][3];
                sumgrade += 2*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="D+"){
                sumTgrade += 1.5*vecdt[subject[j]][3];
                sumgrade += 1.5*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="D"){
                sumTgrade += 1*vecdt[subject[j]][3];
                sumgrade += 1*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="F"){
                sumTgrade += 0*vecdt[subject[j]][3];
                sumgrade += 0*vecdt[subject[j]][3];
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
            }
            else if(g=="S"){
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
                suCredit += vecdt[subject[j]][3];
                allsuCradit += vecdt[subject[j]][3];
            }
            else if(g=="U"){
                sumTcredit += vecdt[subject[j]][3];
                cradit += vecdt[subject[j]][3];
                suCredit += vecdt[subject[j]][3];
                allsuCradit += vecdt[subject[j]][3]; 
            }

        }
        var Tgrade = sumTgrade/(sumTcredit-suCredit);

        rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var cell1 = row.insertCell(0);
        var element1 = document.createElement("input");
        element1.value = vecdt[subject[0]][5]; // id
        element1.type = 'text'
        element1.readOnly = true;
        element1.style = 'text-align:right'
        cell1.appendChild(element1);
        cell1.colSpan = 3;

        var cell2 = row.insertCell(1);
        var element2 = document.createElement("input");
        element2.value = sumTcredit // sumTcredit
        element2.type = 'text'
        element2.readOnly = true;
        element2.style = 'text-align:right'
        cell2.appendChild(element2);

        var cell3 = row.insertCell(2);
        var element3 = document.createElement("input");
        element3.value = Tgrade // ATgrade
        element3.type = 'text'
        element3.readOnly = true;
        element3.style = 'text-align:right'
        cell3.appendChild(element3);
    }


    AverageGrade = sumgrade/(cradit-allsuCradit);

    rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.value = "AverageGrade"; 
    element1.type = 'text'
    element1.readOnly = true;
    element1.style = 'text-align:right'
    cell1.appendChild(element1);
    cell1.colSpan = 3;

    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.value = cradit // sumcredit
    element2.type = 'text'
    element2.readOnly = true;
    element2.style = 'text-align:right'
    cell2.appendChild(element2);

    var cell3 = row.insertCell(2);
    var element3 = document.createElement("input");
    element3.value = AverageGrade // grade
    element3.type = 'text'
    element3.readOnly = true;
    element3.style = 'text-align:right'
    cell3.appendChild(element3);
}

