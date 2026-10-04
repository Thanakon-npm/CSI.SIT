function ex1() {
  console.log("Exercise 1 Running");
  console.log(document.getElementById("input_A").value);
  console.log(document.getElementById("input_B").value);
  if (document.getElementById("input_A").value == document.getElementById("input_B").value) {
    document.getElementById("output").innerText = "Equal";
  } else {
    document.getElementById("output").innerText = "Not Equal";
  }
}