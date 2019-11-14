
const fs = require('fs')


document.getElementById("add_assignment").addEventListener('click',addAssignment);

function addAssignment(event){
  var assignment = document.getElementById("assignment_text").value;

  let data = fs.readFileSync('db_json/assignment_info.json');
  let assignment_data = JSON.parse(data);

  console.log("ass");
  var grade = document.getElementById("grade").value;
  if(assignment != "")
  {
    assignment_data[grade].push({question : assignment});
  }


  fs.writeFileSync("db_json/assignment_info.json", JSON.stringify(assignment_data, null, 4), (err) => {
   if (err) {
      console.error(err);
      return;
   };
  });
}
