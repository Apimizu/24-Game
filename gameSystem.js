
    // เลือกปุ่มทั้งหมดใน .operations
    const buttons = document.querySelectorAll('.operations button');
    const solutionInput = document.getElementById('solution');
    const numbers = document.querySelectorAll('.numbers input');
    const answer = document.querySelectorAll('.answer');
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');

    // สุ่มตัวเลข 4 ตัว
    function generateNumbers() {
      const generatedNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
      numbers.forEach((input, index) => {
        console.log(generateNumbers[index])
        input.value = generatedNumbers[index];
      });
    }

    // เพิ่ม event listener ให้กับปุ่ม operator
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        solutionInput.value += ` ${button.textContent} `;
      });
    });

    // เพิ่ม event listener ให้กับตัวเลข
    numbers.forEach(number => {
      number.addEventListener('click', () => {
        solutionInput.value += number.value;
      });
    });

    // ตรวจสอบคำตอบ
    function evaluateSolution() {
      try {
        const expression = solutionInput.value
          .replace(/\×/g, '*') // แทนที่เครื่องหมาย × ด้วย *
          .replace(/\÷/g, '/'); // แทนที่เครื่องหมาย ÷ ด้วย /

        // คำนวณผลลัพธ์
        const result = eval(expression);

        // ตรวจสอบว่าผลลัพธ์เท่ากับ 24 หรือไม่
        if (result === 24) {
          alert('Correct!');
        } else {
          alert('Incorrect. Try again!');
        }
      } catch (error) {
        alert('Invalid expression. Please try again.');
      }
    }

    // รีเซ็ตเกม
    function resetGame() {
      solutionInput.value = '';
      generateNumbers();
    }

    // Event listeners สำหรับ submit และ reset
    submitButton.addEventListener('click', evaluateSolution);
    resetButton.addEventListener('click', resetGame);

    // เริ่มต้นเกม
    generateNumbers();

