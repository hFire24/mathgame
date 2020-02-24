var difficulty = -1;
var numProblems = -1;
var correct = 0;
var incorrect = 0;
var number1;
var number2;
var number3;

function choose(number) {
  if(difficulty === -1)
  {
    difficulty = number;
    var random = Math.floor(Math.random() * 8) + 1;
    document.getElementById("bringit").innerHTML = "Pick " + random + ". If you guess " + random + " right, you level up.<br>Get 3 wrong, and you level down.<br>Don't want leveling up? Press 0.";
  }
  else if(numProblems === -1)
    numProblems = number;
  if(numProblems !== -1)
    startMath();
}

function startMath() {
  document.getElementById("bringit").style.display = "none";
  document.getElementById("choicepad").style.display = "none";
  document.getElementById("math").style.display = "block";
  var goodTally = document.createElement("div");
  goodTally.id = 'correctTally';
  goodTally.style.position = 'absolute';
  goodTally.style.top = 0;
  goodTally.style.left = 0;
  goodTally.style.textAlign = 'left';
  var badTally = document.createElement("div");
  badTally.id = 'incorrectTally';
  badTally.style.position = 'absolute';
  badTally.style.top = 0;
  badTally.style.right = 0;
  badTally.style.textAlign = 'right';
  document.body.appendChild(goodTally);
  document.body.appendChild(badTally);
  loadMath();
}

function loadMath() {
  var answer = document.getElementById("mathanswer");
  answer.style.color = "hsl(59, 22%, 87%)";
  answer.innerHTML = "";
  document.getElementById("enter").addEventListener("click",submit);
  window.addEventListener("keyup", keyType);
  switch (difficulty)
  {
    case 0:
      document.getElementById("break").innerHTML = "Level 0: Toddler";
      number1 = getNumber(0);
      number2 = 0;
      document.getElementById("mathproblem").innerHTML = "Press " + number1 + ". Then press ↵";
      break;
    case 1:
      document.getElementById("break").innerHTML = "Level 1: Noob";
      number1 = getNumber(1);
      number2 = getNumber(1);
      document.getElementById("mathproblem").innerHTML = number1 + " + " + number2;
      break;
    case 2:
      document.getElementById("break").innerHTML = "Level 2: Easy";
      number1 = getNumber(2);
      number2 = getNumber(1);
      document.getElementById("mathproblem").innerHTML = number1 + " + " + number2;
      break;
    case 3:
      document.getElementById("break").innerHTML = "Level 3: Medium";
      number1 = getNumber(2);
      number2 = getNumber(2);
      document.getElementById("mathproblem").innerHTML = number1 + " + " + number2;
      break;
    case 4:
      document.getElementById("break").innerHTML = "Level 4: Somewhat Hard";
      number1 = getNumber(2);
      number2 = getNumber(2);
      number3 = getNumber(2);
      document.getElementById("mathproblem").innerHTML = number1 + " + " + number2 + " + " + number3;
      break;
    case 5:
      document.getElementById("break").innerHTML = "Level 5: Hard";
      number1 = getNumber(2);
      number2 = getNumber(1) + 1;
      number3 = 0;
      document.getElementById("mathproblem").innerHTML = number1 + " × " + number2;
      break;
    case 6:
      document.getElementById("break").innerHTML = "Level 6: Super Hard";
      number1 = getNumber(2);
      number2 = getNumber(1);
      number3 = getNumber(2);
      document.getElementById("mathproblem").innerHTML = number1 + " × " + number2 + " + " + number3;
      break;
    case 7:
      document.getElementById("break").innerHTML = "Level 7: Insane";
      number1 = getNumber(2);
      number2 = getNumber(2);
      number3 = 0;
      document.getElementById("mathproblem").innerHTML = number1 + " × " + number2;
      break;
    case 8:
      document.getElementById("break").innerHTML = "Level 8: Absurd";
      number1 = getNumber(2);
      number2 = getNumber(2);
      number3 = getNumber(3);
      document.getElementById("mathproblem").innerHTML = number1 + " × " + number2 + " + " + number3;
      break;
    case 9:
      document.getElementById("break").innerHTML = "Level 9: Sadistic";
      number1 = getNumber(3);
      number2 = getNumber(2);
      number3 = getNumber(4);
      document.getElementById("mathproblem").innerHTML = number1 + " × " + number2 + " + " + number3;
      break;
  }
}

