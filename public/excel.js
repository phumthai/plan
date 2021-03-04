let selectedFile;
console.log(window.XLSX);
document.getElementById('inputexcel').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [];//=[{
//     "name":"jayanth",
//     "data":"scd",
//     "abc":"sdef"
// }]

var dt;  // JSON DATA
var vecdt = [];  // Graph Data Array
var vecdtbk = []; // vecdt backup
// Convert xlsx to json
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
    //setTimeout(() => { console.log(dt); }, 2000);
    // var l = dt.length; // length of data
    // var nextpos = [];
    // for(var i=0;i<l;i++){
    //     for(var j=0;j<l;j++){
    //         if(dt[j]["Prerequisite"]!=""&&dt[j]["Prerequisite"].includes(dt[i]["ShortName"])&&dt[j]["Prerequisite"].includes("with")==false){
    //             nextpos.push(j.toString())
    //         }
    //     }
    //     vecdt.push(dt[i]["ID"],dt[i]["ShortName"],dt[i]["Name"],dt[i]["Credits"],dt[i]["Prerequisite"],dt[i]["Semester"],dt[i]["Grade"],nextpos);
    // }
    // console.log(vecdt);

    //  var tes=[];
    //  tes.push([0,"xxx","yyy","1,2,3"]);
    //  tes.push([1,"aaa","bbb","1,2,3"]);
    //  let g = tes[0][3].split(',').map(function(item) {return parseInt(item, 10);}); // string array to int array
    //  console.log(tes)
    //  console.log(tes[0][0])
    //  console.log(g.length)
    
});

//create graph format by json
document.getElementById('shdt').addEventListener("click",() => {
    // dt to vec dt
    var l = dt.length; // length of data
    
    for(var i=0;i<l;i++){
        var nextpos = [];
        for(var j=0;j<l;j++){
            if(dt[j]["Prerequisite"]!=""&&dt[j]["Prerequisite"].includes(dt[i]["ShortName"])&&dt[j]["Prerequisite"].includes("with")==false){
                nextpos.push(j)
            }
        }
        vecdt.push([dt[i]["ID"],dt[i]["ShortName"],dt[i]["Name"],dt[i]["Credits"],dt[i]["Prerequisite"],dt[i]["Semester"],dt[i]["Grade"],nextpos]);
    }
    console.log(vecdt);






    var abc ="123",x;
    var node = "";
    var link = "],\n\"linkDataArray\": [\n";
    var lenloc = 0.5;
    var lens = 0;
    var keylocx = -86.5;
    var keylocy = 70;
    var term = [];
    //abc += dt[0]["ID"];
    x = dt.length;
    var fulltxt = "{\n\"class\": \"GraphLinksModel\",\n";
    fulltxt += "\"nodeDataArray\": [\n";
    //check json have data
    if(x!=0){
        fulltxt += "{\"key\":\"Pool1\", \"text\":\"หลักสูตรคอม 58\", \"\isGroup\":true, \"category\":\"Pool\", \"loc\":\"0.5 26.59846649169922\",\"color\":\"lightgray\"},\n";
    }
    //do json to graph format
    for(var i = 0;i<dt.length;i++){
        var checkterm = dt[i]["Semester"];
        //console.log(checkterm);
        if(term.includes(checkterm)==false){
            keylocx += 99;
            keylocy = 70;
            lens++; 
            node += "{\"key\":\"Lane"+ lens + "\",\"text\":\""+ checkterm + "\",\"isGroup\":true, \"group\":\"Pool1\", \"color\":\"lightblue\", \"size\":\"130 500\", \"loc\":\""+ lenloc + " 53.12131399000716\"},\n";
            term.push(checkterm);
            //console.log("ok");
            node += "{\"key\":\""+ dt[i]["ShortName"] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylocx + " " + keylocy + "\"},\n";
            lenloc += 99;
            keylocy += 50;
        }
        else{
            node += "{\"key\":\""+ dt[i]["ShortName"] +"\", \"group\":\"Lane"+ lens + "\", \"loc\":\"" + keylocx + " " + keylocy + "\"},\n";
            keylocy += 50;
        }
        if(dt[i]["Prerequisite"]!=""){
            var checkpre = dt[i]["Prerequisite"];
            if(checkpre.includes("or")||checkpre.includes("and")==true){
                var tor = checkpre.split(' ');
                link += "{\"from\":\"" + tor[0] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" ,\"color\":\"blue\"},\n";
                link += "{\"from\":\"" + tor[2] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" ,\"color\":\"blue\"},\n";
            }
            else if(checkpre.includes("with")==true){
                var tor = checkpre.split(' ');
                link += "{\"from\":\"" + tor[1] + "\", \"to\":\"" + dt[i]["ShortName"] +"\" , \"color\":\"red\"},\n";
            }
            else{
                link += "{\"from\":\"" + dt[i]["Prerequisite"] + "\", \"to\":\"" + dt[i]["ShortName"] +"\"},\n";
            }
        }
    }
    var newnode;
    newnode = node.slice(0,-2);
    newlink = link.slice(0,-2);
    newlink += "\n]}";
    
    fulltxt += newnode;
    fulltxt += newlink;
    
    
    document.getElementById("mySavedModel").value = fulltxt;

    //generate table
    //1document.getElementById("mytable").appendChild(buildTable(dt));
    
    /*var table = document.createElement("mytable");
    for (var i = 1; i < 4; i++){
        var tr = document.createElement('tr');   

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        var text1 = document.createTextNode('Text1');
        var text2 = document.createTextNode('Text2');

        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    var mtb = document.getElementById("mytable");
    mtb.innerHTML = "";
    mtb.appendChild(table);*/
    
    addRow('mytable');

});

/*1function buildTable(data) {
    var table = document.createElement("table");
    table.className="gridtable";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["ID","Course","Credits","Grade","Year"].forEach(function(el) {
      var th=document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead); 
    data.forEach(function(el) {
      var tr = document.createElement("tr");
      for (var o in el) {  
        var td = document.createElement("td");
        td.appendChild(document.createTextNode("a"))
        tr.appendChild(td);
      }
      tbody.appendChild(tr);  
    });
    table.appendChild(tbody);             
    return table;
}*/

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