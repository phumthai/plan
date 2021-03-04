var dt;
var vecdt = [];
var cou;
var arrterm = ["1/1","1/2","S1","2/1","2/2","S2","3/1","3/2","S3","4/1","4/2","S4","5/1","5/2","S5","6/1","6/2","S6","7/1","7/2","S7","8/1","8/2","S8"];
var locterm = [0.5,99.5,198.5,297.5,396.5,495.5,594.5,693.5,792.5,891.5,990.5,1089.5,1188.5,1287.5,1386.5,1485.5,1584.5,1683.5,1782.5,1881.5,1980.5,2079.5,2178.5,2277.5];

window.addEventListener('load',() =>{
    //dt = localStorage.getItem('Data');
    dt = JSON.parse(localStorage.getItem('Data'))
    cou = localStorage.getItem('course');
    console.log(dt,cou);
    addRow('mytable');
    writegraph();
})
//create graph format by json
document.getElementById('shdt').addEventListener("click",() => {
   writegraph();
});
function jsontovec(){
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
        vecdt.push([dt[i]["ID"],dt[i]["ShortName"],dt[i]["Name"],dt[i]["Credits"],dt[i]["Prerequisite"],dt[i]["Semester"],dt[i]["Grade"],nextpos,"notdone",wi,"-"]);
        // 0 id    1 shrotname    2 name    3 credit   4 pre    5 semester    6 gradetype   7 nextpos   8 writecheck  9 labcheck  10 grade
     }
     console.log(vecdt);
}