function getNumber(digits)
{
  if(digits === 0)
    return Math.floor(Math.random() * 10);
  else if(digits === 1)
    return Math.floor(Math.random() * 9) + 1;
  else if(digits === 2)
    return Math.floor(Math.random() * 90) + 10;
  else if(digits === 3)
    return Math.floor(Math.random() * 900) + 100;
  else if(digits === 4)
    return Math.floor(Math.random() * 9000) + 1000;
}

function type(number) {
  var answer = document.getElementById("mathanswer");
  if(answer.innerHTML === '' && number !== "-")
    answer.innerHTML = number;
  else if(number === "-" && number.length > 0)
    answer.innerHTML = answer.innerHTML.substring(0,answer.innerHTML.length-1);
  else
    answer.innerHTML = answer.innerHTML + number.toString();
}

function keyType(event) {
  if(event.keyCode >= 48 && event.keyCode <= 57)
  {
    event.preventDefault();
    type(event.keyCode - 48);
  }
  else if(event.keyCode >= 96 && event.keyCode <= 105)
  {
    event.preventDefault();
    type(event.keyCode - 96);
  }
  else if(event.keyCode === 8)
  {
    event.preventDefault();
    type("-");
  }
  else if(event.keyCode === 13)
  {
    event.preventDefault();
    submit();
  }
}

async function submit() {
  document.getElementById("enter").removeEventListener("click",submit);
  window.removeEventListener("keyup", keyType);
  var mathAnswer = document.getElementById("mathanswer");
  var answer = parseInt(mathAnswer.innerHTML);
  var message = document.getElementById("break");
  var checks = document.getElementById("correctTally");
  var crossMarks = document.getElementById("incorrectTally");
  if(number1 + number2 === answer && difficulty < 4 ||
    number1 + number2 + number3 === answer && difficulty === 4 ||
    number1 * number2 + number3 === answer) {
    correct++;
    var checkmarks = '';
    if(difficulty !== 9 && numProblems !== 0)
      for(var i = 0; i < correct; i++)
        checkmarks = checkmarks.concat('✅<br>');
    else
      checkmarks = '✅' + correct;
    checks.innerHTML = checkmarks;
    message.innerHTML = generatePraiseMessage();
    mathAnswer.style.color = "#0F0";
  }
  else {
    incorrect++;
    var crosses = '';
    if(numProblems !== 0)
      for(var i = 0; i < incorrect; i++)
        crosses = crosses.concat('❌<br>');
    else
      crosses = incorrect + '❌';
    crossMarks.innerHTML = crosses;
    message.innerHTML = generateWrongMessage();
    mathAnswer.style.color = "red";
    if(difficulty < 4)
      answer = number1 + number2;
    else if(difficulty === 4)
      answer = number1 + number2 + number3;
    else
      answer = number1 * number2 + number3;
    mathAnswer.innerHTML = answer.toString();
  }
  if (difficulty === 9)
    await sleep(5000);
  else if(difficulty > 4)
    await sleep(2500);
  else
    await sleep(1500);
  if(mathAnswer.style.color === "red")
    switch(difficulty)
    {
      case 1:
        await sleep(500);
        break;
      case 2:
        await sleep(600);
        break;
      case 3:
        await sleep(800);
        break;
      case 4:
        await sleep(1000);
        break;
      case 5:
        await sleep(500);
        break;
      case 6:
        await sleep(600);
        break;
      case 7:
        await sleep(800);
        break;
      case 8:
        await sleep(1000);
        break;
    }
  if(correct%numProblems === 0 && difficulty === 9 && mathAnswer.style.color !== "red") {
    incorrect = 0;
    crossMarks.innerHTML = '';
  }
  if(correct >= numProblems && difficulty < 9 && numProblems !== 0) {
    correct = 0;
    incorrect = 0;
    difficulty++;
  }
  else if(incorrect >= 3 && difficulty > 1 && numProblems !== 0) {
    correct = 0;
    incorrect = 0;
    difficulty--;
  }
  console.log("correct answers: " + correct);
  console.log("incorrect answers: " + incorrect);
  loadMath();
  if(correct === 0 && incorrect === 0)
  {
    checks.innerHTML = '';
    crossMarks.innerHTML = '';
  }
}

function generatePraiseMessage() {
  var messages = ["You're on fire!"];
  var index = Math.floor(Math.random() * messages.length);
  if (document.getElementById("mathanswer").innerHTML === "69" || document.getElementById("mathanswer").innerHTML === "420")
    return "Nice!";
  else if (document.getElementById("mathanswer").innerHTML === "666")
    return "Wicked!";
  else
    return messages[index];
}

function generateWrongMessage() {
  var messages = ["Ouch!"];
  var index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
