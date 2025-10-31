const robot = document.getElementById("robot");
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
let speed = 5;

document.getElementById("speed").addEventListener("input", (e) => {
    speed = parseInt(e.target.value);
});

// تحكم يدوي
const move = (dx, dy) => {
    posX += dx * speed * 5;
    posY += dy * speed * 5;
    robot.style.left = posX + "px";
    robot.style.top = posY + "px";
};

document.getElementById("up").onclick = () => move(0, -1);
document.getElementById("down").onclick = () => move(0, 1);
document.getElementById("left").onclick = () => move(-1, 0);
document.getElementById("right").onclick = () => move(1, 0);

// لوحة المفاتيح
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") move(0, -1);
    if (e.key === "ArrowDown") move(0, 1);
    if (e.key === "ArrowLeft") move(-1, 0);
    if (e.key === "ArrowRight") move(1, 0);
});

// تشغيل الكود
document.getElementById("runCode").onclick = () => {
    const code = document.getElementById("codeArea").value.trim().split("\n");
    let i = 0;

    const runLine = () => {
        if (i >= code.length) return;
        const line = code[i++].trim();

        if (line === "move_forward()") move(0, -1);
        if (line === "turn_left()") move(-1, 0);
        if (line === "turn_right()") move(1, 0);
        if (line === "move_backward()") move(0, 1);

        setTimeout(runLine, 400);
    };

    runLine();
};