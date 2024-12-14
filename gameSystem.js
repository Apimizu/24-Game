// เลือกปุ่มทั้งหมดใน .operations
const buttons = document.querySelectorAll('.operations button'); // เลือกปุ่มเครื่องหมายทางคณิตศาสตร์ (+, -, ×, ÷, ( และ )) ทั้งหมด
const solutionInput = document.getElementById('solution'); // ช่องอินพุตสำหรับผู้ใช้กรอกคำตอบ
const numbers = document.querySelectorAll('.numbers input'); // เลือกตัวเลขทั้งหมด (4 ตัวเลขที่สุ่มมา)
const answer = document.querySelectorAll('.answer'); // แสดงข้อความ "= 24" ที่หน้าจอ
const submitButton = document.getElementById('submit'); // ปุ่มสำหรับตรวจสอบคำตอบ
const resetButton = document.getElementById('reset'); // ปุ่มสำหรับเริ่มเกมใหม่

// ฟังก์ชันตรวจสอบว่าตัวเลขที่สุ่มมานั้นสามารถคำนวณให้ได้ผลลัพธ์เป็น 24 ได้ไหม
function isSolvable(numbers) {
  const ops = ['+', '-', '*', '/']; // เครื่องหมายทางคณิตศาสตร์ที่ใช้ในการคำนวณ

  // ฟังก์ชันช่วยสำหรับตรวจสอบความเป็นไปได้ในการคำนวณ
  function helper(nums) {
    if (nums.length === 1) { // ถ้าความยาวของ array nums เหลือแค่ 1
      return Math.abs(nums[0] - 24) < 1e-6; // ตรวจสอบว่าค่าของมันใกล้เคียงกับ 24 ไหม
    }

    // ลูปผ่านตัวเลขแต่ละคู่
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i !== j) { // ตรวจสอบว่าตำแหน่ง i และ j ไม่ซ้ำกัน
          const remaining = nums.filter((_, index) => index !== i && index !== j); // ลบตัวเลขที่เลือกออกสองตัว

          for (let op of ops) { // ลูปผ่านเครื่องหมายคณิตศาสตร์
            if (op === '/' && nums[j] === 0) continue; // หลีกเลี่ยงการหารด้วยศูนย์

            const newNumber = eval(`${nums[i]} ${op} ${nums[j]}`); // คำนวณค่าของตัวเลขสองตัวด้วยเครื่องหมายที่เลือก โดยใช้ eval() ในการเปลี่ยนข้อความเป็นโค้ด
            if (helper([...remaining, newNumber])) { // เรียกฟังก์ชันซ้ำกับตัวเลขที่เหลือและค่าที่คำนวณได้
              return true; // หากพบวิธีที่ได้ผลลัพธ์เป็น 24 ให้คืนค่า true
            }
          }
        }
      }
    }
    return false; // หากไม่มีทางใดที่ให้ผลลัพธ์เป็น 24 ให้คืนค่า false
  }

  return helper(numbers); // เรียกใช้ฟังก์ชันช่วย
}

// ฟังก์ชันสุ่มตัวเลข 4 ตัวที่สามารถคำนวณได้เป็น 24
function generateNumbers() {
  let generatedNumbers; // ตัวแปรเก็บตัวเลขที่สุ่มได้
  do {
    generatedNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1); // สุ่มตัวเลข 4 ตัวในช่วง 1-9
  } while (!isSolvable(generatedNumbers)); // ตรวจสอบว่าตัวเลขที่สุ่มสามารถคำนวณได้เป็น 24

  // แสดงตัวเลขในช่องอินพุต
  numbers.forEach((input, index) => {
    input.value = generatedNumbers[index]; // กรอกตัวเลขที่สุ่มลงในช่อง
  });
}

// เพิ่ม event listener ให้กับปุ่มเครื่องหมาย
buttons.forEach(button => {
  button.addEventListener('click', () => {
    solutionInput.value += ` ${button.textContent} `; // เพิ่มเครื่องหมายที่เลือกลงในช่อง solution
  });
});

// เพิ่ม event listener ให้กับปุ่มตัวเลข
numbers.forEach(number => {
  number.addEventListener('click', () => {
    solutionInput.value += number.value; // เพิ่มตัวเลขที่เลือกลงในช่อง solution
  });
});

// ฟังก์ชันตรวจสอบคำตอบ
function evaluateSolution() {
  try {
    const expression = solutionInput.value
      .replace(/\×/g, '*') // แทนที่เครื่องหมาย × ด้วย *
      .replace(/\÷/g, '/'); // แทนที่เครื่องหมาย ÷ ด้วย /

    const result = eval(expression); // คำนวณผลลัพธ์จากนิพจน์ที่ผู้ใช้กรอก

    if (result === 24) { // ตรวจสอบว่าผลลัพธ์เท่ากับ 24 หรือไม่
      alert('Correct!'); // แสดงข้อความว่าตอบถูก
      resetGame(); // เริ่มเกมใหม่
    } else {
      alert('Incorrect. Try again!'); // แสดงข้อความว่าตอบผิด
    }
  } catch (error) { // ถ้่ามี error
    alert('Invalid expression. Please try again.'); // แสดงข้อความเมื่อผู้ใช้กรอกนิพจน์ไม่ถูกต้อง
  }
}

// ฟังก์ชันเริ่มเกมใหม่
function resetGame() {
  solutionInput.value = ''; // ล้างช่อง solution
  generateNumbers(); // สุ่มตัวเลขใหม่
}

// เพิ่ม event listener ให้กับปุ่ม Submit และ Reset
submitButton.addEventListener('click', evaluateSolution); // ตรวจสอบคำตอบเมื่อคลิกปุ่ม Submit
resetButton.addEventListener('click', resetGame); // เริ่มเกมใหม่เมื่อคลิกปุ่ม Reset

// เริ่มต้นเกมโดยสุ่มตัวเลขครั้งแรก
generateNumbers();
