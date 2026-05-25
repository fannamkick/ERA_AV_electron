const fs = require('fs');
const path = require('path');

const improvedPath = path.join(__dirname, '../src/modules/training/commands/improved.ts');
let content = fs.readFileSync(improvedPath, 'utf-8');

// COM2-6의 showTrainMessage 메서드들을 generateTrainMessage로 교체
for (let comId = 2; comId <= 6; comId++) {
  // Com2Command, Com3Command 등의 showTrainMessage 메서드를 찾아서 교체
  // 각 메서드는 "private async showTrainMessage(): Promise<void> {"로 시작하고
  // 다음 메서드 시작("private " 또는 "}")까지가 본문

  const classPattern = new RegExp(`(class Com${comId}Command[\\s\\S]*?)(private async showTrainMessage\\(\\): Promise<void> \\{[\\s\\S]*?\\n  \\})`, 'm');

  content = content.replace(classPattern, (match, beforeMethod, oldMethod) => {
    const newMethod = `  private async showTrainMessage(): Promise<void> {\n    await this.generateTrainMessage(${comId}); // COM${comId}\n  }`;
    return beforeMethod + newMethod;
  });
}

fs.writeFileSync(improvedPath, content, 'utf-8');
console.log('COM2-6의 showTrainMessage 메서드 업데이트 완료!');
