var dt;
var vecdt = [];
var cou;
var arrterm = ["1/1","1/2","S1","2/1","2/2","S2","3/1","3/2","S3","4/1","4/2","S4","5/1","5/2","S5","6/1","6/2","S6","7/1","7/2","S7","8/1","8/2","S8"];
var locterm = [0.5,99.5,198.5,297.5,396.5,495.5,594.5,693.5,792.5,891.5,990.5,1089.5,1188.5,1287.5,1386.5,1485.5,1584.5,1683.5,1782.5,1881.5,1980.5,2079.5,2178.5,2277.5];
var gradeA = ["-","A","B+","B","C+","C","D+","D","F","S","U"];
var gradeS = ["-","S","U"];
var snarr = [];
var arrposterm = [0,3,6,9,12,15,18,21];

window.addEventListener('load',() =>{
    dt = JSON.parse(localStorage.getItem('Data'))
    cou = localStorage.getItem('course');
    console.log(dt,cou);
    jsontovec().then(
        writegraph()
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
    var term = [];
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

    var grades = []
    if(vecdt[idx][6]=="A"){
        grades = gradeA
    }
    else{
        grades = gradeS
    }
    var cell7 = row.insertCell(5);
    var element7 = document.createElement("select");
    element7.id = 'id_grade' + rowCount;
    for(var j=0;j<grades.length;j++){
        var option = document.createElement("option");
        option.value = grades[j];
        option.text = grades[j];
        element7.appendChild(option);
        cell7.appendChild(element7);
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
            load()
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
            var difpos = indexofsevl-indexofsemester;
            var modntpos = (indexofsevl + 1)%3;
            
            vecdt[snidx][5] = sevl;
            vecdt[snidx][8] = "done";
            var modpos = (arrterm.indexOf(vecdt[snidx][5]) + 1)%3;
            var modoripos = (arrterm.indexOf(vecdt[snidx][11]) + 1)%3;
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
                if(dif>=0){
                    var oripreT = vecdt[prenode][11];
                    var oriT = vecdt[valnxnode][11];
                    var modoripreT = (arrterm.indexOf(oripreT)+1)%3;
                    var modoriT = (arrterm.indexOf(oriT)+1)%3;
                    var diforiterm = arrterm.indexOf(oriT)-arrterm.indexOf(oripreT);
                    var difpos;
                    if(diforiterm<3){
                        difpos = 3;
                    }
                    else{
                        
                    }
                }
                var modorinxpos = (arrterm.indexOf(vecdt[valnxnode][11]) + 1)%3;
                if(vecdt[valnxnode][7].length!=0){
                    for(var j=0;j<vecdt[valnxnode][7].length;j++){
                        nextnd.push(vecdt[valnxnode][7][j]);
                    }
                }
                // if(vecdt[valnxnode][8]=="notdone"){
                //     var nxnodesepos = arrterm.indexOf(vecdt[valnxnode][5])
                //     vecdt[valnxnode][5] = arrterm[nxnodesepos+difpos];
                //     vecdt[valnxnode][8] = "done";
                // }
                nextnd.shift();
            }
        }
        // else if(indexofsevl-arrterm.indexOf(vecdt[i-1][11])>=0&&vecdt[i-1][8]=="notdone"){
        //     var nextnd = [];
        //     vecdt[i-1][5] = sevl;
        //     vecdt[i-1][8] = "done";
        //     if(vecdt[i-1][7].length!=0){
        //         for(var j=0;j<vecdt[i-1][7].length;j++){
        //             nextnd.push(vecdt[i-1][7][j]);
        //         }
        //         while(nextnd.length!=0){
        //             var valnxnode = nextnd[0];
        //             if(vecdt[valnxnode][7].length!=0){
        //                 for(var j=0;j<vecdt[valnxnode][7].length;j++){
        //                     nextnd.push(vecdt[valnxnode][7][j]);
        //                 }
        //             }
        //             var oriTpost = arrterm.indexOf(vecdt[i-1][11]);
        //             var orinxTpost = arrterm.indexOf(vecdt[valnxnode][11]);
        //             var dif = orinxTpost - oriTpost;
        //             var ndpost = arrterm.indexOf(vecdt[i-1][5]);
        //             var modndpost = (ndpost+1)%3;
        //             var modorinxpost = (orinxTpost+1)%3;
        //             var modorindpost = (oriTpost+1)%3;
        //             if(modndpost==modorindpost){
        //                 vecdt[valnxnode][5] = arrterm[indexofsevl+dif];
        //                 vecdt[valnxnode][8] = "done";
        //             }
        //             // else{
        //             //     var d = ~~(((orinxTpost+1)-(oriTpost+1))/3);
        //             //     if(d==0){
        //             //         vecdt[valnxnode][5] = arrterm[indexofsevl+dif];
        //             //         vecdt[valnxnode][8] = "done";
        //             //         console.log("ok")
        //             //     }else{
        //             //         vecdt[valnxnode][5] = arrterm[indexofsevl+dif+(3*d)];
        //             //         vecdt[valnxnode][8] = "done";
        //             //         console.log("oks")
        //             //     }
        //             // }
        //             nextnd.shift();
        //         }
        //     }
        // }
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
        }
    }
})