function writegraph(){
     // dt to vec dt
    var l = dt.length; // length of data
    
    jsontovec();
 
 
    var abc ="123",x;
    var node = "";
    var link = "],\n\"linkDataArray\": [\n";
    var lenlocx = 0.5;
    var lenlocy = 53.122;
    var lens = 0;
    var keylocx = 12.5;
    var keylocy = 70;
    var term = [];
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
    //make term group
    for(var i=0;i<dt.length;i++){
        if(term.includes(vecdt[i][5])==false){
            term.push(vecdt[i][5]);
            lens += 1;
            node += "{\"key\":\"Lane"+ lens + "\",\"text\":\""+ vecdt[i][5] + "\",\"isGroup\":true, \"group\":\"Pool1\", \"color\":\"lightblue\", \"size\":\"130 1000\", \"loc\":\""+ lenlocx + " "+ lenlocy + "\"},\n";
            lenlocx += 99;
            keylastx.push(keylocx)
            keylasty.push(keylocy);
            keylocx += 99;
        }
    }

    //make node
    for(var i=0;i<vecdt.length;i++){
        if(vecdt[i][8]=="notdone"){
            var lens = term.indexOf(vecdt[i][5]) + 1;

            node += "{\"key\":\""+ vecdt[i][1] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylastx[lens-1] + " " + keylasty[lens-1] + "\"},\n";
            keylasty[lens-1] += 75;
            vecdt[i][8] = "done";
            

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






    //  for(var i = 0;i<dt.length;i++){
    //      var checkterm = vecdt[i][5];
    //      if(term.includes(checkterm)==false){
    //         lens = arrterm.indexOf(checkterm) + 1;
    //         console.log(checkterm);
    //         //node += "{\"key\":\"Lane"+ lens + "\",\"text\":\""+ checkterm + "\",\"isGroup\":true, \"group\":\"Pool1\", \"color\":\"lightblue\", \"size\":\"130 500\", \"loc\":\""+ lenlocx + " "+ lenlocy + "\"},\n";
    //         term.push(checkterm);
    //         lenlocx += 99;
    //         if(vecdt[i][4]==""&&vecdt[i][8]=="notdone"){
    //             node += "{\"key\":\""+ vecdt[i][1] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylocx + " " + keylocy + "\"},\n";
    //             keylocy += 50;
    //             vecdt[i][8] = "done";
    //             if(vecdt[i][7].length!=0){
    //                 var nextlength = vecdt[i][7].length;
    //                 var cknode = [];
    //                 for(var j=0;j<nextlength;j++){
    //                     cknode.push(vecdt[i][7][j]);
    //                 }
    //                 while(cknode.length!=0){
    //                     var thiscknode = cknode[0];
    //                     if(vecdt[thiscknode][8]=="notdone"){
    //                         if(term.includes(vecdt[thiscknode][5])==false){
    //                             var idt = arrterm.indexOf(vecdt[thiscknode][5]) + 1;
    //                             for(var k=0;k<idt;k++){
    //                                 if(term.includes(arrterm[k])==false){
    //                                     var le = k+1;
    //                                     //node += "{\"key\":\"Lane"+ le + "\",\"text\":\""+ arrterm[le-1] + "\",\"isGroup\":true, \"group\":\"Pool1\", \"color\":\"lightblue\", \"size\":\"130 500\", \"loc\":\""+ lenlocx + " "+ lenlocy + "\"},\n";
    //                                     lenlocx += 99;
    //                                     term.push(arrterm[le-1]);
    //                                     console.log(term)
    //                                 }
    //                             }
    //                         }
    //                         var le = arrterm.indexOf(vecdt[thiscknode][5]) + 1;
    //                         node += "{\"key\":\""+ vecdt[thiscknode][1] +"\", \"group\":\"Lane"+ le + "\", \"loc\":\"" + keylocx + " " + keylocy + "\"},\n";
    //                         vecdt[thiscknode][8] = "done";
    //                         if(vecdt[thiscknode][7].length!=0){
    //                             for(var k=0;j<vecdt[thiscknode][7].length;j++){
    //                                 cknode.unshift(vecdt[thiscknode][7][k]);
    //                             }
    //                         }
    //                     }
    //                     cknode.shift();
    //                 }
    //             }
    //         }
    //         keylocx += 99;
    //         keylocy = 70;
    //         lastposy += 50;
            
    //      }
    //      else{
    //          lens = arrterm.indexOf(checkterm) + 1;
    //          node += "{\"key\":\""+ vecdt[i][1] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylocx + " " + keylocy + "\"},\n";
    //          keylocy += 50;
    //      }
    //      if(vecdt[i][4]!=""){
    //          var checkpre = vecdt[i][4];
    //          if(checkpre.includes("or")||checkpre.includes("and")==true){
    //              var tor = checkpre.split(' ');
    //              link += "{\"from\":\"" + tor[0] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" ,\"color\":\"blue\"},\n";
    //              link += "{\"from\":\"" + tor[2] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" ,\"color\":\"blue\"},\n";
    //          }
    //          else if(checkpre.includes("with")==true){
    //              var tor = checkpre.split(' ');
    //              link += "{\"from\":\"" + tor[1] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" , \"color\":\"red\"},\n";
    //          }
    //          else{
    //              link += "{\"from\":\"" + dt[i]["Prerequisite"] + "\", \"to\":\"" + dt[i]["ShortName"] +"\"},\n";
    //          }
    //      }
    //  }

    var newnode,newlink;
    newnode = node.slice(0,-2);
    newlink = link.slice(0,-2);
    newlink += "\n]}";
     
    fulltxt += newnode;
    fulltxt += newlink;
     
     
    document.getElementById("mySavedModel").value = fulltxt;
     
    //addRow('mytable');
 
}



function addRow(tableID) {

    var x = dt.length;
    
    var table = document.getElementById(tableID);

    
    
    for(var i=0; i<x;i++){
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var element1 = document.createElement("input");
        element1.id = 'id_id' + rowCount + '';
        element1.value = dt[i]["ID"];
        cell1.appendChild(element1);
        
        var cell2 = row.insertCell(1);
        var element2 = document.createElement("input");
        element2.id = 'id_name' + rowCount + '';
        element2.value = dt[i]["Name"];
        cell2.appendChild(element2); 

        var cell3 = row.insertCell(2);
        var element3 = document.createElement("input");
        element3.id = 'id_credit' + rowCount + '';
        element3.value = dt[i]["Credits"];
        cell3.appendChild(element3);

        var grades = ["-","A","B+","B","C+","C","D+","D","F","S","U"];
        var cell4 = row.insertCell(3);
        var element4 = document.createElement("select");
        element4.id = 'id_grade' + rowCount + '';
        for(var j=0;j<grades.length;j++){
            var option = document.createElement("option");
            option.value = grades[j];
            option.text = grades[j];
            element4.appendChild(option);
            cell4.appendChild(element4);
        }
        //cell4.appendChild(element4);

        var term = ["-","1/1","1/2","S1","2/1","2/2","S2","3/1","3/2","S3","4/1","4/2","S4"];
        var cell5 = row.insertCell(4);
        var element5 = document.createElement("select");
        element5.id = 'id_term' + rowCount + '';
        for(var k=0;k<term.length;k++){
            var option = document.createElement("option");
            if(term[k]==dt[i]["Semester"]){
                option.value = term[k];
                option.selected = term[k];
            }
            else{
                option.value = term[k];
            }
            //option.value = term[k];
            option.text = term[k];
            element5.appendChild(option);
            cell5.appendChild(element5);
        }
    }

}