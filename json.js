var fs = require('fs'),readline = require('readline')
var result2 = [];
var female = [0,0,0,0,0,0,0,0,0,0,0,0];
var male =[0,0,0,0,0,0,0,0,0,0,0,0];
count = 0;
var inputCSVFilePath = "Indicators.csv",
    outputFilePath1 = "asia.json",
    outputFilePath = "top5.json";

var csvFileRead = readline.createInterface({
  input: fs.createReadStream(inputCSVFilePath)
});

var MAP_COUNTRIES_ASIA = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
var Years = [1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2015];
csvFileRead.on('line',function(line){
  var catch1 = line.split('/r/n');//trimming
  var rows = catch1[0].split(',');//splitting
  var n =rows.length;
  var country =rows[0];//Fetch country
  var indicator =rows[n-3];//Fetch Indicator
  var year =rows[n-2];//Fetch Year
  var value =rows[n-1];//Fetch Value
  var obj1 = {};
  if(count==10)
   process.exit();
  switch (indicator) {
    case "SP.DYN.LE00.IN":
      if(year==1960)
          {
            obj1.country = country ;
            obj1.value = value ;
            result2.push(obj1);
          }
      break;
    case "SP.DYN.LE00.FE.IN":
            var x = parseInt(year);
            if(Years.indexOf(x)>0)
              {
                if(MAP_COUNTRIES_ASIA.indexOf(country)>0)
                  {
                    var i=Years.indexOf(x);
                    female[i]=female[i]+parseInt(value);
                  }
                }
         break;
    case "SP.DYN.LE00.MA.IN":
        var x = parseInt(year);
        if(Years.indexOf(x)>0)
            {
                if(MAP_COUNTRIES_ASIA.indexOf(country)>0)
                  {
                      var i=Years.indexOf(x);
                        male[i]=male[i]+parseInt(value);

                }
            }
          break;
    default:
  }
  });

  csvFileRead.on('close',function(line){
    var result1 =[];
    var obj2 ={};
    for(i=0;i<12;i++)
      {
        male[i]=male[i]/36;
        female[i]=female[i]/36;
        obj2.year = Years[i];
        obj2.Fval = female[i];
        obj2.Mval = male[i];
        result1.push(obj2);
        obj2={};
      }
      result1 =JSON.stringify(result1);
      fs.appendFile(outputFilePath1, result1);
    var newArr = result2.sort(function(a, b) {
      return b.value - a.value;
    });
    result2 = [];
    for(i=0;i<5;i++)
        result2[i]=newArr[i];
    result2 =JSON.stringify(result2);
    fs.appendFile(outputFilePath, result2);
    console.log("CSV to json conversion is done");
    });